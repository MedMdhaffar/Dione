from rest_framework import serializers
from django.core.validators import validate_email as django_validate_email
from django.core.exceptions import ValidationError
from .models import User


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, email):
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email is already registered.")
        try:
            django_validate_email(email)  # format-only validation, no network calls
        except ValidationError:
            raise serializers.ValidationError("Invalid email address format.")
        return email

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

        
