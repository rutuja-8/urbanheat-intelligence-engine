import numpy as np
from sklearn.cluster import KMeans
from .models import HeatData

def get_heat_clusters():
    data = HeatData.objects.all()

    # convert queryset to list
    data_list = list(data)

    if len(data_list) == 0:
        return []

    coords = np.array([
        [d.latitude, d.longitude, d.temperature]
        for d in data_list
    ])

    # 🔥 FIX: handle small data safely
    if len(coords) < 3:
        return [0] * len(coords)

    kmeans = KMeans(n_clusters=3, n_init=10)
    kmeans.fit(coords)

    return kmeans.labels_.tolist()