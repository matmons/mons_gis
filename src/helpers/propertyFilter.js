
const propertyFilter = (featureList, property, operator, value) => {
    // layer.data.features[i].properties -> en liste med egenskaper til dette laget.
    // list of properties for that layer, assuiming that all featuers have equal properties.
    switch (operator) {
        case '=':
            return featureList.filter(feature => feature.properties[property] === value)
        case '<=':
            return featureList.filter(feature => feature.properties[property] <= value)
        case '>=':
            return featureList.filter(feature => feature.properties[property] >= value)
        case '<':
            return featureList.filter(feature => feature.properties[property] < value)
        case '>':
            return featureList.filter(feature => feature.properties[property] > value)
        default:
            alert("Operator not found, returns empty list.")
            return []
    }
}

export default propertyFilter;