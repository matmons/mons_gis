import difference from '@turf/difference'
import intersect from '@turf/intersect'
import buffer from '@turf/buffer'
import union from '@turf/union'
import getRandomColor from './getRandomColor'

export const Buffer = (layer1, radius) => {
    // Unecessary? Buffer works on collections.
    // const l1 = detailLevelHelper(layer1.data)
    var buff = buffer(layer1.data, radius)

    const newLayer = {
        id: 'Buff_' + layer1.id,
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
        id: 'IS_' + layer1.id + '_' + layer2.id,
        data: intersectLayer,
        addedToMap: false,
        color: getRandomColor()
    }
    return newLayer
}
export const Union = (layer1, layer2) => {
    var unionLayer = union(layer1.data, layer2.data)

    const newLayer = {
        id: 'Union_' + layer1.id + '_' + layer2.id,
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
        id: 'Diff_' + layer1.id + '_' + layer2.id,
        data: diff,
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