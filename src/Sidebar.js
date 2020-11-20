import React, { useState, useCallback } from "react"
import { ProSidebar, SidebarHeader, SidebarContent, SidebarFooter, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useDropzone } from 'react-dropzone'

import 'react-pro-sidebar/dist/css/styles.css';

function Sidebar() {
    const [collapsed, toggleCollapsed] = useState(true)

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
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
                    <SubMenu title="Upload">
                        <MenuItem>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <p>Drop the files here ...</p> :
                                        <p>Drag 'n' drop some files here, or click to select files</p>
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