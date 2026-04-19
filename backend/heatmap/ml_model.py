import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from .models import HeatData


def get_heat_clusters():
    data = HeatData.objects.all()
    data_list = list(data)

    if len(data_list) == 0:
        return []

    # ✅ Combine features
    features = np.array([
        [d.latitude, d.longitude, d.temperature]
        for d in data_list
    ])

    # ✅ Normalize data
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(features)

    # 🔥 Give more weight to temperature
    # index 2 = temperature
    scaled_features[:, 2] *= 2.5   # 🔥 adjust this weight

    # 🔥 handle small data
    if len(scaled_features) < 3:
        result = []
        for d in data_list:
            result.append({
                "name": d.name,
                "temperature": d.temperature,
                "latitude": d.latitude,
                "longitude": d.longitude,
                "riskLevel": d.riskLevel,
                "cluster": 0
            })
        return result

    # ✅ KMeans
    kmeans = KMeans(n_clusters=3, n_init=10, random_state=0)
    kmeans.fit(scaled_features)

    labels = kmeans.labels_

    # ✅ return structured data
    result = []
    for i, d in enumerate(data_list):
        result.append({
            "name": d.name,
            "temperature": d.temperature,
            "latitude": d.latitude,
            "longitude": d.longitude,
            "riskLevel": d.riskLevel,
            "cluster": int(labels[i])
        })

    return result