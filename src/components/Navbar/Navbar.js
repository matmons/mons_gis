import React from 'react'
import { Container, Col } from "react-bootstrap"
import Upload from "./Upload/Upload"
import NavHeader from "./NavHeader"
import Layers from "./Layers/Layers"
import Operations from "./Operations/Operations"

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