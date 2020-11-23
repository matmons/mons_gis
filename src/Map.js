import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import Sidebar from "./Sidebar"

const menuStyle = {
	position: "absolute",
	background: "white",
	padding: 10,
	zIndex: "1",
	display: "flex",
};

const backgroundLayers = [
	{ id: "streets-v11", name: "Streets" },
	{ id: "light-v10", name: "Light" },
	{ id: "dark-v10", name: "Dark" },
	{ id: "satellite-v9", name: "Satellite" },
];
const Map = () => {
	const [map, setMap] = useState(null)
	const [backgroundLayerID, setbackgroundLayerID] = useState("streets-v11");
	const [layers, setLayers] = useState([])
	const mapContainer = useRef(null)

	useEffect(() => {
		mapboxgl.accessToken = 'pk.eyJ1IjoibW9uc2VtIiwiYSI6ImNraG4yc2syaTBiZ24ydGwxOTg0ZnJiMG0ifQ.B3OT7lkRhmt4w5lTa9fJ2w';

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
		const updateMap = ({ map }) => {
			console.log("updatemap runs");
			map.on("load", () => {
				layers.filter(layer => layer.visible)
					.map(visibleLayer => {
						map.addSource(visibleLayer.name, {
							'type': 'geojson',
							'data': visibleLayer.data
						})
						map.addLayer({
							'id': visibleLayer.name,
							'type': 'fill',
							'source': visibleLayer.name,
							'layout': {},
							'paint': {
								'fill-color': '#088',
								'fill-opacity': 0.8
							}
						})
					})
			});

		}
		if (!map) initializeMap({ setMap, mapContainer });
		if (map && layers) updateMap({ setMap })
	}, [map, layers]);

	const addLayer = (layer) => {
		setLayers((oldLayers) => [...oldLayers, layer]);
	}

	return (
		<div>
			<Sidebar layers={layers} addLayer={addLayer} />
			<div style={menuStyle}>
				{backgroundLayers.map((backgroundLayer) => (
					<div key={backgroundLayer.id}>
						<input
							id={backgroundLayer.id}
							type="radio"
							name="rtoggle"
							value={backgroundLayer.id}
							onClick={() => setbackgroundLayerID(backgroundLayer.id)}
							defaultChecked={backgroundLayer.id === backgroundLayerID}
						/>
						<label>{backgroundLayer.name}</label>
					</div>
				))}
			</div>
			<div ref={(el) => (mapContainer.current = el)} style={styles} />
		</div>
	)

}
export default Map;