from ..ml.predictor import predict_efficiency


class EfficiencyService:

    @staticmethod
    def calculate_efficiency(distance, energy):
        if energy <= 0:
            return 0

        return round(distance / energy, 2)

    @staticmethod
    def predict_remaining_range(battery_percent, efficiency):
        battery_capacity = 40

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

        efficiency = predict_efficiency(data)

        battery = data["battery"]

        distance = data["distance"]

        speed = data["speed"]

        temperature = data["temperature"]

        predicted_range = round(
            (battery / 100) * 40 * efficiency,
            2
        )

        battery_usage = round(
            distance / efficiency,
            2
        )

        score = EfficiencyService.driving_score(
            speed,
            temperature
        )

        recommendation = "Excellent Driving."

        if score < 90:
            recommendation = "Reduce speed for better efficiency."

        if score < 75:
            recommendation = (
                "Avoid aggressive driving and heavy traffic."
            )

        return {
            "predicted_range": predicted_range,
            "battery_usage": battery_usage,
            "efficiency_score": efficiency,
            "driving_score": score,
            "recommendation": recommendation,
        }