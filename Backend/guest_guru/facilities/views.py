from django.shortcuts import render
from .models import Facility
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from .serializer import FacilitySerializer, FacilityEditSerializer
from registration.verify import verify_access_token
from rest_framework import status

# Create your views here.

class FacilityPost(APIView):
    def post(self, request):
        name = request.data.get('name')
        description = request.data.get('description')
        price = request.data.get('price')
        image = request.data.get('image')
        facility = Facility.objects.create(name = name, description = description, price = price, image = image)
        return Response({'message': 'Facility created successfully'}, status = 200)
    
class FacilityView(ListCreateAPIView):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer

    def post(self, request):
        serializer = FacilitySerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = 201)
        return Response(serializer.errors, status = 400)
    
class FacilityEdit(APIView):
    def post (self, request, *args, **kwargs):
        token = request.COOKIES.get('token')
        verification, payload = verify_access_token(token)
        if verification:
            serializer = FacilityEditSerializer(data = request.data)
            if serializer.is_valid(raise_exception= True):
                facility = Facility.objects.get(id = kwargs['id'])
                facility.name = request.data.get('name')
                facility.description = request.data.get('description')
                facility.price = request.data.get('price')
                facility.image = request.data.get('image')
                if request.data.get('image'):
                    facility.image = request.data.get('image')
                    facility.save()
                    return Response({'message': 'Updated Without Image'}, status=status.HTTP_200_OK)
                facility.save()
                return Response({'message': 'Updated With Image'}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'msg': 'Login First'}, status=status.HTTP_401_UNAUTHORIZED)
        

class FacilityDelete(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get('token')
        verification, payload = verify_access_token(token)
        if verification:
            facility = Facility.objects.get(id = kwargs['id'])
            facility.delete()
            return Response({'message': 'Facility Deleted'}, status = 200)
        return Response({'msg': 'Login First'}, status = 401)
                    
