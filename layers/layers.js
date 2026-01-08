var wms_layers = [];

var format_FRACCION_0 = new ol.format.GeoJSON();
var features_FRACCION_0 = format_FRACCION_0.readFeatures(json_FRACCION_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_FRACCION_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_FRACCION_0.addFeatures(features_FRACCION_0);
var lyr_FRACCION_0 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_FRACCION_0, 
                style: style_FRACCION_0,
                popuplayertitle: 'FRACCION',
                interactive: true,
                title: '<img src="styles/legend/FRACCION_0.png" /> FRACCION'
            });

        var lyr_OpenStreetMap_1 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });

        var lyr_MAPA_2 = new ol.layer.Tile({
            'title': 'MAPA',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
            })
        });
var format_Combinado_3 = new ol.format.GeoJSON();
var features_Combinado_3 = format_Combinado_3.readFeatures(json_Combinado_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Combinado_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Combinado_3.addFeatures(features_Combinado_3);
var lyr_Combinado_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Combinado_3, 
                style: style_Combinado_3,
                maxResolution: 10, // Adjust this: Layer disappears if you zoom OUT further than this
                minResolution: 0,  // Layer stays visible no matter how far you zoom IN
                popuplayertitle: 'Combinado',
                interactive: true,
    title: 'Combinado<br />\
    <img src="styles/legend/Combinado_3_0.png" /> <br />\
    <img src="styles/legend/Combinado_3_1.png" /> <br />\
    <img src="styles/legend/Combinado_3_2.png" /> <br />\
    <img src="styles/legend/Combinado_3_3.png" /> <br />\
    <img src="styles/legend/Combinado_3_4.png" /> <br />\
    <img src="styles/legend/Combinado_3_5.png" /> <br />\
    <img src="styles/legend/Combinado_3_6.png" /> <br />\
    <img src="styles/legend/Combinado_3_7.png" /> <br />\
    <img src="styles/legend/Combinado_3_8.png" /> <br />\
    <img src="styles/legend/Combinado_3_9.png" /> <br />\
    <img src="styles/legend/Combinado_3_10.png" /> <br />\
    <img src="styles/legend/Combinado_3_11.png" /> <br />\
    <img src="styles/legend/Combinado_3_12.png" /> <br />\
    <img src="styles/legend/Combinado_3_13.png" /> <br />\
    <img src="styles/legend/Combinado_3_14.png" /> <br />\
    <img src="styles/legend/Combinado_3_15.png" /> <br />\
    <img src="styles/legend/Combinado_3_16.png" /> <br />' });
var format_FRACCIONcopiar_4 = new ol.format.GeoJSON();
var features_FRACCIONcopiar_4 = format_FRACCIONcopiar_4.readFeatures(json_FRACCIONcopiar_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_FRACCIONcopiar_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_FRACCIONcopiar_4.addFeatures(features_FRACCIONcopiar_4);
cluster_FRACCIONcopiar_4 = new ol.source.Cluster({
  distance: 30,
  source: jsonSource_FRACCIONcopiar_4
});
var lyr_FRACCIONcopiar_4 = new ol.layer.Vector({
                declutter: false,
                source:cluster_FRACCIONcopiar_4, 
                style: style_FRACCIONcopiar_4,
                popuplayertitle: 'FRACCION copiar',
                interactive: false,
                title: '<img src="styles/legend/FRACCIONcopiar_4.png" /> FRACCION copiar'
            });
var format_fraccion_5 = new ol.format.GeoJSON();
var features_fraccion_5 = format_fraccion_5.readFeatures(json_fraccion_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_fraccion_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_fraccion_5.addFeatures(features_fraccion_5);
cluster_fraccion_5 = new ol.source.Cluster({
  distance: 30,
  source: jsonSource_fraccion_5
});
var lyr_fraccion_5 = new ol.layer.Vector({
                declutter: false,
                source:cluster_fraccion_5, 
                style: style_fraccion_5,
                popuplayertitle: 'fraccion',
                interactive: false,
                title: '<img src="styles/legend/fraccion_5.png" /> fraccion'
            });
var format_NOMBREFRACCION_6 = new ol.format.GeoJSON();
var features_NOMBREFRACCION_6 = format_NOMBREFRACCION_6.readFeatures(json_NOMBREFRACCION_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_NOMBREFRACCION_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_NOMBREFRACCION_6.addFeatures(features_NOMBREFRACCION_6);
var lyr_NOMBREFRACCION_6 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_NOMBREFRACCION_6, 
                style: style_NOMBREFRACCION_6,
                popuplayertitle: 'NOMBRE FRACCION',
                interactive: true,
                title: '<img src="styles/legend/NOMBREFRACCION_6.png" /> NOMBRE FRACCION'
            });
var format_MANZANAS_7 = new ol.format.GeoJSON();
var features_MANZANAS_7 = format_MANZANAS_7.readFeatures(json_MANZANAS_7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_MANZANAS_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_MANZANAS_7.addFeatures(features_MANZANAS_7);
var lyr_MANZANAS_7 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_MANZANAS_7, 
                style: style_MANZANAS_7,
                maxResolution: 10, // Adjust this: Layer disappears if you zoom OUT further than this
                minResolution: 0,  // Layer stays visible no matter how far you zoom IN
                popuplayertitle: 'MANZANAS',
                interactive: false,
                title: '<img src="styles/legend/MANZANAS_7.png" /> MANZANAS'
            });

lyr_FRACCION_0.setVisible(true);lyr_OpenStreetMap_1.setVisible(true);lyr_MAPA_2.setVisible(true);lyr_Combinado_3.setVisible(true);lyr_FRACCIONcopiar_4.setVisible(true);lyr_fraccion_5.setVisible(true);lyr_NOMBREFRACCION_6.setVisible(true);lyr_MANZANAS_7.setVisible(true);
var layersList = [lyr_FRACCION_0,lyr_OpenStreetMap_1,lyr_MAPA_2,lyr_Combinado_3,lyr_FRACCIONcopiar_4,lyr_fraccion_5,lyr_NOMBREFRACCION_6,lyr_MANZANAS_7];
lyr_FRACCION_0.set('fieldAliases', {'FRACCIONES_Código - Nombre de Fracción': 'FRACCIONES_Código - Nombre de Fracción', });
lyr_Combinado_3.set('fieldAliases', {'ID': 'ID', 'Manzana': 'Manzana', 'Lote': 'Lote', 'Superficie': 'Superficie', 'Estado': 'Estado', 'Cuota': 'Cuota', 'Total': 'Total', 'Descuento': 'Descuento', 'Contado': 'Contado', 'Entrega': 'Entrega', 'ID 3': 'ID 3', });
lyr_FRACCIONcopiar_4.set('fieldAliases', {'FRACCION': 'FRACCION', 'FRACCIONES_Código - Nombre de Fracción': 'FRACCIONES_Código - Nombre de Fracción', });
lyr_fraccion_5.set('fieldAliases', {'FRACCION': 'FRACCION', });
lyr_NOMBREFRACCION_6.set('fieldAliases', {'NAME': 'NAME', });
lyr_MANZANAS_7.set('fieldAliases', {'id': 'id', });
lyr_FRACCION_0.set('fieldImages', {'FRACCIONES_Código - Nombre de Fracción': '', });
lyr_Combinado_3.set('fieldImages', {'ID': 'TextEdit', 'Manzana': 'TextEdit', 'Lote': 'TextEdit', 'Superficie': 'TextEdit', 'Estado': 'TextEdit', 'Cuota': 'TextEdit', 'Total': 'TextEdit', 'Descuento': 'TextEdit', 'Contado': 'TextEdit', 'Entrega': 'TextEdit', 'ID 3': 'TextEdit', });
lyr_FRACCIONcopiar_4.set('fieldImages', {'FRACCION': 'TextEdit', 'FRACCIONES_Código - Nombre de Fracción': 'TextEdit', });
lyr_fraccion_5.set('fieldImages', {'FRACCION': 'TextEdit', });
lyr_NOMBREFRACCION_6.set('fieldImages', {'NAME': 'TextEdit', });
lyr_MANZANAS_7.set('fieldImages', {'id': 'TextEdit', });
lyr_FRACCION_0.set('fieldLabels', {'FRACCIONES_Código - Nombre de Fracción': 'no label', });
lyr_Combinado_3.set('fieldLabels', {'ID': 'header label - always visible', 'Manzana': 'header label - always visible', 'Lote': 'header label - always visible', 'Superficie': 'header label - always visible', 'Estado': 'header label - always visible', 'Cuota': 'header label - always visible', 'Total': 'header label - always visible', 'Descuento': 'no label', 'Contado': 'header label - always visible', 'Entrega': 'no label', 'ID 3': 'no label', });
lyr_FRACCIONcopiar_4.set('fieldLabels', {'FRACCION': 'no label', 'FRACCIONES_Código - Nombre de Fracción': 'no label', });
lyr_fraccion_5.set('fieldLabels', {'FRACCION': 'no label', });
lyr_NOMBREFRACCION_6.set('fieldLabels', {'NAME': 'no label', });
lyr_MANZANAS_7.set('fieldLabels', {'id': 'no label', });
lyr_MANZANAS_7.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});