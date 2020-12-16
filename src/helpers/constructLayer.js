/*
This file returns the styling of a layer depending on the types of features the layer consists of.
*/

const constructLayer = (layer) => {
    var pointLayer = {
        'id': layer.id,
        'type': 'symbol',
        'source': layer.id,
        'layout': {
            visibility: 'visible',
            'icon-size': 10
        },
        'paint': {
            'icon-color': layer.color
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
            'line-width': 0.6
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
        console.log("FC construct layer", layer)
        switch (layer.data.features[0].geometry.type) {
            case 'Point':
            case 'MultiPoint':
                console.log("point case")
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
        console.log("Feature construct layer", layer)
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