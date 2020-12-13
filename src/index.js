import React from 'react';
import ReactDOM from 'react-dom';

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