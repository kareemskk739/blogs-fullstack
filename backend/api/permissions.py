from rest_framework.permissions import BasePermission

class RoleBasedPermission(BasePermission):

    def has_permission(self, request, view):
        print(request.user)
        if not request.user.is_authenticated:
            return False
        if request.user.is_superuser:
            return True
        if request.user.groups.filter(name='Editor').exists():
            if request.method=='DELETE':
                return False
            return True
        if request.user.groups.filter(name='Viewer').exists():
            return request.method in ['GET','HEAD','OPTIONS']
        return False
        
