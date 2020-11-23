import React, { useState, useCallback } from "react"
import { ProSidebar, SidebarHeader, SidebarContent, SidebarFooter, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useDropzone } from 'react-dropzone'

import 'react-pro-sidebar/dist/css/styles.css';

const Sidebar = ({ layers, addLayer }) => {
	const [collapsed, toggleCollapsed] = useState(true)
	const convertJSONToLayer = (jsonString) => {
		const GeoJSON = JSON.parse(jsonString);
		const newLayer = {
			name: GeoJSON.name,
			data: GeoJSON,
			visible: true
		}
		addLayer(newLayer);
	}

	const onDrop = useCallback((file) => {
		const reader = new FileReader()

		reader.onabort = () => console.log('Reading was aborted')
		reader.onerror = () => console.log('Reading has failed')

		reader.onload = function () {
			convertJSONToLayer(reader.result)
		}
		reader.readAsText(file[0])

	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
	return (
		<ProSidebar collapsed={collapsed} onMouseOver={() => toggleCollapsed(false)}>
			<SidebarHeader>GIS</SidebarHeader>
			<SidebarContent>
				<Menu>
					<SubMenu title="Operations" >
						<MenuItem>Buffer</MenuItem>
						<MenuItem>Split</MenuItem>
						<MenuItem>Union</MenuItem>
						<MenuItem>Overlay</MenuItem>
						<MenuItem>Intersect</MenuItem>
					</SubMenu>
					<SubMenu title="Visualizations" >
						<MenuItem>Heatmap</MenuItem>
						<MenuItem>Kepler</MenuItem>
						<MenuItem>Other</MenuItem>
					</SubMenu>
					<SubMenu title="Active layers" >
						{layers.length ?
							layers.map((layer) =>
								(<MenuItem key={layer.name}>{layer.name}</MenuItem>))
							:
							<MenuItem>No layers</MenuItem>
						}
					</SubMenu>
					<SubMenu title="Upload">
						<MenuItem>
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								{
									isDragActive ?
										<p>Drop the files here ...</p> :
										<p>Click to upload or drag</p>
								}
							</div>
						</MenuItem>
					</SubMenu>
				</Menu>
			</SidebarContent>
			<SidebarFooter>Made by an idiot</SidebarFooter>
		</ProSidebar>
	)
}
export default Sidebar
