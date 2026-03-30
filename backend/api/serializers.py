from rest_framework import serializers

from .models import Blog,Comment,Owner,RequestPermission

from django.contrib.auth.models import User,Group


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class TokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token=super().get_token(user)
        token['username']=user.username
        return token
    
    def validate(self, attrs):
        data=super().validate(attrs)

        # if not user.is_superuser:
        #     if not user.groups.exists():
        #         viewer_group, _ = Group.objects.get_or_create(name='Viewer')
        #         user.groups.add(viewer_group)
        #         print('assigned to Viewer group')
        return data
        




class CommentSerializer(serializers.ModelSerializer):
    blog_title=serializers.SerializerMethodField()
    class Meta:
        model=Comment
        fields="__all__"
    def get_blog_title(self,obj):
        return obj.blog.title
        

class BlogSerializer(serializers.ModelSerializer):
    total_comments=serializers.SerializerMethodField()
    comments=CommentSerializer(many=True,read_only=True)
    owner_name=serializers.SerializerMethodField()
    class Meta:
        model=Blog
        fields="__all__"
    def get_total_comments(self,obj):
        return obj.comments.count()
    def get_owner_name(self,obj):
        return obj.owner.name
    

class OwnerSerializer(serializers.ModelSerializer):
    blogs=BlogSerializer(many=True,read_only=True)
    total_blogs=serializers.SerializerMethodField()
    class Meta:
        model=Owner
        fields="__all__"
    def get_total_blogs(self,obj):
        return obj.blogs.count()

        


        

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','email','password']
    def create(self, validated_data):
        user=User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email',''),
            password=validated_data['password'],
        )
        return user


class RequestPermissionSerializer(serializers.ModelSerializer):
    username=serializers.SerializerMethodField()
    class Meta:
        model=RequestPermission
        fields='__all__'
    def get_username(self,obj):
        return obj.user.username

 

