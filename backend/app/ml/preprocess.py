import os
import pandas as pd

DATASET_PATH = "app/datasets"
OUTPUT_FILE = "app/datasets/processed_ev_data.csv"

rows = []

required_columns = [
    "Time [s]",
    "Velocity [km/h]",
    "Battery Voltage [V]",
    "Battery Current [A]",
    "SoC [%]",
    "Battery Temperature [°C]",
    "Ambient Temperature [°C]",
    "Throttle [%]",
    "Motor Torque [Nm]",
    "Elevation [m]",
    "Heating Power CAN [kW]",
    "AirCon Power [kW]",
]

for file in sorted(os.listdir(DATASET_PATH)):

    if not file.endswith(".csv"):
        continue

    print(f"Processing {file}")

    try:

        df = pd.read_csv(
            os.path.join(DATASET_PATH, file),
            encoding="latin1",
            sep=";"
        )

        # -----------------------------
        # Clean column names
        # -----------------------------
        df.columns = (
            df.columns
            .str.strip()
            .str.replace("]]]", "]", regex=False)
            .str.replace("]]", "]", regex=False)
        )

        # -----------------------------
        # Verify required columns
        # -----------------------------
        missing = [
            c for c in required_columns
            if c not in df.columns
        ]

        if missing:
            print(f"Skipping {file}")
            print("Missing:", missing)
            print("-----------------------------------")
            continue

        df = df.dropna()

        if len(df) < 20:
            print("Skipped (too few rows)")
            continue

        # ---------------------------------------
        # Extract columns
        # ---------------------------------------

        time = df["Time [s]"]

        speed = df["Velocity [km/h]"]

        voltage = df["Battery Voltage [V]"]

        current = df["Battery Current [A]"]

        soc = df["SoC [%]"]

        battery_temp = df["Battery Temperature [°C]"]

        ambient_temp = df["Ambient Temperature [°C]"]

        throttle = df["Throttle [%]"]

        torque = df["Motor Torque [Nm]"]

        elevation = df["Elevation [m]"]

        heating = df["Heating Power CAN [kW]"]

        aircon = df["AirCon Power [kW]"]

        # ---------------------------------------
        # Time Difference
        # ---------------------------------------

        dt = time.diff().fillna(0)

        # ---------------------------------------
        # Distance Travelled (km)
        # ---------------------------------------

        distance = (speed * dt / 3600).sum()

        # ---------------------------------------
        # Energy Consumed (kWh)
        #
        # Negative current = battery discharge
        # Positive current = regenerative braking
        # ---------------------------------------

        discharge_current = current.clip(upper=0).abs()

        power_kw = (voltage * discharge_current) / 1000

        energy = (power_kw * dt / 3600).sum()

        if energy < 0.05:
            print("Skipped (very low energy)")
            continue

        if distance < 0.5:
            print("Skipped (very short trip)")
            continue

        efficiency = round(distance / energy, 2)

        rows.append({

            "battery": soc.iloc[0],

            "distance": round(distance, 2),

            "avg_speed": round(speed.mean(), 2),

            "max_speed": round(speed.max(), 2),

            "battery_temp": round(battery_temp.mean(), 2),

            "ambient_temp": round(ambient_temp.mean(), 2),

            "avg_voltage": round(voltage.mean(), 2),

            "avg_current": round(discharge_current.mean(), 2),

            "avg_throttle": round(throttle.mean(), 2),

            "avg_torque": round(torque.mean(), 2),

            "elevation_gain": round(
                elevation.max() - elevation.min(),
                2
            ),

            "heating_power": round(heating.mean(), 2),

            "aircon_power": round(aircon.mean(), 2),

            "efficiency": efficiency

        })

    except Exception as e:

        print(f"Error processing {file}")

        print(e)

        print("-----------------------------------")

processed = pd.DataFrame(rows)

processed.to_csv(
    OUTPUT_FILE,
    index=False
)

print("\n========================================")
print("Dataset Created Successfully")
print("========================================")
print(processed.head())
print()
print(f"Trips Processed : {len(processed)}")
print(f"Dataset Shape   : {processed.shape}")
print(f"Saved to        : {OUTPUT_FILE}")
print("========================================")