from django.shortcuts import render

from rest_framework.generics import CreateAPIView
from .serializer import UserModelSerializer, UserModelLoginSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .verify import verify_access_token

# Create your views here.

class UserRegisterView(CreateAPIView):
    serializer_class = UserModelSerializer


class UserLoginView(APIView):
    def post(self, request):
        serializer = UserModelLoginSerializer(data = request.data)
        if serializer.is_valid():
            email = request.data.get('email')
            password = request.data.get('password')
            try:
                user = User.objects.get(email = email, password = password) #orm
            except:
                user = None
            if user:
                refresh = RefreshToken.for_user(user=user)
                if user.role.lower() == 'staff':
                    refresh['role'] = 'staff'
                elif user.role.lower() == 'guest':
                    refresh['role'] = 'guest'
                else:
                    refresh['role'] = 'admin'
                access_token = str(refresh.access_token)
                response= Response({'msg':'Login Successful','token':access_token}, status=status.HTTP_200_OK)
                response.set_cookie(key='token', value=access_token, secure=True, httponly=True, samesite='None')
                return response
            else:
                return Response({"msg":"Invalid Id or Password"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
class UserLogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('token')
        response.data = {'msg':'Logout Successful'}
        return response
    
class UserDetailView(APIView):
    def get(self, request, *args, **kwargs):
        token = request.COOKIES.get('token', None)
        verification, payload = verify_access_token(token)
        if verification:
            user = User.objects.filter(id=kwargs['id'])
            serializer = UserModelSerializer(user, many=True, context={'request':request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'msg':'Login First'}, status=status.HTTP_401_UNAUTHORIZED)
    
class AllUsersview(APIView):
    def get(self, request, *args, **kwargs):
        token = request.COOKIES.get('token', None)
        verification, payload = verify_access_token(token)
        if verification:
            user = User.objects.all()
            serializer = UserModelSerializer(user, many=True, context={'request':request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'msg':'Login First'}, status=status.HTTP_401_UNAUTHORIZED)

class AdminCheck(APIView):
    def get(self, request):
        token = request.COOKIES.get('token', None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'] == 'admin':
                return Response({'msg':'Admin'}, status=status.HTTP_200_OK)
            return Response({'msg':'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg':'Not Logged In'}, status=status.HTTP_401_UNAUTHORIZED)
    
class UserCheck(APIView):
    def get(self, request):
        token = request.COOKIES.get('token', None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'] == 'admin' or payload['role'] == 'guest':
                return Response({'msg':'Admin'}, status=status.HTTP_200_OK)
            return Response({'msg':'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg':'Not Logged In'}, status=status.HTTP_401_UNAUTHORIZED)

    
    


      
