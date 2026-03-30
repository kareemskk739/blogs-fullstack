from django.shortcuts import render

from rest_framework.response import Response

from rest_framework import status as DRFStatus

from django.contrib.auth.models import User,Group

from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser,IsAuthenticatedOrReadOnly

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from.permissions import RoleBasedPermission



from rest_framework import viewsets

from .models import Blog,Comment,Owner,RequestPermission

from .serializers import BlogSerializer,CommentSerializer,OwnerSerializer,RegisterSerializer,RequestPermissionSerializer

from rest_framework import filters

from rest_framework.views import APIView

from .serializers import TokenSerializer

from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class=TokenSerializer

class BlogListViewSet(viewsets.ModelViewSet):
    # permission_classes=[IsAuthenticated]
    permission_classes = [RoleBasedPermission]
    queryset=Blog.objects.select_related('owner').all()
    serializer_class=BlogSerializer
    filter_backends=[filters.SearchFilter]
    search_fields=['title']

class OwnerViewSet(viewsets.ModelViewSet):
    permission_classes=[AllowAny]
    queryset=Owner.objects.prefetch_related('blogs__comments').all()
    serializer_class=OwnerSerializer
    filter_backends=[filters.SearchFilter]
    search_fields=['name']
    pagination_class=None

class CommentViewSet(viewsets.ModelViewSet):
    permission_classes=[AllowAny]
    queryset=Comment.objects.all()
    serializer_class=CommentSerializer
    filter_backends=[filters.SearchFilter]
    search_fields=['commented_by','description']
    pagination_class=None


class RegisterView(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        serializer=RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                   'data':serializer.data,
                   'message':'user succesfully registered'
            },status=DRFStatus.HTTP_200_OK)
        else:
            return Response({
             'data':serializer.data,
             'message':'user already registered'
            },status=DRFStatus.HTTP_404_NOT_FOUND)

class LogutView(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {"message": "Logged out successfully!"},
                status=DRFStatus.HTTP_200_OK
            )
        except Exception :
            return Response(
                {"error": "Invalid or expired token"},
                status=DRFStatus.HTTP_400_BAD_REQUEST
            )
    
class ChangeUserGroupView(APIView):
    permission_classes=[IsAdminUser]
    def get(self,request):
        requests=RequestPermission.objects.filter(status='Pending')
        serializer=RequestPermissionSerializer(requests,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        request_id=request.data.get('req_id')
        action=request.data.get('action')


        try:
            permission_request=RequestPermission.objects.get(id=request_id)

        except permission_request.DoesNotExist:
            return Response({"error": "Request not found"},status=DRFStatus.HTTP_404_NOT_FOUND)
        if action=='Approved':
            user=permission_request.user
            user.groups.clear()
            requested_group,_=Group.objects.get_or_create(name='Editor')
            user.groups.add(requested_group)
            permission_request.status = 'Approved'
        if action=='Rejected':
            permission_request.status = 'Rejected'
        permission_request.save()
        return Response(
            {"message": f"Request {action} successfully!"},
            status=DRFStatus.HTTP_200_OK
        )

class RequestPermissionView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        role=request.data.get('requested_role')
        
        if role != 'Editor':
            return Response({
                'message':'requested role should be Editor only',
            },status=DRFStatus.HTTP_400_BAD_REQUEST)
        
        existed_request=RequestPermission.objects.filter(user=request.user,
            status='Pending').exists()
        if existed_request:
            return Response({
           'message': 'already you have a pending request'
            },status=DRFStatus.HTTP_400_BAD_REQUEST)
        
        RequestPermission.objects.create(user=request.user, requested_role=role,
            reason=request.data.get('reason', '')
                                         )
        return Response({
         "message": "Request submitted! Waiting for admin approval."
        },status=DRFStatus.HTTP_201_CREATED)
        





