import pandas as pd
import json
import re
import os

def update_data():
    # --- CONFIGURATION FOR NISA ---
    csv_file = 'layers/NISA_TABLA.csv' 
    js_file = 'layers/NISA_3.js'
    js_variable_name = "var json_NISA_3 =" 
    
    # "Entrega" is REMOVED from this list so the script deletes it from the JS file
    ALLOWED_COLUMNS = [
        "ID", "Manzana", "Lote", "Superficie", "Estado", 
        "Cuota", "Total", "Descuento", "Contado"
    ]
    # ------------------------------

    print(f"--- STARTING NISA UPDATE: {js_file} ---")

    if not os.path.exists(csv_file) or not os.path.exists(js_file):
        print(f"ERROR: Files not found. Looking for {js_file} and {csv_file}")
        return

    # 1. Load CSV and filter columns
    try:
        df = pd.read_csv(csv_file, dtype=str)
        # Only keep columns in our whitelist
        cols_to_keep = [c for c in df.columns if c in ALLOWED_COLUMNS]
        df = df[cols_to_keep].fillna("")
        
        # Create lookup dictionary using 'ID'
        csv_lookup = df.set_index('ID').to_dict(orient='index')
        print(f"Loaded {len(csv_lookup)} properties from {csv_file}")
    except Exception as e:
        print(f"CSV ERROR: {e}")
        return

    # 2. Read JS and extract JSON
    with open(js_file, 'r', encoding='utf-8') as f:
        content = f.read()

    start, end = content.find('{'), content.rfind('}')
    json_str = content[start:end+1]
    
    # Fix potential JSON formatting issues
    json_str = re.sub(r'([{,])\s*([a-zA-Z0-9_]+)\s*:', r'\1"\2":', json_str)
    
    try:
        data = json.loads(json_str)
    except Exception as e:
        print(f"JSON DECODE ERROR: {e}")
        return

    # 3. UPDATE and PURGE
    update_count = 0
    purge_count = 0
    
    for feature in data.get('features', []):
        props = feature.get('properties', {})
        fid = str(props.get('ID', '')).strip()
        
        # Update values from CSV if ID matches
        if fid in csv_lookup:
            props.update(csv_lookup[fid])
            update_count += 1
            
        # PURGE: Delete any key NOT in the allowed list (removes "Entrega", "field_11", etc.)
        keys_to_delete = [k for k in list(props.keys()) if k not in ALLOWED_COLUMNS]
        for k in keys_to_delete:
            del props[k]
            purge_count += 1

    print(f"NISA Features updated: {update_count}")
    print(f"Unwanted fields deleted (including 'Entrega'): {purge_count}")

    # 4. Save the cleaned file
    new_content = f"{js_variable_name} {json.dumps(data, indent=2, ensure_ascii=False)};"
    with open(js_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"--- SUCCESS: {js_file} is now clean and updated. ---")

if __name__ == "__main__":
    update_data()
