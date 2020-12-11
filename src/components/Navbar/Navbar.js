import React from 'react'
import { Container, Row, Col } from "react-bootstrap"
import UploadItem from "./UploadItem"
import NavHeader from "./NavHeader"
import LayerItem from "./LayerItem"
import Operations from "./Operations"

const Navbar = ({ map, layers, addLayer, removeLayer }) => {

    return (
        <>
            <Col md={3}>
                <Container className="navContainer">
                    <NavHeader />
                    <Operations layers={layers} addLayer={addLayer} />
                    <LayerItem map={map} layers={layers} removeLayer={removeLayer} />
                    <UploadItem addLayer={addLayer} />
                </Container>
            </Col>
            <Col md={9} />
        </>
    )
}
export default Navbar