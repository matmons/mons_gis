var buffer = {
    id: 1,
    title: 'Buffer',
    layerList: ['Layer 1'],
    parameters: { Radius: 'number' },
    description: "The Buffer Operation takes the features from a source vector layer and creates a buffer area of a specified distance around, storing the result on a Result Layer."
}
var intersect = {
    id: 2,
    title: 'Intersect',
    layerList: ['Layer 1', 'Layer 2'],
    parameters: {},
    description: "The Intersect Operation calculates the geometric intersection of two layers."
}

var union = {
    id: 3,
    title: 'Union',
    layerList: ['Layer 1', 'Layer 2'],
    parameters: {},
    description: "The Union Operation combines the features from two layers into a single, composite layer."
}

var difference = {
    id: 4,
    title: 'Difference',
    layerList: ['Layer 1', 'Layer 2'],
    parameters: {},
    description: "The Difference Operation finds the difference between two polygons by clipping the second polygon from the first."
}

const OperationList = [buffer, intersect, union, difference]

export default OperationList