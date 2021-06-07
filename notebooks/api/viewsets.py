from rest_framework import generics
from rest_framework import permissions
from notebooks.models import NoteBook
from .serializers import NoteBookSerializer
from .permissions import IsOwnerOrReadOnly
from rest_framework import viewsets

class NoteBookViewset(viewsets.ModelViewSet):

    serializer_class = NoteBookSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    pagination_class = None

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
    def get_queryset(self):
        return self.request.user.created_notebooks.all()


""" class NoteBookList(generics.ListCreateAPIView):

    queryset = NoteBook.objects.all()
    serializer_class = NoteBookSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class NoteBookDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = NoteBook.objects.all()
    serializer_class = NoteBookSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly] """