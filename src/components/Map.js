/**
 * This is the website's main file, which creates the map and manages layers.
 * 
 * To summerize:
 * Maps and menus are given a defualt styling. 
 * The basemap is set/managed in this file.
 * The map is initialized
 * Layers are added and removed
 * 
 * Serves as the parent to all other components in the application.
 * 
 * Distributes information to the navigation bar.
 */

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import NavBar from "./NavBar/NavBar.js"

import constructLayer from './../helpers/constructLayer'

const mapStyle = {
	position: "absolute",
	top: 0,
	bottom: 0,
	right: 0,
	left: 0,
	zIndex: "-1",
};

const menuStyle = {
	position: "absolute",
	top: 0,
	right: 0,
	margin: 10,
	padding: 10,
	background: "white",
	zIndex: "1",
	display: "flex",
};

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
					map.addSource(layer.id, {
						'type': 'geojson',
						'data': layer.data
					});
					map.addLayer(constructLayer(layer));
					layer.addedToMap = true;
				})
		}
		if (map && layers) updateMap(map, layers)
	}, [layers, map])


	const addLayerToState = (layer) => {
		setLayers((oldLayers) => [...oldLayers, layer]);
	}
	const removeLayerFromState = (layerId) => {
		map.removeLayer(layerId);
		map.removeSource(layerId);
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
			<NavBar map={map} lrs={layers} addLayer={addLayerToState} removeLayer={removeLayerFromState} toggleVisibility={toggleVisibility} />
			<div style={menuStyle}>
				{backgroundLayers.map((backgroundLayer) => (
					<div key={backgroundLayer.id} style={{ margin: 4 }}>
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
						<label style={{ margin: 2 }}>{backgroundLayer.name}</label>
					</div>
				))}
			</div>
			<div ref={(el) => (mapContainer.current = el)} style={mapStyle} />
		</div>
	)

}
export default Map;