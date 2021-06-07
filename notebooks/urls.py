from django.urls import path
from .views import (CreateNotebookHandler,
    NotebookHomeView, NotebookDetailView,
    DeleteNotebookView)
from notebooks.api import viewsets


urlpatterns = [
    path('', viewsets.NoteBookViewset, name='notebook-list'),
    path('<str:pk>/', viewsets.NoteBookViewset, name='notebook-detail'),
]