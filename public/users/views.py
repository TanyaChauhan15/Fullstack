import uuid
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .forms import RegisterForm
from .models import UserProfile
from django.contrib.auth.models import User

def register_view(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            token = str(uuid.uuid4())
            UserProfile.objects.create(user=user, token=token)
            return redirect(f'/verify/{token}')
    else:
        form = RegisterForm()
    return render(request, 'register.html', {'form': form})


def verify_view(request, token):
    profile = UserProfile.objects.filter(token=token).first()
    if profile:
        profile.is_verified = True
        profile.save()
        return render(request, 'verify.html', {'message': 'Account Verified Successfully'})
    return render(request, 'verify.html', {'message': 'Invalid or expired link'})

def login_view(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            profile = UserProfile.objects.get(user=user)
            if profile.is_verified:
                login(request, user)
                return redirect('/dashboard')
            else:
                return render(request, 'login.html', {'error': 'Account not verified'})
        else:
            return render(request, 'login.html', {'error': 'Invalid credentials'})
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('/login')

@login_required(login_url='/login/')
def dashboard_view(request):
    return render(request, 'dashboard.html')


