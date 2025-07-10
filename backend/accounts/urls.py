from django.urls import path
from .views import signup, verify_email
from .views import CustomTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('signin/', CustomTokenObtainPairView.as_view(), name='signin'),
    path('verify/', verify_email),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
