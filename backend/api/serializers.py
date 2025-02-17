from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
    
class PostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='author.username')
    class Meta:
        model = Post
        fields = ["id", "title", "content", "created_at", "author", "username"]
        extra_kwargs = {"author": {"read_only": True}, "username" : {"read_only": True}}