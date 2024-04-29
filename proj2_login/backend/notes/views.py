from django.utils import timezone
from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import NoteSerializer, UserSerializer
from .models import Note, User
import requests
import uuid
from .models import LoginToken

class NoteView(generics.ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class FindLogin(APIView):
    def post(self, request):
        print(request.data)
        user_login = request.data.get('login')
        user_passwd = request.data.get('passwd')
        print(user_login, user_passwd)
        try:
            user_id = User.objects.get(username=user_login, password=user_passwd).id
        except User.DoesNotExist:
            return Response({'message': 'Nie dziala!'})
        print(user_login,user_passwd)

        token = uuid.uuid4().hex 
       
        user = User.objects.get(id=user_id)
        LoginToken.objects.create(
            user=user,
            token=token,
        )
    
        return Response({'message': 'Dziala!','token': token})
        

class CreateNoteView(APIView):
    def post(self, request):
        note_text = request.data.get('note_text')
        token = request.data.get('token')  # Owner is username
        print(token, token)
        try:
            tokenObject = LoginToken.objects.get(token=token)
        except LoginToken.DoesNotExist:
            return Response({'error': 'User not found'})
        print(note_text, tokenObject)
        try:
            Note.objects.create(
                note_text=note_text,
                pub_date=timezone.now(),
                owner=tokenObject.user
            )
            return Response({'message': 'Note created successfully'}, status=status.HTTP_201_CREATED)
        except User.DoesNotExist:
            return Response({'error': 'User not found'})


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer