from rest_framework import serializers
from notebooks.models import NoteBook
from notes.models import Note
from rest_framework.response import Response

class CustomNotesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = ['id','title', 'content', 'created']


class NoteBookSerializer(serializers.ModelSerializer):

    created_by = serializers.ReadOnlyField(source='created_by.username')
    notebook_notes = CustomNotesSerializer(many=True)

    class Meta:
        model = NoteBook
        fields = ['url','id','name', 'notebook_notes', 'created_by', 'created']

    def __init__(self, *args, **kwargs):
        super(NoteBookSerializer, self).__init__(*args, **kwargs)
        user = self.context['request'].user
        if user and not user.is_anonymous:
            self.fields['notebook_notes'] = serializers.PrimaryKeyRelatedField(many=True, queryset=user.created_notes.all(), required=False)


