import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

import App from "./App"

class Application extends React.Component {
	render() {
		return (
			<div>
				<App />
			</div>
		)
	}
}

ReactDOM.render(<Application />, document.getElementById('app'));

// import React from 'react';
// import ReactDOM from 'react-dom';
// import mapboxgl from 'mapbox-gl';

// mapboxgl.accessToken = 'pk.eyJ1IjoibW9uc2VtIiwiYSI6ImNraG4yc2syaTBiZ24ydGwxOTg0ZnJiMG0ifQ.B3OT7lkRhmt4w5lTa9fJ2w';

// class Application extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			lng: 10.3856,
// 			lat: 63.4292,
// 			zoom: 12.2
// 		};
// 	}

// 	componentDidMount() {
// 		const map = new mapboxgl.Map({
// 			container: this.mapContainer,
// 			style: 'mapbox://styles/mapbox/streets-v11',
// 			center: [this.state.lng, this.state.lat],
// 			zoom: this.state.zoom
// 		});

// 		map.on('move', () => {
// 			this.setState({
// 				lng: map.getCenter().lng.toFixed(4),
// 				lat: map.getCenter().lat.toFixed(4),
// 				zoom: map.getZoom().toFixed(2)
// 			});
// 		});
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<div className='sidebarStyle'>
// 					<div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
// 				</div>
// 				<div ref={el => this.mapContainer = el} className='mapContainer' />
// 			</div>
// 		)
// 	}
// }

// ReactDOM.render(<Application />, document.getElementById('app'));