
from django.urls import path, include
from .views import *


urlpatterns = [
    path('facilities/',  FacilityPost.as_view()),
    path('view/', FacilityView.as_view()),
    path('edit/<int:id>/', FacilityEdit.as_view()),
    path('delete/<int:id>/', FacilityDelete.as_view()),
]