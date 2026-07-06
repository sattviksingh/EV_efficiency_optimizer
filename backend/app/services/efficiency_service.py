class EfficiencyService:

    @staticmethod
    def calculate_efficiency(distance, energy):
        if energy <= 0:
            return 0

        return round(distance / energy, 2)

    @staticmethod
    def predict_remaining_range(battery_percent, efficiency):
        battery_capacity = 40  # kWh

        remaining_energy = battery_capacity * (battery_percent / 100)

        return round(remaining_energy * efficiency, 2)

    @staticmethod
    def driving_score(speed, temperature):
        score = 100

        if speed > 90:
            score -= 15

        if temperature > 35:
            score -= 5

        return max(score, 0)

    @staticmethod
    def predict(data):
        battery = data["battery"]
        distance = data["distance"]
        speed = data["speed"]
        temperature = data["temperature"]
        traffic = data["traffic"]

        efficiency = 7.5

        if speed > 80:
            efficiency -= 0.8

        if temperature > 35:
            efficiency -= 0.5

        if traffic == "High":
            efficiency -= 0.7

        battery_usage = round(distance / efficiency, 2)

        predicted_range = round(
            (battery / 100) * 40 * efficiency,
            2
        )

        recommendation = "Maintain current driving style."

        if speed > 80:
            recommendation = "Reduce speed to improve battery life."

        return {
            "predicted_range": predicted_range,
            "battery_usage": battery_usage,
            "efficiency_score": round(efficiency, 2),
            "recommendation": recommendation,
        }