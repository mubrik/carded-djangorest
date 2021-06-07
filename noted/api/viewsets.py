from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import generics
from notes.api.serializers import NoteSerializer
from .permissions import IsOwnerOrReadOnly

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'notes': reverse('note-list', request=request, format=format),
        'notebooks': reverse('notebook-list', request=request, format=format),
    })

class SearchQueryView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    serializer_class = NoteSerializer

    def get_queryset(self):
        query = self.request.query_params.get('searchValue')
        user = self.request.user
        object_query_list = user.created_notes.filter(
            Q(title__icontains=query) | Q(content__icontains=query)
        )
        return object_query_list
    