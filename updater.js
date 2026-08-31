const GITHUB_RAW_URL = "https://raw.githubusercontent.com/NISAWEBAPP/WEB-APP/main/";
const CACHE_NAME = "mapa-capas-v1";

const capasAActualizar = [
    "layers/layers.js",
    "layers/FRACCION_0.js",
    "layers/Combinado_3.js",
    "layers/FRACCIONcopiar_4.js",
    "layers/fraccion_5.js",
    "layers/NOMBREFRACCION_6.js",
    "layers/MANZANAS_7.js",
    "styles/FRACCION_0_style.js",
    "styles/Combinado_3_style.js",
    "styles/FRACCIONcopiar_4_style.js",
    "styles/fraccion_5_style.js",
    "styles/NOMBREFRACCION_6_style.js",
    "styles/MANZANAS_7_style.js"
];

async function obtenerVersionLocal() {
    try {
        const response = await fetch('./version.json');
        const data = await response.json();
        
        // Cortamos el texto en el espacio. De "2026-08-31 15:30", muestra solo "2026-08-31"
        const fechaVisible = data.fecha_completa.split(" ")[0]; 
        document.getElementById('version-local').innerText = fechaVisible;
        
        return data.fecha_completa; // Retorna la fecha exacta con minutos para la lógica interna
    } catch (e) {
        console.error("Error leyendo versión local");
        return null;
    }
}

async function actualizarCapas() {
    const btn = document.getElementById('btn-actualizar');
    btn.innerText = "Buscando actualizaciones...";
    btn.disabled = true;

    try {
        const responseGit = await fetch(GITHUB_RAW_URL + 'version.json');
        
        if (!responseGit.ok) {
            throw new Error("GitHub respondió: " + responseGit.status);
        }

        const dataGit = await responseGit.json();
        const fechaLocal = await obtenerVersionLocal();

        if (dataGit.fecha_completa !== fechaLocal) {
            btn.innerText = "Descargando capas...";
            const cache = await caches.open(CACHE_NAME);

            for (let capa of capasAActualizar) {
                let resCapa = await fetch(GITHUB_RAW_URL + capa);
                if (resCapa.ok) {
                    let textoOriginal = await resCapa.text();
                    let respuestaJS = new Response(textoOriginal, {
                        headers: { "Content-Type": "application/javascript; charset=utf-8" }
                    });
                    await cache.put(new Request('./' + capa), respuestaJS);
                }
            }
            
            await cache.put(new Request('./version.json'), new Response(JSON.stringify(dataGit)));
            
            const fechaCorta = dataGit.fecha_completa.split(" ")[0];
            alert("Capas actualizadas al " + fechaCorta + ". Recarga la app.");
            location.reload();
        } else {
            alert("Ya tienes los datos más recientes.");
        }
    } catch (error) {
        alert("Fallo técnico: " + error.message);
    } finally {
        btn.innerText = "Actualizar Capas";
        btn.disabled = false;
    }
}

document.getElementById('btn-actualizar').addEventListener('click', actualizarCapas);
obtenerVersionLocal();