from django.urls import path
from .views import start_twitter_auth, twitter_callback

urlpatterns = [
    path("twitter/start/", start_twitter_auth, name="twitter_start"),
    path("twitter/callback/", twitter_callback, name="twitter_callback"),
]
