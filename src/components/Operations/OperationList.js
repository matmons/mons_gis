var buffer = {
    id: 1,
    title: 'Buffer',
    layerList: ['Layer 1'],
    parameters: { Radius: 'number' }
}
var intersect = {
    id: 2,
    title: 'Intersect',
    layerList: ['Layer 1', 'Layer 2'],
    parameters: {}
}

var union = {
    id: 3,
    title: 'Union',
    layerList: ['Layer 1', 'Layer 2'],
    parameters: { Outer: "checkbox" }
}

var difference = {
    id: 4,
    title: 'Difference',
    layerList: ['Layer 1', 'Layer 2'],
    parameters: {}
}

const OperationList = [buffer, intersect, union, difference]

export default OperationList