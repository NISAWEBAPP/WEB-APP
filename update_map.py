import pandas as pd
import json
import re
import os

def update_data():
    csv_file = 'NISA TABLA.csv'
    js_file = 'layers/Combinado_3.js' 
    
    # --- Diagnóstico de archivos ---
    print(f"Buscando archivos en: {os.getcwd()}")
    print(f"Contenido de la carpeta principal: {os.listdir('.')}")
    if os.path.exists('layers'):
        print(f"Contenido de la carpeta 'layers': {os.listdir('layers')}")
    else:
        print("ERROR: No se encontró la carpeta 'layers'")
    # -------------------------------

    if not os.path.exists(csv_file):
        print(f"Error: {csv_file} no encontrado.")
        return
    if not os.path.exists(js_file):
        print(f"Error: {js_file} no encontrado.")
        return

    # Cargar CSV
    df = pd.read_csv(csv_file)
    df = df[df['ID'].notnull()]
    df['ID'] = df['ID'].astype(str).str.strip()
    df = df.drop_duplicates('ID', keep='first')
    csv_lookup = df.set_index('ID').to_dict(orient='index')

    # Leer JS
    with open(js_file, 'r', encoding='utf-8') as f:
        content = f.read()

    start = content.find('{')
    end = content.rfind('}')
    json_str = content[start:end+1]
    
    # Limpiar formato JS a JSON
    json_str = re.sub(r'([{,])\s*([a-zA-Z0-9_]+)\s*:', r'\1"\2":', json_str)
    json_str = re.sub(r',\s*([}\]])', r'\1', json_str)
    
    data = json.loads(json_str)

    # Actualizar datos
    for feature in data.get('features', []):
        fid = str(feature['properties'].get('ID', '')).strip()
        if fid in csv_lookup:
            new_vals = {k: (str(v) if pd.notnull(v) else "") for k, v in csv_lookup[fid].items()}
            feature['properties'].update(new_vals)

    # Guardar cambios
    with open(js_file, 'w', encoding='utf-8') as f:
        f.write("var json_Combinado_3 = " + json.dumps(data, indent=2, ensure_ascii=False) + ";")
    
    print("¡Mapa actualizado con éxito!")

if __name__ == "__main__":
    update_data()
