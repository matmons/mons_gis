import React, { useEffect, useState } from "react"

const LayerHandler = ({ setMap }) => {
    const [layers, setLayers] = useState([])

    const convertJSONToLayer = (jsonString) => {
        const GeoJSON = JSON.parse(jsonString);
        const newLayer = {
            name: GeoJSON.name,
            features: GeoJSON.features
        }
        if (layers) {
            setLayers(oldLayers => ([...oldLayers, newLayer]));
        } else {
            setLayers(newLayer)
        }
    }
    useEffect(() => {
        layers.forEach(layer => {
            setMap(oldMap => oldMap.add)
        })
    }, [layers])


}

export default LayerHandler;