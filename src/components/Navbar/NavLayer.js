import React from 'react'
import { Row, Col } from "react-bootstrap"
import { FaEye, FaTimes } from 'react-icons/fa';

const LayerMenuItem = ({ layer, removeLayer, toggleVisibility }) => {
    console.log("LMI", layer)
    return (
        <Row>
            <Col md={2} />
            <Col md={2}><FaEye onClick={() => toggleVisibility(layer.id)} /></Col>
            <Col md={3}>{layer.id}</Col>
            <Col md={3}>{layer.color}</Col>
            <Col md={2}><FaTimes onClick={() => removeLayer(layer.id)} /></Col>
        </Row>
    )
}

export default LayerMenuItem;
