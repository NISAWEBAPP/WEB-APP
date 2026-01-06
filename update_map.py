import pandas as pd
import json
import re
import os

def update_data():
    csv_file = 'NISA TABLA.csv'
    js_file = 'layers/Combinado_3.js' 
    
    allowed_columns = [
        "ID", "Manzana", "Lote", "Superficie", 
        "Estado", "Cuota", "Total", "Descuento", "Contado"
    ]

    if not os.path.exists(csv_file):
        print(f"Error: {csv_file} no encontrado.")
        return
    if not os.path.exists(js_file):
        print(f"Error: {js_file} no encontrado.")
        return

    # --- FIX 1: Keep 'ID' as a column even after setting it as index ---
    df = pd.read_csv(csv_file)
    df = df[df['ID'].notnull()]
    df['ID'] = df['ID'].astype(str).str.strip()
    df = df.drop_duplicates('ID', keep='first')
    # Using drop=False ensures 'ID' stays inside the dictionary values
    csv_lookup = df.set_index('ID', drop=False).to_dict(orient='index')

    # Read the JavaScript layer file
    with open(js_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract JSON part
    start = content.find('{')
    end = content.rfind('}')
    json_str = content[start:end+1]
    
    # Clean JS format to valid JSON
    json_str = re.sub(r'([{,])\s*([a-zA-Z0-9_]+)\s*:', r'\1"\2":', json_str)
    json_str = re.sub(r',\s*([}\]])', r'\1', json_str)
    
    data = json.loads(json_str)

    # Update data
    for feature in data.get('features', []):
        # Fix geometry structure (MultiPolygon to Polygon)
        if feature['geometry']['type'] == "MultiPolygon":
            feature['geometry']['type'] = "Polygon"
            coords = feature['geometry']['coordinates']
            if len(coords) > 0:
                feature['geometry']['coordinates'] = coords[0]

        # --- FIX 2: Safeguard ID retrieval ---
        # Get current ID from properties
        fid = str(feature['properties'].get('ID', '')).strip()
        
        if fid in csv_lookup:
            raw_row = csv_lookup[fid]
            clean_properties = {}
            
            for col in allowed_columns:
                if col in raw_row:
                    val = raw_row[col]
                    clean_properties[col] = str(val) if pd.notnull(val) else ""
            
            # Final check: if ID is still missing for some reason, force it back in
            if "ID" not in clean_properties or not clean_properties["ID"]:
                clean_properties["ID"] = fid
                
            feature['properties'] = clean_properties

    # Save changes back to the JS file
    with open(js_file, 'w', encoding='utf-8') as f:
        f.write("var json_Combinado_3 = " + json.dumps(data, indent=2, ensure_ascii=False) + ";")
    
    print("¡Mapa actualizado! ID preservado, columnas filtradas y geometría corregida.")

if __name__ == "__main__":
    update_data()
