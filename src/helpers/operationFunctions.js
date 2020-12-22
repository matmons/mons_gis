/**
 * This file contains all functions based on Turf. Each operation takes a layer and
 * releveant parameters as input, the transformation is done and a new layer is created.
 * The output is formated as a layer which can be added to a map.
 * 
 * Mapbox is interested in the newData variable in each funciton, but to support the 
 * level of user interaction I wanted - some parameters for each layer is also stored in
 * variables. That is:
 * 
 * "newData" : GeoJSON (used by mapbox)
 * "newLayer": Object (used by Mons GIS to manage layers)
 * 
 * The detailLevelHelper function either returns the feature as is, or joins multiple a
 * multi-x feature to a single feature by use of the union operation. This is to
 * decrease detail-level sensitivity of inputs to operations. (To make the same 
 * operation work on different layer formats.)
 */

import difference from '@turf/difference'
import intersect from '@turf/intersect'
import buffer from '@turf/buffer'
import union from '@turf/union'
import clustersKmeans from '@turf/clusters-kmeans'
import getRandomColor from './getRandomColor'
import getDisplayType from './getDisplayType'

export const Buffer = (layer1, radius) => {

    var newData = buffer(layer1.data, radius)

    const newLayer = {
        id: 'Buff_' + layer1.name + (Math.floor(Math.random() * 1000)).toString(),
        name: 'Buff_' + layer1.name,
        data: newData,
        addedToMap: false,
        color: getRandomColor(),
        displayType: getDisplayType(newData)
    }
    return newLayer
}
export const Intersect = (layer1, layer2) => {
    const l1 = detailLevelHelper(layer1.data)
    const l2 = detailLevelHelper(layer2.data)
    var newData = intersect(l1, l2)

    const newLayer = {
        id: 'IS_' + layer1.name + '_' + layer2.name + (Math.floor(Math.random() * 1000)).toString(),
        name: 'IS_' + layer1.name + '_' + layer2.name,
        data: newData,
        addedToMap: false,
        color: getRandomColor(),
        displayType: getDisplayType(newData)
    }
    return newLayer
}
export const Union = (layer1, layer2) => {
    const l1 = detailLevelHelper(layer1.data)
    const l2 = detailLevelHelper(layer2.data)
    var newData = union(l1, l2)

    const newLayer = {
        id: 'Union_' + layer1.name + '_' + layer2.name + (Math.floor(Math.random() * 1000)).toString(),
        name: 'Union_' + layer1.name + '_' + layer2.name,
        data: newData,
        addedToMap: false,
        color: getRandomColor(),
        displayType: getDisplayType(newData)
    }
    return newLayer
}
export const Difference = (layer1, layer2) => {
    const l1 = detailLevelHelper(layer1.data)
    const l2 = detailLevelHelper(layer2.data)
    var newData = difference(l1, l2)

    const newLayer = {
        id: 'Diff_' + layer1.name + '_' + layer2.name + (Math.floor(Math.random() * 1000)).toString(),
        name: 'Diff_' + layer1.name + '_' + layer2.name,
        data: newData,
        addedToMap: false,
        color: getRandomColor(),
        displayType: getDisplayType(newData)
    }
    return newLayer
}
export const Clustering = (layer1, clusterCount) => {
    var newData = clustersKmeans(layer1.data, { numberOfClusters: clusterCount })

    const newLayer = {
        id: 'Cluster_' + layer1.name + (Math.floor(Math.random() * 1000)).toString(),
        name: 'Cluster_' + layer1.name,
        data: newData,
        addedToMap: false,
        color: getRandomColor(),
        displayType: getDisplayType(newData)
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