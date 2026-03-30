from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User

# Create your models here.

class Owner(models.Model):
    name=models.CharField(max_length=100)
    def __str__(self):
        return self.name


class Blog(models.Model):
    title=models.CharField(max_length=100)
    description=models.CharField(max_length=1000)
    owner=models.ForeignKey(Owner,related_name='blogs',on_delete=models.CASCADE)
    
    def __str__(self):
            return self.title

class Comment(models.Model):
    commented_by=models.CharField(max_length=100)
    description=models.CharField(max_length=1000)
    blog=models.ForeignKey(Blog, related_name='comments',on_delete=models.CASCADE)
    def __str__(self):
            return self.commented_by



class RequestPermission(models.Model):
      STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]
      user=models.ForeignKey(User,related_name='permission_request',on_delete=models.CASCADE)
      requested_role=models.CharField(max_length=50)
      status=models.CharField(max_length=30,default='Pending',choices=STATUS_CHOICES)
      reason=models.CharField(max_length=100)
      created_at=models.DateTimeField(auto_now_add=True)

      def __str__(self):
            return f"{self.user.username} → {self.requested_role} ({self.status})"
      







