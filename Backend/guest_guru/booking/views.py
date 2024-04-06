from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Booking, Room
from .serializer import BookingSerializer, RoomSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from datetime import datetime, timedelta
from django.utils import timezone
from registration.verify import verify_access_token 
from .models import Booking, Room


# Create your views here.

class BookingView(ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    
 
    def post(self, request):
        token = request.COOKIES.get('token')
        verification, payload = verify_access_token(token)
        data = request.data
        check_in_date = request.data.get('check_in')
        check_out_date = request.data.get('check_out')

        current_datetime_date = datetime.now()

# Convert datetime object to string in YYYY-MM-DD format
        current_datetime_a= current_datetime_date.strftime('%Y-%m-%d')
        current_datetime = datetime.strptime(current_datetime_a, '%Y-%m-%d').date()
        check_in= datetime.strptime(check_in_date, '%Y-%m-%d').date()
        check_out= datetime.strptime(check_out_date, '%Y-%m-%d').date()

        # check_out= check_out_date.strftime('%Y-%m-%d')
        print("current date", type(current_datetime))
        print("Check in ", type(check_in))

        if check_in < current_datetime:
            return Response({'msg': 'Invalid check in date'}, status=status.HTTP_400_BAD_REQUEST)
        if check_out < check_in:
            return Response({'msg': 'Invalid check out date'}, status=status.HTTP_400_BAD_REQUEST)
        if (check_out - check_in).days > 30:
            return Response({'msg': 'Cannot book for more than 30 days'}, status=status.HTTP_400_BAD_REQUEST)
        if (check_in - current_datetime).days > 30:
            return Response({'msg': 'Cannot book for more than 30 days in advance'}, status=status.HTTP_400_BAD_REQUEST)
        room = Room.objects.filter(id=request.data.get('room_type'))

        print("Room Id", request.data.get('room_type'))
        print("Room", room)
        if len(room) == 0:
            return Response({'msg': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)
        if room[0].capacity < int(request.data.get('guest_count')):
            return Response({'msg': 'Room capacity exceeded'}, status=status.HTTP_400_BAD_REQUEST)
        
        bookingObj = Booking.objects.filter(room_id = request.data.get('room_type'))
        for booking in bookingObj:
            print("type booking", type(booking.check_in))
            print("type checkin", type(check_in))

            if booking.check_out >= check_in and booking.check_in <= check_in:
                return Response({'msg': 'Room already booked'}, status=status.HTTP_406_NOT_ACCEPTABLE)
            
        if verification:
            Booking.objects.create(check_in=check_in, check_out=check_out, guest_count=request.data.get('guest_count'), room_id=request.data.get('room_type'), user_id=payload['user_id'])
            return Response({'msg': 'Booking successful'}, status=status.HTTP_201_CREATED)
        return Response({'msg': 'Login First'}, status=status.HTTP_401_UNAUTHORIZED)
            
class BookingDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class RoomView(ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def post(self, request):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg':'Created'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RoomDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class AvailableRoomsView(APIView):

    def get(self, request):
        data = request.data
        check_in = timezone.make_aware(datetime.strptime(data['check_in'], '%Y-%m-%d'))
        check_out = timezone.make_aware(datetime.strptime(data['check_out'], '%Y-%m-%d'))
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