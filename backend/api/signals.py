from django.db.models.signals import post_save
from django.contrib.auth.models import User,Group
from django.contrib.auth.signals import user_logged_in
from .models import Owner

def create_owner(sender,instance,created,*args,**kwargs):
    if created:
        Owner.objects.create(name=instance.username)

post_save.connect(create_owner,sender=User)


def add_user_to_a_group(sender,instance,created,*args,**kwargs):
    if created:
        viewer_group,_=Group.objects.get_or_create(name='Viewer')
        instance.groups.add(viewer_group)
post_save.connect(add_user_to_a_group,sender=User)


# def add_exsisting_user_to_a_group(sender,request,user,*args,**kwargs):
#     print(user.groups.all())
#     if not user.is_superuser:  
#         if not user.groups.exists():
            
#             viewer_group, _ = Group.objects.get_or_create(name='Viewer')
#             user.groups.add(viewer_group)

# user_logged_in.connect(add_exsisting_user_to_a_group,sender=User)


