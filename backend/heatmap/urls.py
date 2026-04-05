from django.urls import path
from . import views

urlpatterns = [
    path('data/', views.get_heat_data),
    path('add/', views.add_heat_data),
    path('clusters/', views.get_clusters),
]