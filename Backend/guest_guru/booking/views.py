from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Booking, Room
from .serializer import BookingSerializer, RoomSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from datetime import datetime, timedelta
from django.utils import timezone


# Create your views here.

class BookingView(ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
 
    def post(self, request):
        data = request.data
        check_in = datetime.strptime(data['check_in'], '%Y-%m-%d %H:%M:%S')
        check_out = datetime.strptime(data['check_out'], '%Y-%m-%d %H:%M:%S')
        if check_in < datetime.now():
            return Response({'msg': 'Invalid check in date'}, status=status.HTTP_400_BAD_REQUEST)
        if check_out < check_in:
            return Response({'msg': 'Invalid check out date'}, status=status.HTTP_400_BAD_REQUEST)
        if (check_out - check_in).days > 30:
            return Response({'msg': 'Cannot book for more than 30 days'}, status=status.HTTP_400_BAD_REQUEST)
        if (check_in - datetime.now()).days > 30:
            return Response({'msg': 'Cannot book for more than 30 days in advance'}, status=status.HTTP_400_BAD_REQUEST)
        room = Room.objects.get(id=data['room'])
        if room.capacity < int(data['guest_count']):
            return Response({'msg': 'Room capacity exceeded'}, status=status.HTTP_400_BAD_REQUEST)
        
        bookings = Booking.objects.filter(room=room)

        
        for booking in bookings:
    # Ensure the booking times are timezone aware
            booking_check_in = booking.check_in if timezone.is_aware(booking.check_in) else timezone.make_aware(booking.check_in)
            booking_check_out = booking.check_out if timezone.is_aware(booking.check_out) else timezone.make_aware(booking.check_out)

            # Ensure the check_in and check_out times are timezone aware
            check_in = check_in if timezone.is_aware(check_in) else timezone.make_aware(check_in)
            check_out = check_out if timezone.is_aware(check_out) else timezone.make_aware(check_out)

            if check_in < booking_check_out and check_out > booking_check_in:
                return Response({'msg': 'Room already booked'}, status=status.HTTP_400_BAD_REQUEST)
            
        serializer = BookingSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class BookingDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class RoomView(ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def post(self, request):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RoomDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class AvailableRoomsView(APIView):

    def get(self, request):
        data = request.data
        check_in = timezone.make_aware(datetime.strptime(data['check_in'], '%Y-%m-%d %H:%M:%S'))
        check_out = timezone.make_aware(datetime.strptime(data['check_out'], '%Y-%m-%d %H:%M:%S'))
        now = timezone.now()
        
        if check_in < now:
            return Response({'msg': 'Invalid check in date'}, status=status.HTTP_400_BAD_REQUEST)
        if check_out < check_in:
            return Response({'msg': 'Invalid check out date'}, status=status.HTTP_400_BAD_REQUEST)
        if (check_out - check_in).days > 30:
            return Response({'msg': 'Cannot book for more than 30 days'}, status=status.HTTP_400_BAD_REQUEST)
        if (check_in - now).days > 30:
            return Response({'msg': 'Cannot book for more than 30 days in advance'}, status=status.HTTP_400_BAD_REQUEST)
        
        rooms = Room.objects.all()
        available_rooms = []
        for room in rooms:
            bookings = Booking.objects.filter(room=room)
            available = True
            for booking in bookings:
                booking_check_in = booking.check_in if timezone.is_aware(booking.check_in) else timezone.make_aware(booking.check_in)
                booking_check_out = booking.check_out if timezone.is_aware(booking.check_out) else timezone.make_aware(booking.check_out)
                if check_in < booking_check_out and check_out > booking_check_in:
                    available = False
                    break
            if available:
                available_rooms.append(room)
        
        serializer = RoomSerializer(available_rooms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
