from django.db import models

class HeatData(models.Model):
    name = models.CharField(max_length=100)  # 🔥 NEW
    latitude = models.FloatField()
    longitude = models.FloatField()
    temperature = models.FloatField()
    humidity = models.FloatField(null=True, blank=True)
    riskLevel = models.CharField(max_length=50)  # 🔥 NEW
    timestamp = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"{self.name} - {self.temperature}°C"