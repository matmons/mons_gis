/**
 * The NavBar component is a very simple component that merily decides what subsections
 * that is to be rendered in the side menu.
 * 
 * In addition, the NavBar passes information from map to the child components (such as
 * Operations and Layers).
 */

import React from 'react'
import { Container, Col } from 'react-bootstrap'
import Upload from './Upload/Upload'
import NavHeader from './NavHeader'
import Layers from './Layers/Layers'
import Operations from './Operations/Operations'

const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    background: 'rgba(255,255,255,0.7)',
    color: 'black',
    padding: '1em',
    margin: 10,
    zIndex: '1',
}

const NavBar = ({ map, lrs, addLayer, removeLayer }) => {

    return (
        <>
            <Col md={3}>
                <Container style={navStyle}>
                    <NavHeader />
                    <Operations lrs={lrs} addLayer={addLayer} />
                    <Layers map={map} lrs={lrs} removeLayer={removeLayer} />
                    <Upload addLayer={addLayer} />
                </Container>
            </Col>
        </>
    )
}
export default NavBar