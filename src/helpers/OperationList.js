/**
 * This is a list of all standard operations where the turf library is used. This file has 
 * performs no actions or modifies any data. In the operation list, each operation is 
 * standardized to minimize the amount of code required to support new operations.
 *
 * To add a new turf operation to Mons GIS, one has to create a variable with the parameters:
 * - id
 * - title
 * - layerList (number of layers used in the operation)
 * - parameters (parameters and input type used in the operation)
 * - description
 * 
 * This information is used to create a customized pop up with the desired input options. 
 * 
 * For more details on operations, check out in operationModal under components/Navbar.
 */

var buffer = {
    id: 1,
    title: 'Buffer',
    layerList: ['Layer 1'],
    parameters: { Radius: 'number' },
    description: "The Buffer Operation takes the features from a source vector layer and creates a buffer area of a specified distance around, storing the result on a Result Layer. The radius is specified in kilometers. Use '0.1' for decimals, commas ('0,1') are not accepted."
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
var clustering = {
    id: 5,
    title: 'Clustering',
    layerList: ['Layer 1'],
    parameters: { 'Number of Clusters': 'number' },
    description: "The Clustering Operation takes a collection of points and returns the resulting K means clusters. The number of clusters required depends on your applicaiton."
}

const OperationList = [buffer, intersect, union, difference, clustering]

export default OperationList