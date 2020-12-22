import 'bootstrap/dist/css/bootstrap.min.css';
import Map from "./components/Map"
import ErrorBoundary from './ErrorBoundary'

function App() {
	return (
		<div>
			<ErrorBoundary>
				<Map />
			</ErrorBoundary>
		</div>
	);
}

export default App;
