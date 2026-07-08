"""
Tests for AgroVision AI ML Service
Run: pytest tests/test_ml.py -v
"""
import pytest
from fastapi.testclient import TestClient
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from main import app

client = TestClient(app)


def test_health():
    resp = client.get("/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "ok"
    assert "models" in data


def test_root():
    resp = client.get("/")
    assert resp.status_code == 200
    assert resp.json()["service"] == "AgroVision AI ML Service"


def test_model_metrics():
    resp = client.get("/model-metrics")
    assert resp.status_code == 200
    data = resp.json()
    assert "models" in data
    assert len(data["models"]) >= 5


def test_recommend_crop_valid():
    resp = client.post("/recommend-crop", json={
        "state": "Maharashtra",
        "district": "Nashik",
        "soil_type": "Black Cotton",
        "rainfall": 800,
        "temperature": 28,
        "humidity": 65,
        "ph_level": 6.5,
        "water_availability": "Medium",
        "season": "Kharif",
        "farm_size": 2.5
    })
    assert resp.status_code == 200
    data = resp.json()
    assert "top_crop" in data
    assert "confidence" in data
    assert "yield_prediction" in data
    assert "fertilizer_plan" in data
    assert "radar_data" in data
    assert len(data["radar_data"]) == 6


def test_recommend_crop_missing_fields():
    resp = client.post("/recommend-crop", json={
        "state": "Maharashtra",
        "district": "Pune",
    })
    assert resp.status_code == 422  # Validation error


def test_predict_rain():
    resp = client.post("/predict-rain", json={
        "city": "Mumbai",
        "days": 7
    })
    assert resp.status_code == 200
    data = resp.json()
    assert "rain_probability_7days" in data
    assert len(data["rain_probability_7days"]) == 7
    assert "drought_risk" in data
    assert "flood_risk" in data


def test_predict_disease_no_image():
    resp = client.post("/predict-disease")
    assert resp.status_code == 422  # Missing file


def test_predict_disease_wrong_type():
    import io
    resp = client.post("/predict-disease", files={"image": ("test.txt", io.BytesIO(b"not an image"), "text/plain")})
    assert resp.status_code == 400
