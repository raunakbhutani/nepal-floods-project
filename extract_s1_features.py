import os
import glob
import pandas as pd
import numpy as ip
import rasterio

# 1. Load validated pin files (skipping SNAP comment headers)
print("Loading pin coordinates...")
bg_df = pd.read_csv('background_pins.txt', sep='\t', comment='#')
flood_df = pd.read_csv('flood_pins.txt', sep='\t', comment='#')

# Add binary target labels (0 = Background/Stable land, 1 = Flood/Water)
bg_df['target'] = 0
flood_df['target'] = 1

# Combine both dataframes into one master pin table
pins_df = pd.concat([bg_df, flood_df], ignore_index=True)
print(f"Total pins loaded: {len(pins_df)} ({len(bg_df)} background, {len(flood_df)} flood)")

# 2. Locate the Sentinel-1 stack data folder
stack_data_dir = 'Timure_S1_TimeSeries_Stack.data'
if not os.path.exists(stack_data_dir):
    raise FileNotFoundError(f"Could not find directory: {stack_data_dir}. Ensure it is in the same folder.")

# Find all band raster files (.img) inside the stack data folder
band_files = glob.glob(os.path.join(stack_data_dir, '*.img'))
print(f"Found {len(band_files)} raster bands in the stack.")

# 3. Extract pixel values for each pin across all bands
extracted_data = []

for idx, row in pins_df.iterrows():
    pin_info = {
        'Name': row['Name'],
        'X': row['X'],
        'Y': row['Y'],
        'Lon': row['Lon'],
        'Lat': row['Lat'],
        'target': row['target']
    }
    
    # SNAP pixel coordinates are floats; convert to integer pixel indices (row, col)
    col_idx = int(round(row['X']))
    row_idx = int(round(row['Y']))
    
    # Extract values from each band file
    for b_path in band_files:
        band_name = os.path.splitext(os.path.basename(b_path))[0]
        try:
            with rasterio.open(b_path) as src:
                # Read the single pixel value at (row, col)
                # rasterio window format: window=((row, row+1), (col, col+1))
                window = rasterio.windows.Window(col_idx, row_idx, 1, 1)
                val = src.read(1, window=window)[0, 0]
                pin_info[band_name] = val
        except Exception as e:
            pin_info[band_name] = None
            
    extracted_data.append(pin_info)

# 4. Convert results to a final DataFrame and save as CSV
features_df = pd.DataFrame(extracted_data)

# Drop rows where extraction failed or values are NaN
features_df = features_df.dropna()

output_filename = 's1_features.csv'
features_df.to_csv(output_filename, index=False)

print(f"\nFeature extraction complete!")
print(f"Saved {len(features_df)} valid samples with {len(features_df.columns)-6} feature bands to '{output_filename}'.")
print("\nFirst 3 rows of extracted features preview:")
print(features_df.head(3)[['Name', 'target', 'Lon', 'Lat']])