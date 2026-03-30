from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenRefreshView

from rest_framework.routers import DefaultRouter

from.views import BlogListViewSet,CommentViewSet,OwnerViewSet,RegisterView,LogutView,CustomTokenObtainPairView,ChangeUserGroupView,RequestPermissionView

router=DefaultRouter()
router.register(r'blogs',BlogListViewSet)
router.register(r'comments',CommentViewSet)
router.register(r'owners',OwnerViewSet)

urlpatterns = [
    path('',include(router.urls)),
    path('token/', CustomTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('register/',RegisterView.as_view()),
    path('logout/',LogutView.as_view()),
    path('change-group/',ChangeUserGroupView.as_view()),
    path('request-permission/',RequestPermissionView.as_view())
]