const getDescription = (data) => {
    console.log('getdesc', data.features)
    if (data.features[0].layer.id.split('_')[0] === 'Cluster') {
        return 'Cluster ' + data.features[0].properties.cluster.toString()
    }
    switch (data.type) {
        case 'Feature':
            if (data.features.geometry.type === 'Point') {
                return data.features.properties.description
            } else {
                return data.features[0].properties.description
            }
        case 'FeatureCollection':
        default:
            if (data.features[0].geometry.type === 'Point') {
                return data.features[0].properties.description
            } else {
                return data.features[0].properties.description
            }
    }
}

export default getDescription;