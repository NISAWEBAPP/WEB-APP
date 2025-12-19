import pandas as pd
import json
import re
import os

def update_data():
    # Adjusting paths to match your folder structure
    csv_file = 'NISA TABLA.csv'
    js_file = 'layers/Combinado_3.js' 
    
    if not os.path.exists(csv_file):
        print(f"Error: {csv_file} not found in root.")
        return
    if not os.path.exists(js_file):
        print(f"Error: {js_file} not found. Make sure the 'layers' folder exists.")
        return

    # Load and clean CSV
    df = pd.read_csv(csv_file)
    df = df[df['ID'].notnull()]
    df['ID'] = df['ID'].astype(str).str.strip()
    # Filter out header/placeholder rows
    df = df[~df['ID'].str.contains('RESID', na=False)]
    df = df.drop_duplicates('ID', keep='first')
    csv_lookup = df.set_index('ID').to_dict(orient='index')

    # Read JS file
    with open(js_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find and parse the JSON object
    start = content.find('{')
    end = content.rfind('}')
    json_str = content[start:end+1]
    
    # Standardize JS to valid JSON
    json_str = re.sub(r'([{,])\s*([a-zA-Z0-9_]+)\s*:', r'\1"\2":', json_str)
    json_str = re.sub(r',\s*([}\]])', r'\1', json_str)
    
    data = json.loads(json_str)

    # Update properties based on ID
    updated_count = 0
    for feature in data.get('features', []):
        fid = str(feature['properties'].get('ID', '')).strip()
        if fid in csv_lookup:
            new_vals = {k: (str(v) if pd.notnull(v) else "") for k, v in csv_lookup[fid].items()}
            feature['properties'].update(new_vals)
            updated_count += 1

    # Write back to the JS file with the variable name
    with open(js_file, 'w', encoding='utf-8') as f:
        f.write("var json_Combinado_3 = " + json.dumps(data, indent=2, ensure_ascii=False) + ";")
    
    print(f"Success: Updated {updated_count} features in {js_file}")

if __name__ == "__main__":
    update_data()
