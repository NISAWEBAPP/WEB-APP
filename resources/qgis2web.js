var MUNICIPIOS_PY = [{"distrito": "Boquerón (Neuland / Cruce Pioneros)", "depto": "Boquerón", "lat": -22.575, "lon": -59.832}, {"distrito": "Loma Plata", "depto": "Boquerón", "lat": -22.3833, "lon": -59.8333}, {"distrito": "Liberación", "depto": "San Pedro", "lat": -24.189, "lon": -56.485}, {"distrito": "Guayaibí", "depto": "San Pedro", "lat": -24.5333, "lon": -56.4333}, {"distrito": "San Estanislao (Santaní)", "depto": "San Pedro", "lat": -24.65, "lon": -56.4333}, {"distrito": "Gral. Elizardo Aquino", "depto": "San Pedro", "lat": -24.445, "lon": -56.9}, {"distrito": "Benjamín Aceval", "depto": "Presidente Hayes", "lat": -24.96, "lon": -57.5667}, {"distrito": "Luque", "depto": "Central", "lat": -25.24, "lon": -57.48}, {"distrito": "Limpio", "depto": "Central", "lat": -25.17, "lon": -57.485}, {"distrito": "Itá / Guarambaré", "depto": "Central", "lat": -25.49, "lon": -57.41}, {"distrito": "Emboscada", "depto": "Cordillera", "lat": -25.125, "lon": -57.355}, {"distrito": "Nueva Colombia", "depto": "Cordillera", "lat": -25.185, "lon": -57.305}, {"distrito": "Altos / San Bernardino", "depto": "Cordillera", "lat": -25.263, "lon": -57.265}, {"distrito": "Tobatí", "depto": "Cordillera", "lat": -25.283, "lon": -57.087}, {"distrito": "Caacupé / Tobatí", "depto": "Cordillera", "lat": -25.335, "lon": -57.08}, {"distrito": "Eusebio Ayala", "depto": "Cordillera", "lat": -25.381, "lon": -56.961}, {"distrito": "Primero de Marzo", "depto": "Cordillera", "lat": -25.18, "lon": -56.94}, {"distrito": "Isla Pucú", "depto": "Cordillera", "lat": -25.308, "lon": -56.896}, {"distrito": "Caraguatay", "depto": "Cordillera", "lat": -25.255, "lon": -56.84}, {"distrito": "Piribebuy", "depto": "Cordillera", "lat": -25.48, "lon": -57.042}, {"distrito": "Itacurubí de la Cordillera", "depto": "Cordillera", "lat": -25.452, "lon": -56.88}, {"distrito": "Valenzuela", "depto": "Cordillera", "lat": -25.57, "lon": -56.871}, {"distrito": "Santa Elena", "depto": "Cordillera", "lat": -25.415, "lon": -56.785}, {"distrito": "Paraguarí / Escobar", "depto": "Paraguarí", "lat": -25.625, "lon": -57.05}, {"distrito": "La Colmena", "depto": "Paraguarí", "lat": -25.886, "lon": -56.841}, {"distrito": "Quiindy", "depto": "Paraguarí", "lat": -25.99, "lon": -57.245}, {"distrito": "Repatriación / Caaguazú", "depto": "Caaguazú", "lat": -25.52, "lon": -55.995}, {"distrito": "José Domingo Ocampos", "depto": "Caaguazú", "lat": -25.418, "lon": -55.405}, {"distrito": "Juan E. O'Leary", "depto": "Alto Paraná", "lat": -25.412, "lon": -55.36}, {"distrito": "Dr. Juan León Mallorquín", "depto": "Alto Paraná", "lat": -25.435, "lon": -55.2}, {"distrito": "Minga Guazú", "depto": "Alto Paraná", "lat": -25.505, "lon": -54.785}, {"distrito": "Ciudad del Este", "depto": "Alto Paraná", "lat": -25.495, "lon": -54.685}, {"distrito": "Hernandarias", "depto": "Alto Paraná", "lat": -25.43, "lon": -54.665}, {"distrito": "Itakyry", "depto": "Alto Paraná", "lat": -25.05, "lon": -54.98}, {"distrito": "Caazapá", "depto": "Caazapá", "lat": -26.17, "lon": -56.37}, {"distrito": "Encarnación / Cambyretá", "depto": "Itapúa", "lat": -27.28, "lon": -55.83}, {"distrito": "Pilar", "depto": "Ñeembucú", "lat": -26.868, "lon": -58.28}];

function haversineKm(lat1, lon1, lat2, lon2) {
    var R = 6371.0;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.asin(Math.sqrt(a));
}

// Resuelve el Distrito/Ciudad y Departamento exacto a partir de latitud y longitud (EPSG:4326)
function resolveDistrictByLonLat(lon, lat) {
    if (typeof lon !== 'number' || typeof lat !== 'number' || isNaN(lon) || isNaN(lat)) {
        return { distrito: 'Sin especificar', depto: 'Paraguay', label: 'Sin especificar' };
    }
    if (lat >= -25.58 && lat <= -25.45 && lon >= -54.88 && lon <= -54.64) {
        if (lon < -54.725) {
            return { distrito: 'Minga Guazú', depto: 'Alto Paraná', label: 'Minga Guazú (Alto Paraná)' };
        } else {
            return { distrito: 'Ciudad del Este', depto: 'Alto Paraná', label: 'Ciudad del Este (Alto Paraná)' };
        }
    }
    if (lat > -25.45 && lat <= -25.38 && lon >= -54.72 && lon <= -54.60) {
        return { distrito: 'Hernandarias', depto: 'Alto Paraná', label: 'Hernandarias (Alto Paraná)' };
    }
    if (lat >= -25.45 && lat <= -25.39 && lon >= -55.42 && lon <= -55.30) {
        if (lon < -55.385) {
            return { distrito: 'José Domingo Ocampos', depto: 'Caaguazú', label: 'José Domingo Ocampos (Caaguazú)' };
        } else {
            return { distrito: "Juan E. O'Leary", depto: 'Alto Paraná', label: "Juan E. O'Leary (Alto Paraná)" };
        }
    }
    if (lat >= -25.39 && lat <= -25.35 && lon >= -57.04 && lon <= -56.89) {
        return { distrito: 'Eusebio Ayala', depto: 'Cordillera', label: 'Eusebio Ayala (Cordillera)' };
    }

    var best = MUNICIPIOS_PY[0];
    var minDist = Infinity;
    for (var i = 0; i < MUNICIPIOS_PY.length; i++) {
        var m = MUNICIPIOS_PY[i];
        var d = haversineKm(lat, lon, m.lat, m.lon);
        if (d < minDist) {
            minDist = d;
            best = m;
        }
    }
    return {
        distrito: best.distrito,
        depto: best.depto,
        label: best.distrito + ' (' + best.depto + ')'
    };
}

function getFeatureDistrictInfo(feature) {
    if (!feature) return { distrito: 'Sin especificar', depto: '', label: 'Sin especificar' };
    if (feature.get('_cachedDistrictInfo')) {
        return feature.get('_cachedDistrictInfo');
    }
    var explicitDist = feature.get('DISTRITO') || feature.get('Distrito') || feature.get('CIUDAD') || feature.get('Ciudad');
    var explicitDepto = feature.get('DEPARTAMENTO') || feature.get('Departamento') || '';
    if (explicitDist) {
        var infoObj = {
            distrito: String(explicitDist).trim(),
            depto: String(explicitDepto).trim(),
            label: explicitDepto ? (String(explicitDist).trim() + ' (' + String(explicitDepto).trim() + ')') : String(explicitDist).trim()
        };
        feature.set('_cachedDistrictInfo', infoObj, true);
        return infoObj;
    }
    var geom = feature.getGeometry();
    if (!geom) return { distrito: 'Sin especificar', depto: '', label: 'Sin especificar' };
    var center3857 = ol.extent.getCenter(geom.getExtent());
    var lonLat = ol.proj.transform(center3857, 'EPSG:3857', 'EPSG:4326');
    var resolved = resolveDistrictByLonLat(lonLat[0], lonLat[1]);
    feature.set('_cachedDistrictInfo', resolved, true);
    return resolved;
}

// --- 1. UTILIDADES DE PRECIOS, SUPERFICIE Y MEDIDAS DE LOTE ---
var lineOverlays = [];

function removeAllLineLabels() {
    lineOverlays.forEach(function(overlay) {
        map.removeOverlay(overlay);
    });
    lineOverlays = [];
}

function formatSideMeters(meters) {
    var rounded1 = Math.round(meters * 10) / 10;
    if (Math.abs(rounded1 - Math.round(rounded1)) < 0.15) {
        return Math.round(rounded1) + ' m.';
    }
    return rounded1.toString().replace('.', ',') + ' m.';
}

function parseGuaranies(rawVal) {
    if (rawVal == null) return null;
    var digits = String(rawVal).replace(/[^\d]/g, '');
    if (!digits) return null;
    var num = parseInt(digits, 10);
    return (!isNaN(num) && num > 0) ? num : null;
}

function formatGuaranies(num) {
    if (num == null || isNaN(num) || num <= 0) return '-';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' Gs.';
}

function extractFractionCodeFromName(rawName) {
    if (!rawName) return '';
    var str = String(rawName).trim();
    var m = str.match(/^(\d+)/);
    return m ? m[1] : str.split('-')[0].trim();
}

function extractFractionCodeFromLotId(rawId) {
    if (!rawId) return '';
    var str = String(rawId).trim();
    if (str.indexOf('-') === -1) return '';
    return str.split('-')[0].trim();
}

// Obtiene la superficie del lote (o la calcula geométricamente si está vacía en el JSON)
function getOrComputeLotArea(feature) {
    if (!feature) return { text: '-', num: 0 };
    var rawSup = feature.get('Superficie');
    if (rawSup != null) {
        var s = String(rawSup).trim();
        if (s !== '' && s.toLowerCase().indexOf('no encontrado') === -1 && s !== '-') {
            var numParsed = parseFloat(s.replace(/\./g, '').replace(',', '.'));
            var hasUnit = s.indexOf('m') !== -1;
            return {
                text: hasUnit ? s : (s + ' m²'),
                num: isNaN(numParsed) ? 0 : numParsed
            };
        }
    }
    var geom = feature.getGeometry();
    if (geom) {
        var area = Math.abs(ol.sphere.getArea(geom));
        if (area > 1) {
            var rounded = Math.round(area);
            return {
                text: '~' + rounded + ' m²',
                num: rounded
            };
        }
    }
    return { text: 'Consultar', num: 0 };
}

// Calcula las medidas de los lados de un lote sin necesidad de dibujarlas en el mapa
function getLotSideDimensionsArray(feature) {
    var list = [];
    if (!feature || !feature.getGeometry()) return list;
    var geometry = feature.getGeometry();
    if (geometry.getType() !== 'MultiPolygon' && geometry.getType() !== 'Polygon') return list;

    var coords_proj = (geometry.getType() === 'Polygon')
        ? geometry.getCoordinates()[0]
        : geometry.getCoordinates()[0][0];

    for (var i = 0; i < coords_proj.length - 1; i++) {
        var p1_latlon = ol.proj.transform(coords_proj[i], 'EPSG:3857', 'EPSG:4326');
        var p2_latlon = ol.proj.transform(coords_proj[i + 1], 'EPSG:3857', 'EPSG:4326');
        var length = ol.sphere.getDistance(p1_latlon, p2_latlon);
        if (length < 0.8) continue;
        list.push(formatSideMeters(length));
    }
    return list;
}

// --- 2. INICIALIZACIÓN DEL MAPA ---
var map = new ol.Map({
    target: 'map',
    renderer: 'canvas',
    layers: layersList,
    view: new ol.View({
        maxZoom: 28,
        minZoom: 1
    })
});

var INITIAL_EXTENT = [-7017360.025642, -3188021.947301, -5569444.168542, -2503764.937414];
map.getView().fit(INITIAL_EXTENT, map.getSize());
map.getView().setProperties({constrainResolution: false});

var hasTouchScreen = map.getViewport().classList.contains('ol-touch');
var isSmallScreen = window.innerWidth < 768;

var btnResetView = document.getElementById('btn-reset-view');
if (btnResetView) {
    btnResetView.addEventListener('click', function() {
        setActiveDistrictFilter('ALL', false);
        hideActiveFractionBanner();
        map.getView().animate({
            center: ol.extent.getCenter(INITIAL_EXTENT),
            zoom: 8,
            duration: 600
        });
    });
}

// --- 3. CONTENEDORES DE CONTROLES ---
var topLeftContainer = new ol.control.Control({
    element: (function() {
        var el = document.createElement('div');
        el.id = 'top-left-container';
        return el;
    })()
});
map.addControl(topLeftContainer);

var bottomLeftContainer = new ol.control.Control({
    element: (function() {
        var el = document.createElement('div');
        el.id = 'bottom-left-container';
        return el;
    })()
});
map.addControl(bottomLeftContainer);

var topRightContainer = new ol.control.Control({
    element: (function() {
        var el = document.createElement('div');
        el.id = 'top-right-container';
        return el;
    })()
});
map.addControl(topRightContainer);

var bottomRightContainer = new ol.control.Control({
    element: (function() {
        var el = document.createElement('div');
        el.id = 'bottom-right-container';
        return el;
    })()
});
map.addControl(bottomRightContainer);

// --- 4. POPUP ACOPLADO / BOTTOM SHEET Y RESALTADO DE LOTE SELECCIONADO ---
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var dragHandle = document.getElementById('sheet-drag-handle');
var sketch;

var minimizeBtn = document.createElement('button');
minimizeBtn.type = 'button';
minimizeBtn.className = 'sheet-minimize-btn';
minimizeBtn.title = 'Minimizar / Expandir ficha';
minimizeBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>';
if (container) {
    container.insertBefore(minimizeBtn, closer);
}

function toggleMinimizeSheet(e) {
    if (e) e.stopPropagation();
    if (!container) return;
    var isMin = container.classList.toggle('sheet-minimized');
    minimizeBtn.innerHTML = isMin
        ? '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="18 15 12 9 6 15"></polyline></svg>'
        : '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>';
}

minimizeBtn.addEventListener('click', toggleMinimizeSheet);
if (dragHandle) {
    dragHandle.addEventListener('click', toggleMinimizeSheet);
}

var selectedFeatureCollection = new ol.Collection();
var selectedFeatureOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: selectedFeatureCollection,
        useSpatialIndex: false
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#FBBF24',
            width: 3.5
        }),
        fill: new ol.style.Fill({
            color: 'rgba(251, 191, 36, 0.22)'
        })
    }),
    updateWhileAnimating: true,
    updateWhileInteracting: true
});

function stopMediaInPopup() {
    var mediaElements = container.querySelectorAll('audio, video');
    mediaElements.forEach(function(media) {
        media.pause();
        media.currentTime = 0;
    });
}

function closePopupSheet() {
    container.style.display = 'none';
    container.classList.remove('sheet-minimized');
    document.body.classList.remove('lot-sheet-open');
    if (closer) closer.blur();
    stopMediaInPopup();
    removeAllLineLabels();
    selectedFeatureCollection.clear();
}

closer.onclick = function() {
    closePopupSheet();
    return false;
};

var overlayPopup = new ol.Overlay({
    element: container,
    autoPan: false
});
map.addOverlay(overlayPopup);

function syncDockedSheetWrapper() {
    var wrapper = container.parentElement;
    if (!wrapper) return;
    wrapper.classList.add('docked-sheet-wrapper');
}
window.addEventListener('resize', syncDockedSheetWrapper);
setTimeout(syncDockedSheetWrapper, 50);

var NO_POPUP = 0;
var ALL_FIELDS = 1;

function getPopupFields(layerList, layer) {
    var idx = layersList.indexOf(layer) - (layersList.length - popupLayers.length);
    return popupLayers[idx];
}

var collection = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: collection,
        useSpatialIndex: false
    }),
    style: [new ol.style.Style({
        stroke: new ol.style.Stroke({ color: '#f00', width: 1 }),
        fill: new ol.style.Fill({ color: 'rgba(255,0,0,0.1)' })
    })],
    updateWhileAnimating: true,
    updateWhileInteracting: true
});

var doHighlight = false;
var doHover = false;
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});

// --- 5. MOTOR DE ESTADÍSTICAS POR FRACCIÓN (LOTES LIBRES + PRECIO MÁS BARATO) ---
function getStatusBadgeInfo(rawStatus) {
    var statusText = (rawStatus || 'Sin estado').toString().trim();
    var upper = statusText.toUpperCase();
    if (upper.indexOf('DISPON') !== -1 || upper.indexOf('LIBRE') !== -1) {
        return { label: statusText, cssClass: 'status-disponible', category: 'DISPONIBLE' };
    } else if (upper.indexOf('VEND') !== -1 || upper.indexOf('OCUP') !== -1 || upper.indexOf('CANCEL') !== -1 || upper.indexOf('ESCRIT') !== -1) {
        return { label: statusText, cssClass: 'status-vendido', category: 'VENDIDO' };
    } else if (upper.indexOf('RESERV') !== -1 || upper.indexOf('SEÑA') !== -1 || upper.indexOf('BLOQUE') !== -1) {
        return { label: statusText, cssClass: 'status-reservado', category: 'RESERVADO' };
    }
    return { label: statusText, cssClass: 'status-otro', category: statusText };
}

var cachedFractionStatsByCode = null;

function getFractionStatsMap() {
    if (cachedFractionStatsByCode) return cachedFractionStatsByCode;
    var statsMap = {};
    if (typeof jsonSource_Combinado_3 === 'undefined') return statsMap;

    var allLots = jsonSource_Combinado_3.getFeatures();
    for (var i = 0; i < allLots.length; i++) {
        var lotFeat = allLots[i];
        var rawId = lotFeat.get('ID');
        var fCode = extractFractionCodeFromLotId(rawId);
        if (!fCode) continue;

        if (!statsMap[fCode]) {
            statsMap[fCode] = {
                code: fCode,
                totalCount: 0,
                libresCount: 0,
                minCuotaNum: null,
                minCuotaStr: null,
                minContadoNum: null,
                minContadoStr: null,
                minTotalNum: null,
                minTotalStr: null,
                freeLots: []
            };
        }

        var st = statsMap[fCode];
        var rawEstado = lotFeat.get('Estado');
        var estUpper = (rawEstado || '').toString().toUpperCase();
        if (estUpper.indexOf('PLAZA') !== -1 || estUpper.indexOf('EDIFICIO') !== -1) {
            continue;
        }
        st.totalCount++;

        var badgeInfo = getStatusBadgeInfo(rawEstado);
        if (badgeInfo.category === 'DISPONIBLE') {
            st.libresCount++;
            var cuotaNum = parseGuaranies(lotFeat.get('Cuota'));
            var contadoNum = parseGuaranies(lotFeat.get('Contado'));
            var totalNum = parseGuaranies(lotFeat.get('Total'));

            // Filtramos valores simbólicos de prueba (< 50.000 Gs. en cuota o < 1.000.000 Gs. en contado)
            if (cuotaNum && cuotaNum >= 50000) {
                if (st.minCuotaNum === null || cuotaNum < st.minCuotaNum) {
                    st.minCuotaNum = cuotaNum;
                    st.minCuotaStr = formatGuaranies(cuotaNum);
                }
            }
            if (contadoNum && contadoNum >= 1000000) {
                if (st.minContadoNum === null || contadoNum < st.minContadoNum) {
                    st.minContadoNum = contadoNum;
                    st.minContadoStr = formatGuaranies(contadoNum);
                }
            }
            if (totalNum && totalNum >= 1000000) {
                if (st.minTotalNum === null || totalNum < st.minTotalNum) {
                    st.minTotalNum = totalNum;
                    st.minTotalStr = formatGuaranies(totalNum);
                }
            }

            st.freeLots.push(lotFeat);
        }
    }

    cachedFractionStatsByCode = statsMap;
    return statsMap;
}

function getStatsForFractionCode(fCode) {
    var mapStats = getFractionStatsMap();
    return mapStats[String(fCode || '').trim()] || {
        code: String(fCode || '').trim(),
        totalCount: 0,
        libresCount: 0,
        minCuotaNum: null,
        minCuotaStr: null,
        minContadoNum: null,
        minContadoStr: null,
        minTotalNum: null,
        minTotalStr: null,
        freeLots: []
    };
}

// --- 6. GENERADOR DE FICHA MODERNA DE LOTE (GOOGLE MAPS + WHATSAPP + VER LIBRES) ---
function getFeatureCenterLatLon(feature) {
    var geom = feature.getGeometry();
    if (!geom) return null;
    var center3857;
    if (geom.getType() === 'Polygon' && geom.getInteriorPoint) {
        center3857 = geom.getInteriorPoint().getCoordinates();
    } else if (geom.getType() === 'MultiPolygon' && geom.getInteriorPoints) {
        var pts = geom.getInteriorPoints().getCoordinates();
        center3857 = pts && pts.length ? pts[0] : ol.extent.getCenter(geom.getExtent());
    } else {
        center3857 = ol.extent.getCenter(geom.getExtent());
    }
    var lonLat = ol.proj.transform(center3857, 'EPSG:3857', 'EPSG:4326');
    return {
        lon: lonLat[0],
        lat: lonLat[1],
        latStr: lonLat[1].toFixed(6),
        lonStr: lonLat[0].toFixed(6)
    };
}

function findFractionNameAtCoord(coord3857, fallbackCode) {
    if (typeof jsonSource_FRACCION_0 !== 'undefined') {
        var fractions = jsonSource_FRACCION_0.getFeaturesAtCoordinate(coord3857);
        if (fractions && fractions.length > 0) {
            return fractions[0].get('FRACCIONES_Código - Nombre de Fracción') || '';
        }
        if (fallbackCode) {
            var allFracs = jsonSource_FRACCION_0.getFeatures();
            for (var i = 0; i < allFracs.length; i++) {
                var fname = (allFracs[i].get('FRACCIONES_Código - Nombre de Fracción') || '').toString().trim();
                if (extractFractionCodeFromName(fname) === String(fallbackCode)) {
                    return fname;
                }
            }
        }
    }
    return fallbackCode ? ('Fracción ' + fallbackCode) : '';
}

function buildWhatsAppUrlForLot(feature, fractionName, sideDimensions) {
    var idVal = feature.get('ID') != null ? String(feature.get('ID')).trim() : '-';
    var manzanaVal = feature.get('Manzana') != null ? String(feature.get('Manzana')).trim() : '-';
    var loteVal = feature.get('Lote') != null ? String(feature.get('Lote')).trim() : '-';
    var areaObj = getOrComputeLotArea(feature);
    var estadoVal = feature.get('Estado') != null ? String(feature.get('Estado')).trim() : 'Consultar';
    var cuotaVal = feature.get('Cuota') != null ? String(feature.get('Cuota')).trim() : '';
    var contadoVal = feature.get('Contado') != null ? String(feature.get('Contado')).trim() : '';
    var totalVal = feature.get('Total') != null ? String(feature.get('Total')).trim() : '';
    var descVal = feature.get('Descuento') != null ? String(feature.get('Descuento')).trim() : '';

    var statusInfo = getStatusBadgeInfo(estadoVal);
    var centerCoords = getFeatureCenterLatLon(feature);
    var distInfo = getFeatureDistrictInfo(feature);
    var dims = sideDimensions || getLotSideDimensionsArray(feature);

    var waLines = [
        'Hola, me interesa consultar por este lote:',
        fractionName ? ('*Fracción:* ' + fractionName) : ('*Código ID:* ' + idVal),
        '*Distrito / Ciudad:* ' + distInfo.label,
        '*Manzana:* ' + manzanaVal + ' | *Lote:* ' + loteVal,
        '*Superficie:* ' + areaObj.text
    ];
    if (dims && dims.length > 0) {
        waLines.push('*Dimensiones:* ' + dims.join(' x '));
    }
    waLines.push('*Estado:* ' + statusInfo.label);
    if (cuotaVal && cuotaVal !== '0' && cuotaVal !== '0 Gs.' && cuotaVal !== '-') waLines.push('*Cuota:* ' + cuotaVal);
    if (contadoVal && contadoVal !== '0' && contadoVal !== '0 Gs.' && contadoVal !== '0Gs.' && contadoVal !== '-') {
        waLines.push('*Contado:* ' + contadoVal + (descVal && descVal !== '0%' ? ' (Desc. ' + descVal + ')' : ''));
    }
    if (totalVal && totalVal !== '0' && totalVal !== '0 Gs.' && totalVal !== '0Gs.' && totalVal !== '-') waLines.push('*Total:* ' + totalVal);
    if (centerCoords) {
        waLines.push('*Ubicación Google Maps:* https://www.google.com/maps?q=' + centerCoords.latStr + ',' + centerCoords.lonStr);
    }

    return 'https://api.whatsapp.com/send?text=' + encodeURIComponent(waLines.join('\n'));
}

function buildModernLotCard(feature, layer, sideDimensions) {
    var idVal = feature.get('ID') != null ? String(feature.get('ID')).trim() : '-';
    var fCode = extractFractionCodeFromLotId(idVal);
    var manzanaVal = feature.get('Manzana') != null ? String(feature.get('Manzana')).trim() : '-';
    var loteVal = feature.get('Lote') != null ? String(feature.get('Lote')).trim() : '-';
    var areaObj = getOrComputeLotArea(feature);
    var estadoVal = feature.get('Estado') != null ? String(feature.get('Estado')).trim() : 'Consultar';
    var cuotaVal = feature.get('Cuota') != null ? String(feature.get('Cuota')).trim() : '';
    var contadoVal = feature.get('Contado') != null ? String(feature.get('Contado')).trim() : '';
    var totalVal = feature.get('Total') != null ? String(feature.get('Total')).trim() : '';
    var descVal = feature.get('Descuento') != null ? String(feature.get('Descuento')).trim() : '';

    var statusInfo = getStatusBadgeInfo(estadoVal);
    var centerCoords = getFeatureCenterLatLon(feature);
    var extentCenter = ol.extent.getCenter(feature.getGeometry().getExtent());
    var fractionName = findFractionNameAtCoord(extentCenter, fCode);
    var distInfo = getFeatureDistrictInfo(feature);
    var fracStats = getStatsForFractionCode(fCode);

    var mapsUrl = '#';
    if (centerCoords) {
        mapsUrl = 'https://www.google.com/maps/dir/?api=1&destination=' + centerCoords.latStr + ',' + centerCoords.lonStr;
    }

    var dimsHtml = '';
    if (sideDimensions && sideDimensions.length > 0) {
        var chips = sideDimensions.map(function(d) {
            return '<span class="lot-dim-chip">' + d + '</span>';
        }).join('');
        dimsHtml = '<div class="lot-dimensions-summary">' +
            '<strong>Medidas (' + sideDimensions.length + ' lados):</strong>' +
            '<div class="lot-dimensions-chips">' + chips + '</div>' +
        '</div>';
    }

    var whatsappUrl = buildWhatsAppUrlForLot(feature, fractionName, sideDimensions);

    var pricingHtml = '';
    var hasCuota = cuotaVal && cuotaVal !== '-' && cuotaVal !== '0 Gs.' && cuotaVal !== '0';
    var hasContado = contadoVal && contadoVal !== '-' && contadoVal !== '0 Gs.' && contadoVal !== '0Gs.' && contadoVal !== '0';
    var hasTotal = totalVal && totalVal !== '-' && totalVal !== '0 Gs.' && totalVal !== '0Gs.' && totalVal !== '0';

    if (hasCuota || hasContado || hasTotal) {
        pricingHtml += '<div class="lot-pricing-list">';
        if (hasCuota) {
            pricingHtml += '<div class="lot-price-row"><span class="lot-price-label">Cuota Mensual</span><span class="lot-price-value">' + cuotaVal + '</span></div>';
        }
        if (hasContado) {
            var descBadge = (descVal && descVal !== '0%' && descVal !== '') ? ' <small style="color:#166534;font-weight:700;">(-' + descVal + ')</small>' : '';
            pricingHtml += '<div class="lot-price-row"><span class="lot-price-label">Precio Contado' + descBadge + '</span><span class="lot-price-value">' + contadoVal + '</span></div>';
        }
        if (hasTotal) {
            pricingHtml += '<div class="lot-price-row"><span class="lot-price-label">Precio Total</span><span class="lot-price-value">' + totalVal + '</span></div>';
        }
        pricingHtml += '</div>';
    }

    var svgDirections = '<svg viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>';
    var svgWhatsapp = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.97 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z"/></svg>';
    var svgList = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="7" y1="8" x2="17" y2="8"></line><line x1="7" y1="12" x2="17" y2="12"></line><line x1="7" y1="16" x2="13" y2="16"></line></svg>';

    var allFreeBtnHtml = '';
    if (fCode && fracStats.libresCount > 0) {
        allFreeBtnHtml = '<button type="button" class="lot-btn lot-btn-all-free" onclick="window.openFreeLotsModalForCode(\'' + fCode.replace(/'/g, '') + '\')">' +
            svgList + '<span>Ver los ' + fracStats.libresCount + ' lotes libres de esta fracción</span>' +
        '</button>';
    }

    var html = '<div class="lot-card">' +
        '<div class="lot-card-header" onclick="toggleMinimizeSheet(event)">' +
            '<div>' +
                '<h3 class="lot-card-title">Manzana ' + manzanaVal + ' &bull; Lote ' + loteVal + '</h3>' +
                '<p class="lot-card-subtitle">' + (fractionName ? fractionName + ' &middot; ' : '') + 'ID: ' + idVal + '</p>' +
                '<p class="lot-card-subtitle" style="color:#2E5A27;font-weight:600;margin-top:2px;">&#128205; ' + distInfo.label + '</p>' +
            '</div>' +
            '<span class="lot-status-badge ' + statusInfo.cssClass + '">' + statusInfo.label + '</span>' +
        '</div>' +
        '<div class="lot-card-body">' +
            '<div class="lot-metrics-grid">' +
                '<div class="lot-metric-box">' +
                    '<span class="lot-metric-label">Manzana</span>' +
                    '<span class="lot-metric-value">' + manzanaVal + '</span>' +
                '</div>' +
                '<div class="lot-metric-box">' +
                    '<span class="lot-metric-label">Lote</span>' +
                    '<span class="lot-metric-value">' + loteVal + '</span>' +
                '</div>' +
                '<div class="lot-metric-box">' +
                    '<span class="lot-metric-label">Superficie</span>' +
                    '<span class="lot-metric-value">' + areaObj.text + '</span>' +
                '</div>' +
            '</div>' +
            dimsHtml +
            pricingHtml +
            '<div class="lot-actions">' +
                '<a href="' + mapsUrl + '" target="_blank" rel="noopener noreferrer" class="lot-btn lot-btn-maps">' +
                    svgDirections + '<span>Cómo llegar</span>' +
                '</a>' +
                '<a href="' + whatsappUrl + '" target="_blank" rel="noopener noreferrer" class="lot-btn lot-btn-whatsapp">' +
                    svgWhatsapp + '<span>Consultar</span>' +
                '</a>' +
                allFreeBtnHtml +
            '</div>' +
        '</div>' +
    '</div>';

    return html;
}

function createPopupField(currentFeature, currentFeatureKeys, layer) {
    var popupText = '';
    for (var i = 0; i < currentFeatureKeys.length; i++) {
        var key = currentFeatureKeys[i];
        if (key !== 'geometry' && key !== 'layerObject' && key !== 'idO' && key !== '_cachedDistrictInfo') {
            var popupField = '';
            var labelType = layer.get('fieldLabels')[key];
            if (labelType === 'hidden field') continue;
            if (labelType === 'inline label - visible with data' && currentFeature.get(key) == null) continue;

            if (labelType === 'inline label - always visible' || labelType === 'inline label - visible with data') {
                popupField += '<th>' + layer.get('fieldAliases')[key] + '</th><td>';
            } else {
                popupField += '<td colspan="2">';
            }
            if (labelType === 'header label - visible with data' && currentFeature.get(key) == null) continue;
            if (labelType === 'header label - always visible' || labelType === 'header label - visible with data') {
                popupField += '<strong>' + layer.get('fieldAliases')[key] + '</strong><br />';
            }
            if (layer.get('fieldImages')[key] !== 'ExternalResource') {
                popupField += (currentFeature.get(key) != null ? autolinker.link(currentFeature.get(key).toLocaleString()) + '</td>' : '');
            } else {
                var fieldValue = currentFeature.get(key);
                if (/\.(gif|jpg|jpeg|tif|tiff|png|avif|webp|svg)$/i.test(fieldValue)) {
                    popupField += (fieldValue != null ? '<img src="images/' + fieldValue.replace(/[\\\/:]/g, '_').trim() + '" /></td>' : '');
                } else {
                    popupField += (fieldValue != null ? autolinker.link(fieldValue.toLocaleString()) + '</td>' : '');
                }
            }
            popupText += '<tr>' + popupField + '</tr>';
        }
    }
    return popupText;
}

// --- 7. FILTROS DE DISPONIBILIDAD DE LOTES Y DE DISTRITO / CIUDAD ---
var activeLotFilter = 'ALL';
var activeDistrictFilter = 'ALL';

function doesFeatureMatchDistrictFilter(feature) {
    if (activeDistrictFilter === 'ALL') return true;
    var info = getFeatureDistrictInfo(feature);
    if (activeDistrictFilter.indexOf('DEPTO:') === 0) {
        var targetDepto = activeDistrictFilter.substring(6);
        return info.depto === targetDepto;
    }
    if (activeDistrictFilter.indexOf('DIST:') === 0) {
        var targetLabel = activeDistrictFilter.substring(5);
        return info.label === targetLabel;
    }
    return info.label === activeDistrictFilter || info.distrito === activeDistrictFilter;
}

function isFeatureVisibleByFilter(feature) {
    if (!doesFeatureMatchDistrictFilter(feature)) return false;
    if (activeLotFilter === 'ALL') return true;
    var rawStatus = feature.get('Estado');
    var info = getStatusBadgeInfo(rawStatus);
    return info.category === activeLotFilter;
}

if (typeof lyr_Combinado_3 !== 'undefined') {
    var baseCombinadoStyle = lyr_Combinado_3.getStyle();
    lyr_Combinado_3.setStyle(function(feature, resolution) {
        if (!isFeatureVisibleByFilter(feature)) {
            return null;
        }
        return typeof baseCombinadoStyle === 'function'
            ? baseCombinadoStyle(feature, resolution)
            : baseCombinadoStyle;
    });
}

if (typeof lyr_FRACCION_0 !== 'undefined') {
    var baseFraccion0Style = lyr_FRACCION_0.getStyle();
    lyr_FRACCION_0.setStyle(function(feature, resolution) {
        if (!doesFeatureMatchDistrictFilter(feature)) return null;
        return typeof baseFraccion0Style === 'function'
            ? baseFraccion0Style(feature, resolution)
            : baseFraccion0Style;
    });
}

if (typeof lyr_NOMBREFRACCION_6 !== 'undefined') {
    var baseNombreFracStyle = lyr_NOMBREFRACCION_6.getStyle();
    lyr_NOMBREFRACCION_6.setStyle(function(feature, resolution) {
        if (!doesFeatureMatchDistrictFilter(feature)) return null;
        return typeof baseNombreFracStyle === 'function'
            ? baseNombreFracStyle(feature, resolution)
            : baseNombreFracStyle;
    });
}

function getShortDistrictFilterLabel() {
    if (activeDistrictFilter === 'ALL') return 'Distrito / Ciudad';
    if (activeDistrictFilter.indexOf('DEPTO:') === 0) return 'Dpto: ' + activeDistrictFilter.substring(6);
    if (activeDistrictFilter.indexOf('DIST:') === 0) {
        var full = activeDistrictFilter.substring(5);
        return full.split(' (')[0];
    }
    return activeDistrictFilter;
}

function renderQuickFilterPills() {
    var bar = document.getElementById('quick-filters-bar');
    if (!bar || typeof jsonSource_Combinado_3 === 'undefined') return;

    var features = jsonSource_Combinado_3.getFeatures();
    var counts = { ALL: 0, DISPONIBLE: 0, VENDIDO: 0, RESERVADO: 0 };

    features.forEach(function(f) {
        if (!doesFeatureMatchDistrictFilter(f)) return;
        counts.ALL++;
        var cat = getStatusBadgeInfo(f.get('Estado')).category;
        if (counts[cat] !== undefined) {
            counts[cat]++;
        } else {
            counts[cat] = 1;
        }
    });

    bar.innerHTML = '';

    var distBtn = document.createElement('button');
    distBtn.type = 'button';
    distBtn.className = 'filter-pill filter-pill-district' + (activeDistrictFilter !== 'ALL' ? ' has-active-district' : '');
    distBtn.innerHTML = '<span>&#128205; ' + getShortDistrictFilterLabel() + ' &#9662;</span>';
    distBtn.addEventListener('click', function() {
        var drawer = document.getElementById('fraction-drawer');
        if (drawer) {
            drawer.classList.remove('hidden');
            if (typeof window.refreshFractionDrawerUI === 'function') {
                window.refreshFractionDrawerUI();
            }
            var sel = document.getElementById('district-select');
            if (sel) sel.focus();
        }
    });
    bar.appendChild(distBtn);

    var pillsConfig = [
        { key: 'ALL', label: 'Todos', color: '#2E5A27', count: counts.ALL },
        { key: 'DISPONIBLE', label: 'Libres', color: '#16A34A', count: counts.DISPONIBLE },
        { key: 'RESERVADO', label: 'Reservados', color: '#D97706', count: counts.RESERVADO },
        { key: 'VENDIDO', label: 'Vendidos', color: '#DC2626', count: counts.VENDIDO }
    ];

    pillsConfig.forEach(function(item) {
        if (item.key !== 'ALL' && item.count === 0) return;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'filter-pill' + (activeLotFilter === item.key ? ' active' : '');
        btn.innerHTML = '<span class="dot" style="background:' + item.color + '"></span>' +
                        '<span>' + item.label + '</span>' +
                        '<span class="count">' + item.count + '</span>';
        btn.addEventListener('click', function() {
            activeLotFilter = item.key;
            renderQuickFilterPills();
            if (typeof lyr_Combinado_3 !== 'undefined') {
                lyr_Combinado_3.changed();
            }
            closePopupSheet();
        });
        bar.appendChild(btn);
    });
}

function refreshAllFilteredLayers() {
    if (typeof lyr_FRACCION_0 !== 'undefined') lyr_FRACCION_0.changed();
    if (typeof lyr_NOMBREFRACCION_6 !== 'undefined') lyr_NOMBREFRACCION_6.changed();
    if (typeof lyr_Combinado_3 !== 'undefined') lyr_Combinado_3.changed();
    renderQuickFilterPills();
}

if (typeof jsonSource_Combinado_3 !== 'undefined') {
    renderQuickFilterPills();
    jsonSource_Combinado_3.on('change', function() {
        cachedFractionStatsByCode = null;
        renderQuickFilterPills();
        if (typeof window.refreshFractionDrawerUI === 'function') {
            window.refreshFractionDrawerUI();
        }
    });
}

// --- 8. EVENTO CLICK EN LOTES, COTAS DESPLAZADAS Y ENCUADRE INTELIGENTE ---
var popupContent = '';
var popupCoord = null;
var featuresPopupActive = false;

function updatePopup() {
    syncDockedSheetWrapper();
    if (popupContent) {
        content.innerHTML = popupContent;
        container.classList.remove('sheet-minimized');
        document.body.classList.add('lot-sheet-open');
        minimizeBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>';
        container.style.display = 'block';
        overlayPopup.setPosition(popupCoord);
    } else {
        closePopupSheet();
    }
}

// Actualiza en tiempo real el ángulo de cada etiqueta de dimensión en pantalla
// compensando cualquier rotación del mapa (gesto con dos dedos en móvil o brújula)
function updateAllLineLabelRotations() {
    if (!lineOverlays || lineOverlays.length === 0) return;
    var viewRotation = map.getView().getRotation() || 0;

    for (var i = 0; i < lineOverlays.length; i++) {
        var item = lineOverlays[i];
        var el = item.getElement();
        if (!el) continue;

        var p1 = item.get('p1_proj');
        var p2 = item.get('p2_proj');
        if (!p1 || !p2) continue;

        var rotationRad = 0;
        var px1 = map.getPixelFromCoordinate(p1);
        var px2 = map.getPixelFromCoordinate(p2);

        if (px1 && px2) {
            var sdx = px2[0] - px1[0];
            var sdy = px2[1] - px1[1];
            rotationRad = Math.atan2(sdy, sdx);
        } else {
            var dx = p2[0] - p1[0];
            var dy = p2[1] - p1[1];
            rotationRad = -Math.atan2(dy, dx) + viewRotation;
        }

        // Mantener siempre el texto derecho (nunca de cabeza) entre -90° y +90°
        while (rotationRad > Math.PI / 2) rotationRad -= Math.PI;
        while (rotationRad < -Math.PI / 2) rotationRad += Math.PI;

        el.style.transform = 'rotate(' + rotationRad.toFixed(4) + 'rad)';
    }
}

map.on('postrender', updateAllLineLabelRotations);
map.getView().on('change:rotation', updateAllLineLabelRotations);

function drawLotDimensionLabels(feature) {
    var dimensionsList = [];
    if (!feature || !feature.getGeometry()) return dimensionsList;
    var geometry = feature.getGeometry();
    if (geometry.getType() !== 'MultiPolygon' && geometry.getType() !== 'Polygon') return dimensionsList;

    var coords_proj = (geometry.getType() === 'Polygon')
        ? geometry.getCoordinates()[0]
        : geometry.getCoordinates()[0][0];

    var polyCenter = ol.extent.getCenter(geometry.getExtent());

    for (var i = 0; i < coords_proj.length - 1; i++) {
        var p1_proj = coords_proj[i];
        var p2_proj = coords_proj[i + 1];

        var p1_latlon = ol.proj.transform(p1_proj, 'EPSG:3857', 'EPSG:4326');
        var p2_latlon = ol.proj.transform(p2_proj, 'EPSG:3857', 'EPSG:4326');
        var length = ol.sphere.getDistance(p1_latlon, p2_latlon);

        if (length < 0.8) continue;
        var lengthLabel = formatSideMeters(length);
        dimensionsList.push(lengthLabel);

        var midpoint_proj = [(p1_proj[0] + p2_proj[0]) / 2, (p1_proj[1] + p2_proj[1]) / 2];
        var dx = p2_proj[0] - p1_proj[0];
        var dy = p2_proj[1] - p1_proj[1];
        var segLenProj = Math.sqrt(dx * dx + dy * dy) || 1;

        var nx = -dy / segLenProj;
        var ny = dx / segLenProj;
        var toMidX = midpoint_proj[0] - polyCenter[0];
        var toMidY = midpoint_proj[1] - polyCenter[1];
        if (nx * toMidX + ny * toMidY < 0) {
            nx = -nx;
            ny = -ny;
        }

        // Desplazamiento exterior limpio respecto al borde del lote
        var labelPos = [midpoint_proj[0] + nx * 1.8, midpoint_proj[1] + ny * 1.8];

        var el = document.createElement('div');
        el.innerHTML = lengthLabel;
        el.className = 'line-label-overlay';

        var lineLabelOverlay = new ol.Overlay({
            position: labelPos,
            element: el,
            positioning: 'center-center',
            stopEvent: false
        });

        // Guardamos los vértices del segmento para recalcular el ángulo real en pantalla al rotar el plano
        lineLabelOverlay.set('p1_proj', p1_proj, true);
        lineLabelOverlay.set('p2_proj', p2_proj, true);

        map.addOverlay(lineLabelOverlay);
        lineOverlays.push(lineLabelOverlay);
    }

    updateAllLineLabelRotations();
    return dimensionsList;
}

function focusSelectedLotInClearArea(feature) {
    if (!feature || !feature.getGeometry()) return;
    var extent = feature.getGeometry().getExtent();
    var isMobile = window.innerWidth <= 768;

    var padding = isMobile
        ? [130, 50, Math.round(window.innerHeight * 0.46) + 30, 50]
        : [130, 80, 80, 410];

    var currentZoom = map.getView().getZoom() || 18;
    var targetMaxZoom = Math.max(currentZoom, 19);

    map.getView().fit(extent, {
        padding: padding,
        maxZoom: targetMaxZoom,
        duration: 450
    });
}

// Función global para seleccionar, resaltar y enfocar cualquier lote (por ejemplo, desde el listado de lotes libres)
function selectAndFocusLotFeature(lotFeature) {
    if (!lotFeature) return;
    removeAllLineLabels();
    selectedFeatureCollection.clear();
    var sideDimensions = drawLotDimensionLabels(lotFeature);
    selectedFeatureCollection.push(lotFeature);
    popupContent = buildModernLotCard(lotFeature, lyr_Combinado_3, sideDimensions);
    popupCoord = ol.extent.getCenter(lotFeature.getGeometry().getExtent());
    updatePopup();
    focusSelectedLotInClearArea(lotFeature);
}
window.selectAndFocusLotFeature = selectAndFocusLotFeature;

function onSingleClickFeatures(evt) {
    if (doHover || sketch) return;

    removeAllLineLabels();
    selectedFeatureCollection.clear();

    if (!featuresPopupActive) {
        featuresPopupActive = true;
    }

    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var selectedLotFeature = null;
    var selectedLotLayer = null;
    var clickedFractionFeature = null;
    var fallbackPopupHtml = '<ul>';

    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (!layer || !(feature instanceof ol.Feature)) return;
        if (layer.get('interactive') === false) return;

        var layerTitle = layer.get('popuplayertitle') || '';
        if (layerTitle === 'COMBINADO' || layerTitle === 'Combinado') {
            if (!isFeatureVisibleByFilter(feature)) return;
            if (!selectedLotFeature) {
                selectedLotFeature = feature;
                selectedLotLayer = layer;
            }
            return;
        }

        if (layerTitle === 'FRACCION' || layerTitle === 'NOMBRE FRACCION') {
            if (!clickedFractionFeature) {
                clickedFractionFeature = feature;
            }
        }

        var doPopup = false;
        for (var k in layer.get('fieldImages')) {
            if (layer.get('fieldImages')[k] !== 'Hidden') {
                doPopup = true;
            }
        }
        if (doPopup) {
            var clusteredFeatures = feature.get('features');
            if (typeof clusteredFeatures !== 'undefined') {
                for (var n = 0; n < clusteredFeatures.length; n++) {
                    var cf = clusteredFeatures[n];
                    var keys = cf.getKeys();
                    var rows = createPopupField(cf, keys, layer);
                    if (rows) {
                        fallbackPopupHtml += '<li><table><a><b>' + layerTitle + '</b></a>' + rows + '</table></li>';
                    }
                }
            } else {
                var keys = feature.getKeys();
                var rows = createPopupField(feature, keys, layer);
                if (rows) {
                    fallbackPopupHtml += '<li><table><a><b>' + layerTitle + '</b></a>' + rows + '</table></li>';
                }
            }
        }
    });

    if (selectedLotFeature) {
        selectAndFocusLotFeature(selectedLotFeature);
        return;
    }

    // Si tocó el polígono de una Fracción (sin tocar un lote específico), activamos su banner de lotes libres
    if (clickedFractionFeature) {
        var fracName = clickedFractionFeature.get('FRACCIONES_Código - Nombre de Fracción') || clickedFractionFeature.get('NAME') || '';
        var fCode = extractFractionCodeFromName(fracName);
        if (fCode) {
            showActiveFractionBannerByCode(fCode, fracName);
        }
    }

    if (fallbackPopupHtml === '<ul>') {
        popupContent = '';
    } else {
        popupContent = fallbackPopupHtml + '</ul>';
    }
    popupCoord = coord;
    updatePopup();
}

map.on('singleclick', onSingleClickFeatures);

// --- 9. GEOLOCALIZACIÓN UNIFICADA EN TIEMPO REAL ---
var topLeftContainerDiv = document.getElementById('top-left-container');
var bottomLeftContainerDiv = document.getElementById('bottom-left-container');
var bottomRightContainerDiv = document.getElementById('bottom-right-container');

(function() {
    var trackingActive = false;
    var watchId = null;

    var positionSource = new ol.source.Vector();
    var positionLayer = new ol.layer.Vector({
        source: positionSource,
        zIndex: 1200,
        style: function(feature) {
            if (feature.getGeometry().getType() === 'Point') {
                return new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({ color: '#2563EB' }),
                        stroke: new ol.style.Stroke({ color: '#ffffff', width: 2.5 })
                    })
                });
            }
            return new ol.style.Style({
                fill: new ol.style.Fill({ color: 'rgba(37, 99, 235, 0.15)' }),
                stroke: new ol.style.Stroke({ color: 'rgba(37, 99, 235, 0.5)', width: 1.5 })
            });
        }
    });
    map.addLayer(positionLayer);

    var geolocateButton = document.createElement('button');
    geolocateButton.className = 'geolocate-button fas fa-location-arrow';
    geolocateButton.title = 'Mi ubicación GPS';
    geolocateButton.type = 'button';

    var geolocateControl = document.createElement('div');
    geolocateControl.className = 'ol-unselectable ol-control geolocate';
    geolocateControl.appendChild(geolocateButton);

    function toggleTracking(e) {
        if (e) e.preventDefault();
        if (trackingActive) {
            if (watchId !== null) {
                navigator.geolocation.clearWatch(watchId);
                watchId = null;
            }
            positionSource.clear();
            geolocateButton.classList.remove('active-control');
            trackingActive = false;
        } else {
            if (!navigator.geolocation) {
                alert('Tu navegador no soporta geolocalización.');
                return;
            }
            geolocateButton.classList.add('active-control');
            trackingActive = true;
            var firstPositionSet = false;

            watchId = navigator.geolocation.watchPosition(function(pos) {
                var coords = [pos.coords.longitude, pos.coords.latitude];
                var accuracy = ol.geom.Polygon.circular(coords, pos.coords.accuracy || 15);
                var mapCoords = ol.proj.fromLonLat(coords);

                positionSource.clear();
                positionSource.addFeatures([
                    new ol.Feature(accuracy.transform('EPSG:4326', map.getView().getProjection())),
                    new ol.Feature(new ol.geom.Point(mapCoords))
                ]);

                if (!firstPositionSet) {
                    map.getView().animate({
                        center: mapCoords,
                        zoom: 18,
                        duration: 900
                    });
                    firstPositionSet = true;
                }
            }, function(err) {
                console.warn('Error GPS (' + err.code + '): ' + err.message);
                geolocateButton.classList.remove('active-control');
                trackingActive = false;
            }, {
                enableHighAccuracy: true,
                maximumAge: 5000
            });
        }
    }

    geolocateButton.addEventListener('click', toggleTracking);
    if (topLeftContainerDiv) {
        topLeftContainerDiv.appendChild(geolocateControl);
    }
})();

// --- 10. HERRAMIENTA DE MEDICIÓN ---
var measuring = false;
var measureButton = document.createElement('button');
measureButton.className = 'measure-button fas fa-ruler-combined';
measureButton.title = 'Medir distancia o área';
measureButton.type = 'button';

var measureControl = document.createElement('div');
measureControl.className = 'ol-unselectable ol-control measure-control';

var selectLabel = document.createElement('label');
selectLabel.innerHTML = 'Medir:';
var typeSelect = document.createElement('select');
typeSelect.id = 'type';
[
    { value: 'LineString', description: 'Distancia' },
    { value: 'Polygon', description: 'Área' }
].forEach(function(option) {
    var optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.text = option.description;
    typeSelect.appendChild(optionElement);
});
selectLabel.appendChild(typeSelect);
selectLabel.style.display = 'none';

measureControl.appendChild(selectLabel);
measureControl.appendChild(measureButton);

if (topLeftContainerDiv) {
    topLeftContainerDiv.appendChild(measureControl);
}

var helpTooltipElement;
var helpTooltip;
var measureTooltipElement;
var measureTooltip;

var sourceMeasure = new ol.source.Vector();
var measureLineStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({ color: 'rgba(46, 90, 39, 0.95)', lineDash: [8, 8], width: 3 }),
    image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({ color: '#ffffff', width: 1.5 }),
        fill: new ol.style.Fill({ color: '#2E5A27' })
    })
});

var measureLayer = new ol.layer.Vector({
    source: sourceMeasure,
    displayInLayerSwitcher: false,
    style: measureLineStyle
});
map.addLayer(measureLayer);

var draw;
var formatLength = function(line) {
    var coordinates = line.getCoordinates();
    var length = 0;
    var sourceProj = map.getView().getProjection();
    for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
        var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
        var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
        length += ol.sphere.getDistance(c1, c2);
    }
    return length > 1000
        ? (Math.round(length / 1000 * 100) / 100) + ' km'
        : (Math.round(length * 100) / 100) + ' m';
};

var formatArea = function(polygon) {
    var sourceProj = map.getView().getProjection();
    var geom = polygon.clone().transform(sourceProj, 'EPSG:3857');
    var area = Math.abs(ol.sphere.getArea(geom));
    return area > 1000000
        ? (Math.round((area / 1000000) * 1000) / 1000) + ' km<sup>2</sup>'
        : (Math.round(area * 100) / 100) + ' m<sup>2</sup>';
};

function createHelpTooltip() {
    if (helpTooltipElement && helpTooltipElement.parentNode) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'tooltip hidden';
    helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
    });
    map.addOverlay(helpTooltip);
}

function createMeasureTooltip() {
    if (measureTooltipElement && measureTooltipElement.parentNode) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'tooltip tooltip-measure';
    measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
    });
    map.addOverlay(measureTooltip);
}

function addInteraction() {
    var type = typeSelect.value;
    draw = new ol.interaction.Draw({
        source: sourceMeasure,
        type: type,
        style: measureLineStyle
    });

    var listener;
    draw.on('drawstart', function(evt) {
        sketch = evt.feature;
        var tooltipCoord = evt.coordinate;
        listener = sketch.getGeometry().on('change', function(e) {
            var geom = e.target;
            var output;
            if (geom instanceof ol.geom.Polygon) {
                output = formatArea(geom);
                tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof ol.geom.LineString) {
                output = formatLength(geom);
                tooltipCoord = geom.getLastCoordinate();
            }
            measureTooltipElement.innerHTML = output;
            measureTooltip.setPosition(tooltipCoord);
        });
    });

    draw.on('drawend', function() {
        measureTooltipElement.className = 'tooltip tooltip-static';
        measureTooltip.setOffset([0, -7]);
        sketch = null;
        measureTooltipElement = null;
        createMeasureTooltip();
        ol.Observable.unByKey(listener);
    });
}

addInteraction();

typeSelect.onchange = function() {
    map.removeInteraction(draw);
    addInteraction();
    map.addInteraction(draw);
};

function handleMeasure(e) {
    if (e) e.preventDefault();
    if (!measuring) {
        selectLabel.style.display = '';
        measureButton.classList.add('active-control');
        map.addInteraction(draw);
        createHelpTooltip();
        createMeasureTooltip();
        measuring = true;
    } else {
        selectLabel.style.display = 'none';
        measureButton.classList.remove('active-control');
        map.removeInteraction(draw);
        map.removeOverlay(helpTooltip);
        map.removeOverlay(measureTooltip);
        var staticTooltips = document.getElementsByClassName('tooltip-static');
        while (staticTooltips.length > 0) {
            staticTooltips[0].parentNode.removeChild(staticTooltips[0]);
        }
        measureLayer.getSource().clear();
        sketch = null;
        measuring = false;
    }
}

measureButton.addEventListener('click', handleMeasure);

var zoomControl = document.getElementsByClassName('ol-zoom')[0];
if (zoomControl && topLeftContainerDiv) {
    topLeftContainerDiv.appendChild(zoomControl);
}

// --- 11. CATÁLOGO UNIFICADO DE FRACCIONES + BANNER DE FRACCIÓN ACTIVA + MODAL DE LOTES LIBRES ---
var searchLayer = new SearchLayer({
    layer: lyr_FRACCION_0,
    colName: 'FRACCIONES_Código - Nombre de Fracción',
    zoom: 17,
    collapsed: false,
    map: map,
    maxResults: 500
});
map.addControl(searchLayer);

var searchLayerEl = document.getElementsByClassName('search-layer')[0];
var searchHostEl = document.getElementById('search-host');
if (searchLayerEl && searchHostEl) {
    searchHostEl.appendChild(searchLayerEl);
}
var searchInputEl = document.getElementsByClassName('search-layer-input-search')[0];
if (searchInputEl) {
    searchInputEl.placeholder = 'Buscar fracción o código...';
}

function getUnifiedFractionsCatalog() {
    var catalog = [];

    if (typeof jsonSource_FRACCION_0 !== 'undefined') {
        var polyFeatures = jsonSource_FRACCION_0.getFeatures();
        polyFeatures.forEach(function(pf) {
            var rawName = (pf.get('FRACCIONES_Código - Nombre de Fracción') || '').toString().trim();
            if (!rawName) return;
            var code = extractFractionCodeFromName(rawName);
            var dInfo = getFeatureDistrictInfo(pf);
            var stats = getStatsForFractionCode(code);
            catalog.push({
                name: rawName,
                code: code,
                distrito: dInfo.distrito,
                depto: dInfo.depto,
                districtLabel: dInfo.label,
                geometry: pf.getGeometry(),
                feature: pf,
                stats: stats
            });
        });
    }

    if (typeof jsonSource_fraccion_5 !== 'undefined' && catalog.length === 0) {
        var ptFeatures = jsonSource_fraccion_5.getFeatures();
        ptFeatures.forEach(function(ptf) {
            var code = (ptf.get('FRACCION') || '').toString().trim();
            if (!code) return;
            var dInfo = getFeatureDistrictInfo(ptf);
            var stats = getStatsForFractionCode(code);
            catalog.push({
                name: 'Fracción ' + code,
                code: code,
                distrito: dInfo.distrito,
                depto: dInfo.depto,
                districtLabel: dInfo.label,
                geometry: ptf.getGeometry(),
                feature: ptf,
                stats: stats
            });
        });
    }

    catalog.sort(function(a, b) {
        return a.name.localeCompare(b.name, 'es', { numeric: true });
    });
    return catalog;
}

function findCatalogEntryByCode(code) {
    var c = String(code || '').trim();
    var catalog = getUnifiedFractionsCatalog();
    for (var i = 0; i < catalog.length; i++) {
        if (catalog[i].code === c) return catalog[i];
    }
    return null;
}

// Control de la Barra Inferior de Fracción Activa (#active-fraction-banner)
var currentActiveFractionCode = null;

function hideActiveFractionBanner() {
    currentActiveFractionCode = null;
    var banner = document.getElementById('active-fraction-banner');
    if (banner) banner.classList.add('hidden');
}

function showActiveFractionBannerByCode(code, customTitle) {
    var fCode = String(code || '').trim();
    if (!fCode) return;
    currentActiveFractionCode = fCode;

    var banner = document.getElementById('active-fraction-banner');
    var titleEl = document.getElementById('afb-title');
    var metaEl = document.getElementById('afb-meta');
    var btnTextEl = document.getElementById('afb-btn-text');
    var btnOpen = document.getElementById('afb-btn-open-lots');
    if (!banner || !titleEl || !metaEl || !btnOpen) return;

    var entry = findCatalogEntryByCode(fCode);
    var st = getStatsForFractionCode(fCode);
    var displayTitle = customTitle || (entry ? entry.name : ('Fracción ' + fCode));

    titleEl.textContent = displayTitle;
    if (st.libresCount > 0) {
        var priceInfo = st.minCuotaStr
            ? ('Desde ' + st.minCuotaStr + '/mes')
            : (st.minContadoStr ? ('Contado: ' + st.minContadoStr) : '');
        metaEl.textContent = st.libresCount + (st.libresCount === 1 ? ' lote libre' : ' lotes libres') + (priceInfo ? ' • ' + priceInfo : '');
        metaEl.style.color = '#86EFAC';
        btnOpen.style.display = 'inline-flex';
        if (btnTextEl) btnTextEl.textContent = 'Ver libres (' + st.libresCount + ')';
    } else {
        metaEl.textContent = 'Sin lotes libres disponibles (' + st.totalCount + ' totales)';
        metaEl.style.color = '#FCA5A5';
        btnOpen.style.display = 'none';
    }

    banner.classList.remove('hidden');
}

// Detectar automáticamente cuando el usuario entra a una fracción haciendo zoom en el mapa
map.on('moveend', function() {
    var zoom = map.getView().getZoom();
    if (!zoom || zoom < 15.2 || typeof jsonSource_FRACCION_0 === 'undefined') {
        return;
    }
    var center = map.getView().getCenter();
    if (!center) return;
    var fracsAtCenter = jsonSource_FRACCION_0.getFeaturesAtCoordinate(center);
    if (fracsAtCenter && fracsAtCenter.length > 0) {
        var fName = (fracsAtCenter[0].get('FRACCIONES_Código - Nombre de Fracción') || '').toString().trim();
        var fCode = extractFractionCodeFromName(fName);
        if (fCode && fCode !== currentActiveFractionCode) {
            showActiveFractionBannerByCode(fCode, fName);
        }
    }
});

// Modal del Listado Detallado de Lotes Libres de una Fracción (#free-lots-modal)
var activeModalFractionCode = null;

function openFreeLotsModalForCode(code) {
    var fCode = String(code || '').trim();
    if (!fCode) return;
    activeModalFractionCode = fCode;

    var modal = document.getElementById('free-lots-modal');
    var drawer = document.getElementById('fraction-drawer');
    var titleEl = document.getElementById('flm-fraction-title');
    var subtitleEl = document.getElementById('flm-fraction-subtitle');
    var mzSelect = document.getElementById('flm-manzana-select');
    var sortSelect = document.getElementById('flm-sort-select');

    if (!modal) return;
    if (drawer) drawer.classList.add('hidden');

    var entry = findCatalogEntryByCode(fCode);
    var st = getStatsForFractionCode(fCode);
    var fracName = entry ? entry.name : ('Fracción ' + fCode);
    var distLabel = entry ? entry.districtLabel : '';

    if (titleEl) titleEl.textContent = fracName;
    if (subtitleEl) {
        var parts = [];
        if (distLabel) parts.push('📍 ' + distLabel);
        parts.push(st.libresCount + ' libres de ' + st.totalCount + ' lotes');
        if (st.minCuotaStr) parts.push('Cuota desde ' + st.minCuotaStr);
        subtitleEl.textContent = parts.join(' • ');
    }

    // Poblar selector de Manzanas disponibles en esta fracción
    if (mzSelect) {
        var manzanasSet = {};
        st.freeLots.forEach(function(lf) {
            var mz = lf.get('Manzana') != null ? String(lf.get('Manzana')).trim() : '';
            if (mz) manzanasSet[mz] = (manzanasSet[mz] || 0) + 1;
        });
        var mzKeys = Object.keys(manzanasSet).sort(function(a, b) {
            return a.localeCompare(b, 'es', { numeric: true });
        });

        mzSelect.innerHTML = '';
        var optAll = document.createElement('option');
        optAll.value = 'ALL';
        optAll.textContent = 'Todas las Manzanas (' + st.freeLots.length + ' libres)';
        mzSelect.appendChild(optAll);

        mzKeys.forEach(function(mz) {
            var opt = document.createElement('option');
            opt.value = mz;
            opt.textContent = 'Manzana ' + mz + ' (' + manzanasSet[mz] + ' libres)';
            mzSelect.appendChild(opt);
        });
    }

    if (sortSelect) sortSelect.value = 'MZ_LOTE';
    renderFreeLotsModalList();
    modal.classList.remove('hidden');
}
window.openFreeLotsModalForCode = openFreeLotsModalForCode;

function renderFreeLotsModalList() {
    if (!activeModalFractionCode) return;
    var listEl = document.getElementById('flm-lots-list');
    var summaryEl = document.getElementById('flm-summary-bar');
    var mzSelect = document.getElementById('flm-manzana-select');
    var sortSelect = document.getElementById('flm-sort-select');
    if (!listEl) return;

    var entry = findCatalogEntryByCode(activeModalFractionCode);
    var fracName = entry ? entry.name : ('Fracción ' + activeModalFractionCode);
    var st = getStatsForFractionCode(activeModalFractionCode);
    var selectedMz = mzSelect ? mzSelect.value : 'ALL';
    var sortBy = sortSelect ? sortSelect.value : 'MZ_LOTE';

    var lots = st.freeLots.filter(function(lf) {
        if (selectedMz === 'ALL') return true;
        var mz = lf.get('Manzana') != null ? String(lf.get('Manzana')).trim() : '';
        return mz === selectedMz;
    });

    lots.sort(function(a, b) {
        if (sortBy === 'CUOTA_ASC') {
            var cA = parseGuaranies(a.get('Cuota')) || 999999999999;
            var cB = parseGuaranies(b.get('Cuota')) || 999999999999;
            if (cA < 50000) cA = 999999999999;
            if (cB < 50000) cB = 999999999999;
            if (cA !== cB) return cA - cB;
        } else if (sortBy === 'CONTADO_ASC') {
            var kA = parseGuaranies(a.get('Contado')) || 999999999999;
            var kB = parseGuaranies(b.get('Contado')) || 999999999999;
            if (kA < 1000000) kA = 999999999999;
            if (kB < 1000000) kB = 999999999999;
            if (kA !== kB) return kA - kB;
        } else if (sortBy === 'SUP_DESC') {
            var sA = getOrComputeLotArea(a).num;
            var sB = getOrComputeLotArea(b).num;
            if (sB !== sA) return sB - sA;
        }
        var mzA = (a.get('Manzana') || '').toString().trim();
        var mzB = (b.get('Manzana') || '').toString().trim();
        var cmpMz = mzA.localeCompare(mzB, 'es', { numeric: true });
        if (cmpMz !== 0) return cmpMz;
        var ltA = (a.get('Lote') || '').toString().trim();
        var ltB = (b.get('Lote') || '').toString().trim();
        return ltA.localeCompare(ltB, 'es', { numeric: true });
    });

    if (summaryEl) {
        var minPriceSummary = st.minCuotaStr
            ? ('Mín. Cuota: ' + st.minCuotaStr)
            : (st.minContadoStr ? ('Mín. Contado: ' + st.minContadoStr) : '');
        summaryEl.innerHTML = '<span>Mostrando ' + lots.length + (lots.length === 1 ? ' lote libre' : ' lotes libres') + '</span>' +
                              '<span>' + minPriceSummary + '</span>';
    }

    listEl.innerHTML = '';
    if (lots.length === 0) {
        listEl.innerHTML = '<div style="padding:24px;text-align:center;color:#6B7280;">No hay lotes libres para esta selección.</div>';
        return;
    }

    lots.forEach(function(lf) {
        var idVal = lf.get('ID') != null ? String(lf.get('ID')).trim() : '-';
        var mzVal = lf.get('Manzana') != null ? String(lf.get('Manzana')).trim() : '-';
        var ltVal = lf.get('Lote') != null ? String(lf.get('Lote')).trim() : '-';
        var estadoVal = lf.get('Estado') != null ? String(lf.get('Estado')).trim() : 'Libre';
        var areaObj = getOrComputeLotArea(lf);
        var cuotaRaw = lf.get('Cuota') != null ? String(lf.get('Cuota')).trim() : '-';
        var contadoRaw = lf.get('Contado') != null ? String(lf.get('Contado')).trim() : '-';
        var totalRaw = lf.get('Total') != null ? String(lf.get('Total')).trim() : '-';
        var descRaw = lf.get('Descuento') != null ? String(lf.get('Descuento')).trim() : '';

        var cuotaNum = parseGuaranies(cuotaRaw);
        var contadoNum = parseGuaranies(contadoRaw);
        var totalNum = parseGuaranies(totalRaw);

        var cuotaDisplay = (cuotaNum && cuotaNum >= 50000) ? formatGuaranies(cuotaNum) : 'Consultar';
        var contadoDisplay = (contadoNum && contadoNum >= 1000000) ? formatGuaranies(contadoNum) : 'Consultar';
        var totalDisplay = (totalNum && totalNum >= 1000000) ? formatGuaranies(totalNum) : '-';

        var dims = getLotSideDimensionsArray(lf);
        var waUrl = buildWhatsAppUrlForLot(lf, fracName, dims);

        var card = document.createElement('div');
        card.className = 'flm-lot-card';

        var dimsLine = dims.length > 0
            ? '<div class="flm-lot-dims"><strong>Medidas (' + dims.length + ' lados):</strong> ' + dims.join(' &times; ') + (totalDisplay !== '-' ? ' &middot; <strong>Total:</strong> ' + totalDisplay : '') + '</div>'
            : '';

        var descTag = (descRaw && descRaw !== '0%' && descRaw !== '') ? ' (-' + descRaw + ')' : '';

        card.innerHTML =
            '<div class="flm-lot-header">' +
                '<div>' +
                    '<h4 class="flm-lot-title">Manzana ' + mzVal + ' &bull; Lote ' + ltVal + '</h4>' +
                    '<span class="flm-lot-id">Código ID: ' + idVal + '</span>' +
                '</div>' +
                '<span class="lot-status-badge status-disponible">' + estadoVal + '</span>' +
            '</div>' +
            '<div class="flm-lot-specs">' +
                '<div class="flm-spec-item">' +
                    '<span class="flm-spec-label">Superficie</span>' +
                    '<span class="flm-spec-val">' + areaObj.text + '</span>' +
                '</div>' +
                '<div class="flm-spec-item">' +
                    '<span class="flm-spec-label">Cuota Mensual</span>' +
                    '<span class="flm-spec-val highlight-price">' + cuotaDisplay + '</span>' +
                '</div>' +
                '<div class="flm-spec-item">' +
                    '<span class="flm-spec-label">Contado' + descTag + '</span>' +
                    '<span class="flm-spec-val highlight-price">' + contadoDisplay + '</span>' +
                '</div>' +
            '</div>' +
            dimsLine +
            '<div class="flm-lot-actions">' +
                '<button type="button" class="flm-btn-locate">📍 Ubicar en mapa</button>' +
                '<a href="' + waUrl + '" target="_blank" rel="noopener noreferrer" class="flm-btn-wa">💬 Consultar</a>' +
            '</div>';

        var btnLocate = card.querySelector('.flm-btn-locate');
        if (btnLocate) {
            btnLocate.addEventListener('click', function() {
                var modal = document.getElementById('free-lots-modal');
                if (modal) modal.classList.add('hidden');
                showActiveFractionBannerByCode(activeModalFractionCode, fracName);
                selectAndFocusLotFeature(lf);
            });
        }

        listEl.appendChild(card);
    });
}

// Eventos del modal de lotes libres y banner activo
(function initFreeLotsModalEvents() {
    var modal = document.getElementById('free-lots-modal');
    var btnClose = document.getElementById('flm-btn-close');
    var btnBack = document.getElementById('flm-btn-back');
    var mzSelect = document.getElementById('flm-manzana-select');
    var sortSelect = document.getElementById('flm-sort-select');

    var afbBtnLots = document.getElementById('afb-btn-open-lots');
    var afbBtnClose = document.getElementById('afb-btn-close');

    if (btnClose && modal) {
        btnClose.addEventListener('click', function() {
            modal.classList.add('hidden');
        });
    }
    if (btnBack && modal) {
        btnBack.addEventListener('click', function() {
            modal.classList.add('hidden');
            var drawer = document.getElementById('fraction-drawer');
            if (drawer) drawer.classList.remove('hidden');
        });
    }
    if (mzSelect) {
        mzSelect.addEventListener('change', renderFreeLotsModalList);
    }
    if (sortSelect) {
        sortSelect.addEventListener('change', renderFreeLotsModalList);
    }
    if (afbBtnLots) {
        afbBtnLots.addEventListener('click', function() {
            if (currentActiveFractionCode) {
                openFreeLotsModalForCode(currentActiveFractionCode);
            }
        });
    }
    if (afbBtnClose) {
        afbBtnClose.addEventListener('click', function() {
            hideActiveFractionBanner();
        });
    }
})();

// --- 12. DRAWER DE FRACCIONES CON LIBRES + PRECIO MÁS BARATO ---
function fitMapToCurrentDistrictFilter() {
    var catalog = getUnifiedFractionsCatalog();
    var matching = catalog.filter(function(item) {
        return doesFeatureMatchDistrictFilter(item.feature);
    });
    if (matching.length === 0) return;

    var combinedExtent = ol.extent.createEmpty();
    matching.forEach(function(item) {
        if (item.geometry) {
            ol.extent.extend(combinedExtent, item.geometry.getExtent());
        }
    });

    if (!ol.extent.isEmpty(combinedExtent)) {
        map.getView().fit(combinedExtent, {
            padding: [120, 60, 100, 60],
            maxZoom: matching.length === 1 ? 17 : 14,
            duration: 650
        });
    }
}

function setActiveDistrictFilter(newFilterValue, shouldFitMap) {
    activeDistrictFilter = newFilterValue || 'ALL';
    var sel = document.getElementById('district-select');
    if (sel && sel.value !== activeDistrictFilter) {
        sel.value = activeDistrictFilter;
    }
    refreshAllFilteredLayers();
    if (typeof window.refreshFractionDrawerUI === 'function') {
        window.refreshFractionDrawerUI();
    }
    if (shouldFitMap) {
        if (activeDistrictFilter === 'ALL') {
            map.getView().animate({
                center: ol.extent.getCenter(INITIAL_EXTENT),
                zoom: 8,
                duration: 600
            });
        } else {
            fitMapToCurrentDistrictFilter();
        }
    }
}

(function initFractionAndDistrictDrawer() {
    var btnToggle = document.getElementById('btn-fraction-selector');
    var drawer = document.getElementById('fraction-drawer');
    var btnClose = document.getElementById('fraction-drawer-close');
    var districtSelect = document.getElementById('district-select');
    var btnFitDistrict = document.getElementById('btn-fit-district');
    var filterInput = document.getElementById('fraction-filter-input');
    var sortSelect = document.getElementById('fraction-sort-select');
    var countBar = document.getElementById('fraction-drawer-CountBar');
    var listContainer = document.getElementById('fraction-list-container');

    if (!btnToggle || !drawer || !listContainer) return;

    function populateDistrictSelectOptions() {
        if (!districtSelect) return;
        var catalog = getUnifiedFractionsCatalog();
        var deptoMap = {};

        catalog.forEach(function(item) {
            var depto = item.depto || 'Otros';
            if (!deptoMap[depto]) {
                deptoMap[depto] = { total: 0, districts: {} };
            }
            deptoMap[depto].total++;
            deptoMap[depto].districts[item.districtLabel] = (deptoMap[depto].districts[item.districtLabel] || 0) + 1;
        });

        districtSelect.innerHTML = '';
        var optAll = document.createElement('option');
        optAll.value = 'ALL';
        optAll.textContent = 'Todos los Distritos / Ciudades (' + catalog.length + ')';
        districtSelect.appendChild(optAll);

        var sortedDeptos = Object.keys(deptoMap).sort(function(a, b) {
            return a.localeCompare(b, 'es');
        });

        sortedDeptos.forEach(function(depto) {
            var group = document.createElement('optgroup');
            group.label = 'Departamento de ' + depto + ' (' + deptoMap[depto].total + ')';

            var optDepto = document.createElement('option');
            optDepto.value = 'DEPTO:' + depto;
            optDepto.textContent = '▸ Todo ' + depto + ' (' + deptoMap[depto].total + ' fracciones)';
            group.appendChild(optDepto);

            var distKeys = Object.keys(deptoMap[depto].districts).sort(function(a, b) {
                return a.localeCompare(b, 'es');
            });

            distKeys.forEach(function(dLabel) {
                var opt = document.createElement('option');
                opt.value = 'DIST:' + dLabel;
                var shortName = dLabel.split(' (')[0];
                opt.textContent = '   • ' + shortName + ' (' + deptoMap[depto].districts[dLabel] + ')';
                group.appendChild(opt);
            });

            districtSelect.appendChild(group);
        });

        districtSelect.value = activeDistrictFilter;
    }

    function buildFractionList() {
        listContainer.innerHTML = '';
        var q = (filterInput ? filterInput.value : '').toLowerCase().trim();
        var sortMode = sortSelect ? sortSelect.value : 'CODE';
        var catalog = getUnifiedFractionsCatalog();

        var filtered = catalog.filter(function(item) {
            if (!doesFeatureMatchDistrictFilter(item.feature)) return false;
            if (!q) return true;
            var haystack = (item.name + ' ' + item.districtLabel + ' ' + item.depto).toLowerCase();
            return haystack.indexOf(q) !== -1;
        });

        // Ordenar según criterio seleccionado
        filtered.sort(function(a, b) {
            if (sortMode === 'FREE_DESC') {
                if (b.stats.libresCount !== a.stats.libresCount) {
                    return b.stats.libresCount - a.stats.libresCount;
                }
            } else if (sortMode === 'PRICE_ASC') {
                var pA = a.stats.minCuotaNum || a.stats.minContadoNum || 999999999999;
                var pB = b.stats.minCuotaNum || b.stats.minContadoNum || 999999999999;
                if (a.stats.libresCount === 0) pA = 999999999999;
                if (b.stats.libresCount === 0) pB = 999999999999;
                if (pA !== pB) return pA - pB;
            }
            return a.name.localeCompare(b.name, 'es', { numeric: true });
        });

        var totalLibresInView = 0;
        filtered.forEach(function(it) {
            totalLibresInView += it.stats.libresCount;
        });

        if (countBar) {
            var resetHtml = (activeDistrictFilter !== 'ALL' || q)
                ? '<button type="button" id="btn-clear-district-filter">Restablecer filtro</button>'
                : '';
            countBar.innerHTML = '<span>' + filtered.length + ' fracciones &bull; <strong>' + totalLibresInView + ' lotes libres</strong></span>' + resetHtml;
            var btnClear = document.getElementById('btn-clear-district-filter');
            if (btnClear) {
                btnClear.addEventListener('click', function() {
                    if (filterInput) filterInput.value = '';
                    setActiveDistrictFilter('ALL', true);
                });
            }
        }

        if (filtered.length === 0) {
            listContainer.innerHTML = '<div style="padding:20px;text-align:center;color:#6B7280;font-size:13px;">No se encontraron fracciones con ese criterio.</div>';
            return;
        }

        filtered.forEach(function(item) {
            var st = item.stats;
            var row = document.createElement('div');
            row.className = 'fraction-list-item';

            var badgesHtml = '';
            if (st.libresCount > 0) {
                badgesHtml += '<span class="frac-stat-pill frac-pill-free">&#9679; ' + st.libresCount + (st.libresCount === 1 ? ' libre' : ' libres') + '</span>';
                if (st.minCuotaStr) {
                    badgesHtml += '<span class="frac-stat-pill frac-pill-price">Cuota desde ' + st.minCuotaStr + '</span>';
                }
                if (st.minContadoStr) {
                    badgesHtml += '<span class="frac-stat-pill frac-pill-contado">Contado: ' + st.minContadoStr + '</span>';
                }
            } else {
                badgesHtml += '<span class="frac-stat-pill frac-pill-none">0 libres' + (st.totalCount > 0 ? ' (de ' + st.totalCount + ')' : '') + '</span>';
            }

            var actionsHtml = '<div class="frac-actions-wrap">';
            if (st.libresCount > 0) {
                actionsHtml += '<button type="button" class="btn-frac-view-lots" data-action="lots">📋 Ver libres (' + st.libresCount + ')</button>';
            }
            actionsHtml += '<button type="button" class="btn-frac-go-map" data-action="map">Ir al mapa &rsaquo;</button>';
            actionsHtml += '</div>';

            row.innerHTML =
                '<div class="fraction-item-top">' +
                    '<div class="fraction-item-main">' +
                        '<span class="fraction-item-title">' + item.name + '</span>' +
                        '<span class="fraction-item-location">' +
                            '&#128205; ' + item.distrito +
                            (item.depto ? ' <span class="fraction-item-badge">' + item.depto + '</span>' : '') +
                        '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="fraction-stats-row">' +
                    '<div class="fraction-badges-wrap">' + badgesHtml + '</div>' +
                    actionsHtml +
                '</div>';

            var btnLots = row.querySelector('[data-action="lots"]');
            if (btnLots) {
                btnLots.addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (item.geometry) {
                        map.getView().fit(item.geometry.getExtent(), {
                            padding: [100, 45, 100, 45],
                            maxZoom: 18,
                            duration: 500
                        });
                    }
                    showActiveFractionBannerByCode(item.code, item.name);
                    openFreeLotsModalForCode(item.code);
                });
            }

            row.addEventListener('click', function() {
                drawer.classList.add('hidden');
                showActiveFractionBannerByCode(item.code, item.name);
                if (item.geometry) {
                    map.getView().fit(item.geometry.getExtent(), {
                        padding: [100, 45, 110, 45],
                        maxZoom: 18,
                        duration: 650
                    });
                }
            });

            listContainer.appendChild(row);
        });
    }

    window.refreshFractionDrawerUI = function() {
        populateDistrictSelectOptions();
        buildFractionList();
    };

    btnToggle.addEventListener('click', function() {
        var modal = document.getElementById('free-lots-modal');
        if (modal) modal.classList.add('hidden');
        var isHidden = drawer.classList.contains('hidden');
        if (isHidden) {
            window.refreshFractionDrawerUI();
            drawer.classList.remove('hidden');
        } else {
            drawer.classList.add('hidden');
        }
    });

    if (btnClose) {
        btnClose.addEventListener('click', function() {
            drawer.classList.add('hidden');
        });
    }

    if (districtSelect) {
        districtSelect.addEventListener('change', function() {
            setActiveDistrictFilter(districtSelect.value, true);
        });
    }

    if (btnFitDistrict) {
        btnFitDistrict.addEventListener('click', function() {
            fitMapToCurrentDistrictFilter();
            drawer.classList.add('hidden');
        });
    }

    if (filterInput) {
        filterInput.addEventListener('input', buildFractionList);
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', buildFractionList);
    }

    setTimeout(function() {
        populateDistrictSelectOptions();
        renderQuickFilterPills();
    }, 150);
})();

// --- 13. LAYER SWITCHER Y ATRIBUCIÓN ---
var layerSwitcher = new ol.control.LayerSwitcher({
    tipLabel: 'Capas del Mapa',
    target: 'top-right-container'
});
map.addControl(layerSwitcher);

var bottomAttribution = new ol.control.Attribution({
    collapsible: false,
    collapsed: false,
    className: 'bottom-attribution'
});
map.addControl(bottomAttribution);

var attributionList = document.createElement('li');
attributionList.innerHTML = '<a href="https://github.com/qgis2web/qgis2web">qgis2web</a> &middot; <a href="https://openlayers.org/">OpenLayers</a>';
var bottomAttributionUl = bottomAttribution.element.querySelector('ul');
if (bottomAttributionUl) {
    bottomAttribution.element.insertBefore(attributionList, bottomAttributionUl);
}
if (bottomRightContainerDiv) {
    bottomRightContainerDiv.appendChild(bottomAttribution.element);
}
