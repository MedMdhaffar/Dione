from django.urls import path
from .views import signup, verify_email
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('signin/', TokenObtainPairView.as_view(), name='signin'),
    path('verify/', verify_email),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
