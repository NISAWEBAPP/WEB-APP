import pandas as pd
import json
import re
import os

def update_data():
    # --- CONFIGURATION ---
    # Source is now the NISA table
    csv_file = 'NISA_TABLA.csv' 
    # Output is the Combinado file
    js_file = 'layers/COMBINADO_3.js'
    js_variable_name = "var json_COMBINADO_3 =" 
    
    # "Entrega" is NOT in this list, so it will be PURGED (deleted)
    ALLOWED_COLUMNS = [
        "ID", "Manzana", "Lote", "Superficie", "Estado", 
        "Cuota", "Total", "Descuento", "Contado"
    ]
    # ---------------------

    print(f"--- STARTING UPDATE: {csv_file} -> {js_file} ---")

    if not os.path.exists(csv_file) or not os.path.exists(js_file):
        print(f"ERROR: File not found. Check paths for {csv_file} and {js_file}")
        return

    # 1. Load CSV and filter allowed columns
    try:
        df = pd.read_csv(csv_file, dtype=str)
        cols_to_keep = [c for c in df.columns if c in ALLOWED_COLUMNS]
        df = df[cols_to_keep].fillna("")
        
        # Create lookup dictionary using 'ID'
        csv_lookup = df.set_index('ID').to_dict(orient='index')
        print(f"Loaded {len(csv_lookup)} properties from CSV.")
    except Exception as e:
        print(f"CSV ERROR: {e}")
        return

    # 2. Read JS and extract JSON
    with open(js_file, 'r', encoding='utf-8') as f:
        content = f.read()

    start, end = content.find('{'), content.rfind('}')
    json_str = content[start:end+1]
    
    # Fix potential JSON formatting issues from JS format
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
            
        # PURGE: Delete any key NOT in the allowed list (this removes "Entrega")
        keys_to_delete = [k for k in list(props.keys()) if k not in ALLOWED_COLUMNS]
        for k in keys_to_delete:
            del props[k]
            purge_count += 1

    print(f"Features updated: {update_count}")
    print(f"Fields purged: {purge_count}")

    # 4. Save the cleaned file
    new_content = f"{js_variable_name} {json.dumps(data, indent=2, ensure_ascii=False)};"
    with open(js_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"--- SUCCESS: {js_file} updated and cleaned ---")

if __name__ == "__main__":
    update_data()
