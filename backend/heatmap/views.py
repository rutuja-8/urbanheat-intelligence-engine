from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import HeatData
from .serializers import HeatDataSerializer
from .ml_model import get_heat_clusters

@api_view(['GET'])
def get_heat_data(request):
    data = HeatData.objects.all()
    serializer = HeatDataSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_heat_data(request):
    serializer = HeatDataSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_clusters(request):
    data = get_heat_clusters()
    return Response(data)