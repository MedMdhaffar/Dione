from django.urls import path
from .views import signup, verify_email, signin
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('signin/', signin, name='signin'),  # custom signin view
    path('verify/', verify_email, name='verify_email'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]