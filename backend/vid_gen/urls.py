from django.urls import path
from .views import generate_video

urlpatterns=[
    path("generate-video/<str:topic>/", generate_video),
]