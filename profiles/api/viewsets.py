from rest_framework import permissions
from rest_framework import viewsets
from .serializers import ProfileSerializer
from profiles.models import BaseProfile
from profiles.api.permissions import IsOwnerOrReadOnly

class ProfileViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.
    """
    queryset = BaseProfile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    pagination_class = None

    """ def get_queryset(self):
        return self.request.user.user_profile """