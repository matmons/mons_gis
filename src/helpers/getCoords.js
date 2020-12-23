/**
 * This component return the coordinates of a point. It is used to display the pop-up
 * you can see when clicking a point in the map.
 */

const getCoords = (data) => {
    switch (data.type) {
        case 'Feature':
            if (data.features.geometry.type === 'Point') {
                return data.features.geometry.coordinates.slice()
            } else {
                return data.features.geometry.coordinates[0].slice()
            }
        case 'FeatureCollection':
        default:
            if (data.features[0].geometry.type === 'Point') {
                return data.features[0].geometry.coordinates.slice()
            } else {
                return data.features[0].geometry.coordinates[0].slice()
            }
    }
}

export default getCoords;