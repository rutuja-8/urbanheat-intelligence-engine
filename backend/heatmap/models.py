from django.db import models

class HeatData(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    temperature = models.FloatField()
    humidity = models.FloatField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.latitude}, {self.longitude} - {self.temperature}"