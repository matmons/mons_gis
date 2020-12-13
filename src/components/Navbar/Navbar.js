import React from 'react'
import { Container, Col } from "react-bootstrap"
import UploadItem from "./UploadItem"
import NavHeader from "./NavHeader"
import LayerItem from "./LayerItem"
import Operations from "./Operations"

const navStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    background: "white",
    color: "black",
    padding: "1em",
    margin: 10,
    zIndex: "1",
}

const Navbar = ({ map, layers, addLayer, removeLayer }) => {

    return (
        <>
            <Col md={3}>
                <Container style={navStyle}>
                    <NavHeader />
                    <Operations layers={layers} addLayer={addLayer} />
                    <LayerItem map={map} layers={layers} removeLayer={removeLayer} />
                    <UploadItem addLayer={addLayer} />
                </Container>
            </Col>
        </>
    )
}
export default Navbar