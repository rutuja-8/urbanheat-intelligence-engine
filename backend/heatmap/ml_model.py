import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from .models import HeatData


def get_heat_clusters():
    data = HeatData.objects.all()
    data_list = list(data)

    # ✅ No data case
    if len(data_list) == 0:
        return []

    # ✅ Features: latitude, longitude, temperature
    features = np.array([
        [float(d.latitude), float(d.longitude), float(d.temperature)]
        for d in data_list
    ])

    # ✅ Scale features
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(features)

    # 🔥 Give more importance to temperature
    scaled_features[:, 2] *= 2.5

    # 🔥 Handle small dataset
    if len(scaled_features) < 3:
        return [0] * len(scaled_features)

    # ✅ Apply KMeans clustering
    kmeans = KMeans(n_clusters=3, n_init=10, random_state=0)
    kmeans.fit(scaled_features)

    # ✅ RETURN ONLY LABELS (CRITICAL)
    return kmeans.labels_.astype(int).tolist()