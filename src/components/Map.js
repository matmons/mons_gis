/**
 * This is the website's main file, which creates the map and manages layers.
 * 
 * To summarize:
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
import NavBar from './NavBar/NavBar'
import constructLayer from './../helpers/constructLayer'
import getCoords from './../helpers/getCoords'
import getDescription from '../helpers/getDescription';

const mapStyle = {
	position: 'absolute',
	top: 0,
	bottom: 0,
	right: 0,
	left: 0,
	zIndex: '-1',
};

const menuStyle = {
	position: 'absolute',
	top: 0,
	right: 0,
	margin: 10,
	padding: 10,
	background: 'rgba(255,255,255,0.7)',
	zIndex: '1',
	display: 'flex',
};

const backgroundLayers = [
	{ id: 'light-v10', name: 'Light' },
	{ id: 'streets-v11', name: 'Streets' },
	{ id: 'dark-v10', name: 'Dark' },
	{ id: 'satellite-v9', name: 'Satellite' },
];

mapboxgl.accessToken = 'pk.eyJ1IjoibW9uc2VtIiwiYSI6ImNraG4yc2syaTBiZ24ydGwxOTg0ZnJiMG0ifQ.B3OT7lkRhmt4w5lTa9fJ2w'

const Map = () => {
	const [map, setMap] = useState(null)
	const [backgroundLayerId, setBackgroundLayerId] = useState('light-v10');
	const [layers, setLayers] = useState([])
	const mapContainer = useRef(null)

	useEffect(() => {
		const initializeMap = ({ setMap, mapContainer }) => {
			const map = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
				center: [10.3856, 63.4292],
				zoom: 12.2
			});
			map.on('load', () => {
				// funker ikke
				map.loadImage('https://cdn4.iconfinder.com/data/icons/social-messaging-productivity-5/128/map-location-person-512.png',
					function (error, image) {
						if (error) throw error;
						map.addImage('marker', image)
					})
				setMap(map);
				map.resize();
			});
		};

		if (!map) initializeMap({ setMap, mapContainer });
		if (map) map.setStyle('mapbox://styles/mapbox/' + backgroundLayerId);
	}, [backgroundLayerId, map]);

	useEffect(() => {
		const updateMap = (map, layers) => {
			layers.filter((l) => !l.addedToMap)
				.forEach((layer) => {
					map.addSource(layer.id, {
						'type': 'geojson',
						'data': layer.data
					});
					map.addLayer(constructLayer(layer))
					layer.addedToMap = true
					if (layer.displayType === 'Point') {
						map.on('click', layer.id, function (e) {
							var coordinates = getCoords(e)
							//e.features[0].geometry.coordinates.slice();
							var description = getDescription(e)
							// Ensure that if the map is zoomed out such that multiple
							// copies of the feature are visible, the popup appears
							// over the copy being pointed to.
							while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
								coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
							}

							new mapboxgl.Popup()
								.setLngLat(coordinates)
								.setHTML(description)
								.addTo(map);
						});

						// Change the cursor to a pointer when the mouse is over the places layer.
						map.on('mouseenter', layer.id, function () {
							map.getCanvas().style.cursor = 'pointer';
						});

						// Change it back to a pointer when it leaves.
						map.on('mouseleave', layer.id, function () {
							map.getCanvas().style.cursor = '';
						});
					}
				})
		}
		if (map && layers) updateMap(map, layers)
	}, [map, layers])

	const addLayerToState = (layer) => {
		setLayers((oldLayers) => [...oldLayers, layer]);
	}
	const removeLayerFromState = (layerId) => {
		map.removeLayer(layerId);
		map.removeSource(layerId);
		setLayers(layers => layers.filter(layer => layer.id !== layerId))
	}
	const changeBackgroundMap = (bgId) => {
		const oldLayers = JSON.parse(JSON.stringify(layers))
		setBackgroundLayerId(bgId);
		oldLayers.forEach(layer => {
			layer.id = (Math.floor(Math.random() * 10000)).toString();
			layer.addedToMap = false
		})
		setLayers(oldLayers)
	}
	const toggleVisibility = (layerId) => {
		const visibility = map.getLayoutProperty(layerId, 'visibility');
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
							type='radio'
							name='rtoggle'
							value={backgroundLayer.id}
							onClick={() => changeBackgroundMap(backgroundLayer.id)}
							defaultChecked={backgroundLayer.id === backgroundLayerId}
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