/** 
 * This file returns the styling of a layer depending on the types of features the layer
 * consists of.
 * 
 * The reason for the construct layer function is because points/lines/areas have
 * different properties and different types, such as: "fill-color" vs. "line-color".
 * 
 * If a line is added to the map with: {type: fill, fill-color: red}, the line will
 * behave as if a polygon and try to fill the areas between the lines.
 */

const constructLayer = (layer) => {
    var pointLayer = {
        'id': layer.id,
        'type': 'symbol',
        'source': layer.id,
        'layout': {
            visibility: 'visible',
            'icon-image': 'marker',
            'icon-size': 0.08
        },
        'paint': {
            'icon-color': 'white',
        }
    }
    var lineLayer = {
        'id': layer.id,
        'type': 'line',
        'source': layer.id,
        'layout': {
            visibility: 'visible'
        },
        'paint': {
            'line-color': layer.color,
            'line-width': 1
        }
    }
    var polygonLayer = {
        'id': layer.id,
        'type': 'fill',
        'source': layer.id,
        'layout': {
            visibility: 'visible'
        },
        'paint': {
            'fill-color': layer.color,
            'fill-opacity': 0.6
        }
    }
    if (layer.data.type === 'FeatureCollection') {
        if (layer.data.features.length === 0) {
            alert('No features are present in this layer')
            return polygonLayer
        }
        console.log('constructLayer', layer)
        switch (layer.data.features[0].geometry.type) {
            case 'Point':
            case 'MultiPoint':
                return pointLayer;
            case 'Line':
            case 'LineString':
            case 'MultiLineString':
                return lineLayer;
            case 'Polygon':
            case 'MultiPolygon':
                return polygonLayer;
            default:
                return polygonLayer;
        }
    } else if (layer.data.type === 'Feature') {
        switch (layer.data.geometry.type) {
            case 'Point':
            case 'MultiPoint':
                return pointLayer;
            case 'Line':
            case 'LineString':
            case 'MultiLineString':
                return lineLayer;
            case 'Polygon':
            case 'MultiPolygon':
                return polygonLayer;
            default:
                return polygonLayer;
        }
    }
    else {
        return polygonLayer
    }
}

export default constructLayer;