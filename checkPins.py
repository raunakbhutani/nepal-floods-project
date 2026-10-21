import pandas as pd

# Load flat text placemark files, skipping comment lines starting with '#'
bg_df = pd.read_csv('background_pins.txt', sep='\t', comment='#')
flood_df = pd.read_csv('flood_pins.txt', sep='\t', comment='#')

print("--- Background Pins Summary ---")
print(f"Total points: {len(bg_df)}")
print("Available columns:", bg_df.columns.tolist())
print(bg_df.head(3))

print("\n--- Flood Pins Summary ---")
print(f"Total points: {len(flood_df)}")
print("Available columns:", flood_df.columns.tolist())
print(flood_df.head(3))