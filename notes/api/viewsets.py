from rest_framework import permissions
from .serializers import NoteSerializer
from .permissions import IsOwnerOrReadOnly
from rest_framework import viewsets
from notes.models import Note

class NoteViewset(viewsets.ModelViewSet):

    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    pagination_class = None

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        return self.request.user.created_notes.all().order_by('created')

    """ def create(self, request, *args, **kwargs):
        notebook_data = request.data.pop('notebook')
        notebook_list = [obj['id'] for obj in notebook_data]
        data = {**request.data, 'notebook': notebook_list}
        request.data = data
        super(NoteViewset, self).create(request, *args, **kwargs) """


""" class NoteList(generics.ListCreateAPIView):

    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class NoteDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly] """
