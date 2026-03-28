from rest_framework import serializers
from .models import HeatData

class HeatDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeatData
        fields = '__all__'
        