import random
from datetime import timedelta
from django.utils.timezone import now

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import HeatData, HeatDataHistory
from .serializers import HeatDataSerializer
from .ml_model import get_heat_clusters


# 🔹 GET LIVE DATA
@api_view(['GET'])
def get_heat_data(request):
    data = HeatData.objects.all().order_by('name')  # ✅ consistent order
    serializer = HeatDataSerializer(data, many=True)
    return Response(serializer.data)


# 🔹 GET HISTORY (LAST N MINUTES)
@api_view(['GET'])
def get_history(request):
    minutes = int(request.GET.get("minutes", 10))
    since = now() - timedelta(minutes=minutes)

    qs = HeatDataHistory.objects.filter(timestamp__gte=since).order_by('timestamp')

    result = []
    for d in qs:
        result.append({
            "name": d.name,
            "temperature": float(d.temperature),
            "latitude": float(d.latitude),
            "longitude": float(d.longitude),
            "riskLevel": d.riskLevel,
            "timestamp": d.timestamp.strftime("%H:%M:%S")
        })

    return Response(result)


# 🔹 GET CLUSTERS (ML OUTPUT)
@api_view(['GET'])
def get_clusters(request):
    data = list(HeatData.objects.all().order_by('name'))  # ✅ SAME ORDER as serializer
    serializer = HeatDataSerializer(data, many=True)
    clusters = get_heat_clusters()

    result = []

    for i, item in enumerate(serializer.data):
        item['cluster'] = clusters[i] if i < len(clusters) else 0
        result.append(item)

    return Response(result)


# 🔹 ADD DATA (MANUAL ENTRY)
@api_view(['POST'])
def add_heat_data(request):
    serializer = HeatDataSerializer(data=request.data)

    if serializer.is_valid():
        obj = serializer.save()

        # 🔥 ALSO SAVE HISTORY
        HeatDataHistory.objects.create(
            name=obj.name,
            latitude=obj.latitude,
            longitude=obj.longitude,
            temperature=obj.temperature,
            riskLevel=obj.riskLevel
        )

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 🔹 SIMULATE LIVE DATA
@api_view(['POST'])
def simulate_data(request):
    areas = [
        ("Hinjewadi", 18.5912, 73.7389),
        ("Kharadi", 18.5515, 73.9475),
        ("Aundh", 18.5610, 73.8070),
        ("Kothrud", 18.5074, 73.8077),
        ("PCMC", 18.6298, 73.7997),  # ✅ IMPORTANT
    ]

    updated_data = []

    for name, lat, lon in areas:
        temp = random.randint(30, 45)

        # 🔥 risk logic
        if temp >= 40:
            risk = "Critical"
        elif temp >= 37:
            risk = "High"
        elif temp >= 34:
            risk = "Moderate"
        else:
            risk = "Low"

        # ✅ UPDATE OR CREATE
        obj, created = HeatData.objects.update_or_create(
            name=name,
            defaults={
                "latitude": lat,
                "longitude": lon,
                "temperature": temp,
                "riskLevel": risk
            }
        )

        # ✅ SAVE HISTORY
        HeatDataHistory.objects.create(
            name=name,
            latitude=lat,
            longitude=lon,
            temperature=temp,
            riskLevel=risk
        )

        updated_data.append({
            "name": name,
            "temperature": temp,
            "riskLevel": risk,
            "updated": not created
        })

    return Response({
        "message": "Live + History updated",
        "data": updated_data
    })