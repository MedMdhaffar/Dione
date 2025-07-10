from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from django.core.mail import send_mail
from django.core.cache import cache
from .serializers import SignupSerializer
import random
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate



@api_view(['POST'])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.is_active = False
        user.save()

        # Generate 6-digit code
        code = str(random.randint(100000, 999999))

        # Store in cache for 10 mins (600s)
        cache.set(f"verify:{user.username}", code, timeout=600)

        # Send email
        send_mail(
            subject='Verify your email',
            message=f'Your verification code is: {code}',
            from_email='no-reply@trendwave.com',
            recipient_list=[user.email],
        )

        return Response({"message": "Verification code sent to email."}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def verify_email(request):
    username = request.data.get("username")
    code = request.data.get("code")

    try:
        user = User.objects.get(username=username)
        real_code = cache.get(f"verify:{username}")

        if real_code is None:
            return Response({"error": "Verification code expired."}, status=400)
        if real_code != code:
            return Response({"error": "Invalid verification code."}, status=400)

        user.is_active = True
        user.save()
        cache.delete(f"verify:{username}")

        return Response({"message": "Email verified successfully."}, status=200)

    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)

@api_view(['POST'])
def signin(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    from django.contrib.auth import get_user_model
    User = get_user_model()

    try:
        user_obj = User.objects.get(email=email)
        user = authenticate(username=user_obj.username, password=password)
    except User.DoesNotExist:
        return Response({"error": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)

    if user is None:
        return Response({"error": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)

    if not user.is_active:
        return Response({"error": "Please verify your email before signing in."}, status=status.HTTP_403_FORBIDDEN)

    serializer = TokenObtainPairSerializer(data={
        "username": user.username,
        "password": password
    })

    if serializer.is_valid():
        return Response({
            "message": "Login successful",
            "tokens": serializer.validated_data,
            "user": {
                "username": user.username,
                "email": user.email,
                "id": user.id,
            }
        }, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
