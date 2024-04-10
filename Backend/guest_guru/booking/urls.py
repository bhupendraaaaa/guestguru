from django.urls import path, include
from .views import BookingView, BookingDetailView, RoomView, RoomDetailView, AvailableRoomsView, RoomEditView, RoomDeleteView, AllBookingDetailsView
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('booking/', BookingView.as_view()),
    path('booking/<int:pk>/', BookingDetailView.as_view()),
    path('room/', RoomView.as_view()),
    path('room/<int:pk>/', RoomDetailView.as_view()),
    path('available-room/', AvailableRoomsView.as_view()),
    path('edit/<int:id>/', RoomEditView.as_view()),
    path('delete/<int:id>/', RoomDeleteView.as_view()),
    path('all-booking/', AllBookingDetailsView.as_view()),
    
]
