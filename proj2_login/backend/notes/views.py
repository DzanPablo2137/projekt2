from django.utils import timezone
from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import NoteSerializer, UserSerializer
from .models import Note, User


class NoteView(generics.ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class FindLogin(APIView)
    def post(self, request):
       
        user_login = request.data.get('login')
        user_login = request.data.get('passwd')
        print(note_text, user_login)
        try:
            user_id = User.objects.get(username=user_login, passwd=password).id
        except User.DoesNotExist:
            print({'error': 'Nieprawidłowy login lub hasło'})
        print(note_text, user_id)
        try:
            owner = User.objects.get(id=user_id)
            Note.objects.create(
                note_text=note_text,
                pub_date=timezone.now(),
                owner=owner
            )
            print({'message': 'Znaleziono użytkownika!'}, status=status.HTTP_201_CREATED)
        except User.DoesNotExist:
            print({'error': 'User not found'})

class CreateNoteView(APIView):
    def post(self, request):
        note_text = request.data.get('note_text')
        owner_username = request.data.get('owner')  # Owner is username
        print(note_text, owner_username)
        try:
            owner_id = User.objects.get(username=owner_username).id
        except User.DoesNotExist:
            return Response({'error': 'User not found'})
        print(note_text, owner_id)
        try:
            owner = User.objects.get(id=owner_id)
            Note.objects.create(
                note_text=note_text,
                pub_date=timezone.now(),
                owner=owner
            )
            return Response({'message': 'Note created successfully'}, status=status.HTTP_201_CREATED)
        except User.DoesNotExist:
            return Response({'error': 'User not found'})

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer