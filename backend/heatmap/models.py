from django.db import models


# 🔥 LIVE DATA (only latest state per area)
class HeatData(models.Model):
    name = models.CharField(max_length=100, unique=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    temperature = models.FloatField()
    riskLevel = models.CharField(max_length=20)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.temperature}°C)"


# 📊 HISTORY DATA (stores all records)
class HeatDataHistory(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    temperature = models.FloatField()
    riskLevel = models.CharField(max_length=20)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.temperature}°C @ {self.timestamp}"