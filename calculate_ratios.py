import os
import numpy as np
import rasterio
import re

data_dir = "Timure_S1_TimeSeries_Stack.data"
output_dir = "Timure_Ratio_Outputs"
os.makedirs(output_dir, exist_ok=True)

img_files = [f for f in os.listdir(data_dir) if f.endswith('.img')]

# Custom sort function to handle 'ref' as 0 and sort 'secX' numerically
def extract_index(filename):
    if 'ref' in filename:
        return 0
    match = re.search(r'sec(\d+)', filename)
    return int(match.group(1)) if match else 99

# Sort files strictly by their sequence number
img_files_sorted = sorted(img_files, key=extract_index)

print(f"Sorted file count: {len(img_files_sorted)}")

# Your 9 dates in chronological order
dates = [
    "2026-05-05", "2026-06-10", "2026-07-23", 
    "2026-08-12", "2026-08-24", "2026-08-28 (Peak)", 
    "2026-09-05", "2026-09-21", "2026-10-06"
]

ratios = []

for i in range(9):
    vv_file = img_files_sorted[i * 2]      # Even index: VV
    vh_file = img_files_sorted[(i * 2) + 1]  # Odd index: VH
    
    with rasterio.open(os.path.join(data_dir, vv_file)) as src:
        vv = src.read(1).astype(np.float32)
        profile = src.profile
        
    with rasterio.open(os.path.join(data_dir, vh_file)) as src:
        vh = src.read(1).astype(np.float32)
        
    # Prevent division by zero
    vh = np.where(vh == 0, 1e-6, vh)
    ratio = vv / vh
    
    out_name = f"Ratio_{dates[i].split()[0].replace('-', '')}.tif"
    out_path = os.path.join(output_dir, out_name)
    
    profile.update(dtype=rasterio.float32, count=1)
    with rasterio.open(out_path, 'w', **profile) as dst:
        dst.write(ratio.astype(rasterio.float32), 1)
        
    ratios.append(ratio)
    print(f"Correctly paired & saved: {out_name} (VV: {vv_file}, VH: {vh_file})")

ratio_stack = np.array(ratios)
print(f"Final Ratio Stack Shape (Dates, Height, Width): {ratio_stack.shape}")