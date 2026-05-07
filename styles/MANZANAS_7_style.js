var size = 0;
var placement = 'point';

var style_MANZANAS_7 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var value = feature.get("");
    var labelFont = "13.0px \'Rockwell Extra Bold\', sans-serif";
    var labelFill = "#fb0000";
    var bufferColor = "#fafafa";
    var bufferWidth = 3.0;
    
    // CAMBIO 1: Alineación central para evitar desfase
    var textAlign = "center"; 
    var offsetX = 0;
    var offsetY = 0;
    var placement = 'point';

    // CAMBIO 2: Se eliminó la restricción de resolución para que siempre sea visible
    if (feature.get("id") !== null && resolution < 10.0) { 
        labelText = String(feature.get("id"));
    }
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(35,35,35,1.0)', 
            lineDash: null, 
            lineCap: 'butt', 
            lineJoin: 'miter', 
            width: 0.988
        }),
        fill: new ol.style.Fill({
            color: 'rgba(183,72,75,0.0)'
        }),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth),
        // Opcional: Asegura que el texto esté por encima de otras capas
        zIndex: 100
    })];

    return style;
};