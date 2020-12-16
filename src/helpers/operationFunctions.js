/**
 * This file contains all functions based on Turf. Each operation takes a layer and
 * releveant parameters as input, the transformation is done and a new layer is created.
 * The output is formated as a layer which can be added to a map.
 */

import difference from '@turf/difference'
import intersect from '@turf/intersect'
import buffer from '@turf/buffer'
import union from '@turf/union'
import clustersKmeans from '@turf/clusters-kmeans'
import getRandomColor from './getRandomColor'

export const Buffer = (layer1, radius) => {

    var buff = buffer(layer1.data, radius)

    const newLayer = {
        id: 'Buff_' + layer1.name,
        name: 'Buff_' + layer1.name,
        data: buff,
        addedToMap: false,
        color: getRandomColor()
    }
    return newLayer
}
export const Intersect = (layer1, layer2) => {
    const l1 = detailLevelHelper(layer1.data)
    const l2 = detailLevelHelper(layer2.data)
    var intersectLayer = intersect(l1, l2)

    const newLayer = {
        id: 'IS_' + layer1.name + '_' + layer2.name,
        name: 'IS_' + layer1.name + '_' + layer2.name,
        data: intersectLayer,
        addedToMap: false,
        color: getRandomColor()
    }
    return newLayer
}
export const Union = (layer1, layer2) => {
    var unionLayer = union(layer1.data, layer2.data)

    const newLayer = {
        id: 'Union_' + layer1.name + '_' + layer2.name,
        name: 'Union_' + layer1.name + '_' + layer2.name,
        data: unionLayer,
        addedToMap: false,
        color: getRandomColor()
    }
    return newLayer
}
export const Difference = (layer1, layer2) => {
    const l1 = detailLevelHelper(layer1.data)
    const l2 = detailLevelHelper(layer2.data)
    console.log(l1, l2)
    var diff = difference(l1, l2)

    const newLayer = {
        id: 'Diff_' + layer1.name + '_' + layer2.name,
        name: 'Diff_' + layer1.name + '_' + layer2.name,
        data: diff,
        addedToMap: false,
        color: getRandomColor()
    }
    return newLayer
}
export const Clustering = (layer1, clusterCount) => {
    var cluster = clustersKmeans(layer1.data, { numberOfClusters: clusterCount })

    const newLayer = {
        id: 'Cluster_' + layer1.name,
        name: 'Cluster_' + layer1.name,
        data: cluster,
        addedToMap: false,
        color: getRandomColor()
    }
    return newLayer
}

const detailLevelHelper = (data) => {
    switch (data.type) {
        case 'FeatureCollection':
            return union(...data.features)
        case 'Feature':
            return data
        default:
            return data
    }
}