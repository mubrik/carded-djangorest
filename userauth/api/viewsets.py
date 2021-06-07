from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from userauth.models import User
from rest_framework import viewsets, status
from .serializers import UserSerializer
from userauth.api.permissions import IsOwnerOrReadOnly

class UserViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'create':
            permission_classes = []
        else:
            permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['get'], permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly])
    def get_user_detail(self, request, pk=None):
        user = User.objects.get(pk=request.user.pk)
        if not user.is_anonymous:
            serializer = UserSerializer(user, context={'request': request})
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)