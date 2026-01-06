import pandas as pd
import json
import re
import os

def update_data():
    csv_file = 'NISA TABLA.csv'
    js_file = 'layers/Combinado_3.js' 
    
    # 1. Define exactly which columns you want to show in the map popup
    # This removes the "EXITO", "UPDATING", and "Unnamed" columns
    allowed_columns = [
        "ID", 
        "Manzana", 
        "Lote", 
        "Superficie", 
        "Estado", 
        "Cuota", 
        "Total", 
        "Descuento", 
        "Contado"
    ]

    if not os.path.exists(csv_file):
        print(f"Error: {csv_file} no encontrado.")
        return
    if not os.path.exists(js_file):
        print(f"Error: {js_file} no encontrado.")
        return

    # Load CSV
    df = pd.read_csv(csv_file)
    df = df[df['ID'].notnull()]
    df['ID'] = df['ID'].astype(str).str.strip()
    df = df.drop_duplicates('ID', keep='first')
    
    # Convert CSV to dictionary
    csv_lookup = df.set_index('ID').to_dict(orient='index')

    # Read the JavaScript layer file
    with open(js_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract JSON part from the JS variable
    start = content.find('{')
    end = content.rfind('}')
    json_str = content[start:end+1]
    
    # Clean JS format to valid JSON
    json_str = re.sub(r'([{,])\s*([a-zA-Z0-9_]+)\s*:', r'\1"\2":', json_str)
    json_str = re.sub(r',\s*([}\]])', r'\1', json_str)
    
    data = json.loads(json_str)

    # 2. Update data with filtering logic
    for feature in data.get('features', []):
        fid = str(feature['properties'].get('ID', '')).strip()
        if fid in csv_lookup:
            raw_row = csv_lookup[fid]
            
            # Create a clean property dictionary using only allowed columns
            # This also ensures "Descuento" is mapped correctly
            clean_properties = {}
            for col in allowed_columns:
                if col in raw_row:
                    val = raw_row[col]
                    clean_properties[col] = str(val) if pd.notnull(val) else ""
            
            # Replace the old properties entirely with the filtered ones
            feature['properties'] = clean_properties

    # Save changes back to the JS file
    with open(js_file, 'w', encoding='utf-8') as f:
        f.write("var json_Combinado_3 = " + json.dumps(data, indent=2, ensure_ascii=False) + ";")
    
    print("¡Mapa actualizado con éxito y columnas filtradas!")

if __name__ == "__main__":
    update_data()
