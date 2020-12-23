/**
 * @param {[List of all features]} featureList 
 * @param {Name of property to filter by} property 
 * @param {How to filter by property} operator 
 * @param {What value the filter compares against} value 
 * @returns All features that match the requirement.
 */

const propertyFilter = (featureList, property, operator, value) => {
    if (typeof value === 'string') {
        return featureList.filter(feature => feature.properties[property] === value)
    } else {
        switch (operator) {
            case '=':
                return featureList.filter(feature => parseFloat(feature.properties[property]) === value)
            case '<=':
                return featureList.filter(feature => parseFloat(feature.properties[property]) <= value)
            case '>=':
                return featureList.filter(feature => parseFloat(feature.properties[property]) >= value)
            case '<':
                return featureList.filter(feature => parseFloat(feature.properties[property]) < value)
            case '>':
                return featureList.filter(feature => parseFloat(feature.properties[property]) > value)
            default:
                alert("Operator not found, returns empty list.")
                return []
        }
    }

}

export default propertyFilter;