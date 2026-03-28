from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import HeatData
from .serializers import HeatDataSerializer

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
        return Response(serializer.data)
    return Response(serializer.errors)