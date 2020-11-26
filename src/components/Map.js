import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import Sidebar from "./Sidebar"

const backgroundLayers = [
	{ id: "streets-v11", name: "Streets" },
	{ id: "light-v10", name: "Light" },
	{ id: "dark-v10", name: "Dark" },
	{ id: "satellite-v9", name: "Satellite" },
];
mapboxgl.accessToken = "pk.eyJ1IjoibW9uc2VtIiwiYSI6ImNraG4yc2syaTBiZ24ydGwxOTg0ZnJiMG0ifQ.B3OT7lkRhmt4w5lTa9fJ2w"

const Map = () => {
	const [map, setMap] = useState(null)
	const [backgroundLayerID, setbackgroundLayerID] = useState("streets-v11");
	const [layers, setLayers] = useState([])
	const mapContainer = useRef(null)

	useEffect(() => {
		const initializeMap = ({ setMap, mapContainer }) => {
			console.log("inimap runs")
			const map = new mapboxgl.Map({
				container: mapContainer.current,
				style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
				center: [10.3856, 63.4292],
				zoom: 12.2
			});
			map.on("load", () => {
				setMap(map);
				map.resize();
			});
		};

		if (!map) initializeMap({ setMap, mapContainer });
		if (map) map.setStyle("mapbox://styles/mapbox/" + backgroundLayerID);
	}, [backgroundLayerID, map]);

	useEffect(() => {
		const updateMap = (map, layers) => {
			layers.filter((l) => !l.addedToMap)
				.forEach((layer) => {
					console.log("layer", layer)
					map.addSource(layer.id, {
						'type': 'geojson',
						'data': layer.data
					});
					map.addLayer({
						'id': layer.id,
						'type': 'fill',
						'source': layer.id,
						'layout': {
							visibility: 'visible'
						},
						'paint': {
							'fill-color': layer.color,
							'fill-opacity': 0.4
						}
					});
					layer.addedToMap = true;
				})
		}
		if (map && layers) updateMap(map, layers)
	}, [layers, map])


	const addLayerToState = (layer) => {
		setLayers((oldLayers) => [...oldLayers, layer]);
	}
	const removeLayerFromState = (layerId) => {
		map.removeSource(layerId)
		map.removeLayer(layerId);
		setLayers(layers => layers.filter(layer => layer.id !== layerId))
	}
	const removeAllLayers = () => {
		setLayers([])
	}
	const toggleVisibility = (layerId) => {
		const visibility = map.getLayoutProperty(layerId, "visibility");
		if (visibility === 'visible') {
			map.setLayoutProperty(layerId, 'visibility', 'none');
		} else {
			map.setLayoutProperty(layerId, 'visibility', 'visible')
		}
	};

	return (
		<div>
			{/* <Sidebar layers={layers} addLayer={addLayerToState} removeLayer={removeLayerFromState} toggleVisibility={toggleVisibility} /> */}
			<div className="menuStyle">
				{backgroundLayers.map((backgroundLayer) => (
					<div key={backgroundLayer.id}>
						<input
							id={backgroundLayer.id}
							type="radio"
							name="rtoggle"
							value={backgroundLayer.id}
							onClick={() => {
								setbackgroundLayerID(backgroundLayer.id);
								removeAllLayers()
							}}
							defaultChecked={backgroundLayer.id === backgroundLayerID}
						/>
						<label>{backgroundLayer.name}</label>
					</div>
				))}
			</div>
			<div ref={(el) => (mapContainer.current = el)} className="mapContainer" />
		</div>
	)

}
export default Map;