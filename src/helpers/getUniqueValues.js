/**
 * This funtion takes a layer as input and returns all unique values of a property that 
 * is NOT a number. Only unique text values are stored as unique number values often 
 * result in a very long list of numbers...
 * @params {layer} layer
 * @returns {Object}
 */

import isNumber from './isNumber'

const getUniqueValues = (layer) => {
    const uniqueValues = {}
    Object.entries(layer.data.features[0].properties).map(([key, value]) => {
        uniqueValues[key] = [value]
    })
    layer.data.features.forEach(feature => {
        Object.entries(feature.properties).forEach(([key, value]) => {
            if (typeof value === 'string' && !isNumber(value)) {
                if (!uniqueValues[key].includes(value)) {
                    uniqueValues[key].push(value)
                }
            }
        })
    })
    return uniqueValues;
}

export default getUniqueValues