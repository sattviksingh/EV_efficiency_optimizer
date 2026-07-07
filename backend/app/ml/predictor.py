import joblib
import pandas as pd

model = joblib.load("app/ml_models/efficiency_model.pkl")


def predict_efficiency(data):

    features = pd.DataFrame([{
        "battery": data["battery"],
        "distance": data["distance"],
        "avg_speed": data["speed"],
        "max_speed": data["speed"],
        "battery_temp": data["temperature"],
        "ambient_temp": data["temperature"],
        "avg_voltage": 360,
        "avg_current": 20,
        "avg_throttle": 45,
        "avg_torque": 150,
        "elevation_gain": 10,
        "heating_power": 0.5,
        "aircon_power": 0.5,
    }])

    prediction = model.predict(features)

    return round(float(prediction[0]), 2)