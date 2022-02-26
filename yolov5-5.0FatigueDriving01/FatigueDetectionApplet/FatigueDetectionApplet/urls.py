"""FatigueDetectionApplet URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
# from django.urls import path
#
# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]
from django.urls import path

from . import views

urlpatterns = [
    path('PictureResult/',views.Distinguish.as_view()),
    path('VideoResult/', views.Distinguish.as_view()),
    path('MessageResult/', views.MessageView.as_view()),
    # path('VideoScreenShortResult/', views.VideoScreenShort.as_view()),
    # path('VideoStorageResult/', views.VideoStorage.as_view()),
    path('VerificationResult/', views.VerificationView.as_view()),
    path('PicturesResult/', views.DistinguishPicture.as_view()),
]
