from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VideoViewSet, register_user, CustomAuthToken

router = DefaultRouter()
router.register(r'videos', VideoViewSet, basename='video')

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('', include(router.urls)),
]
