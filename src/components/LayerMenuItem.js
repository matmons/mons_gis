import React from 'react'
import { Col, } from "react-bootstrap"

const LayerMenuItem = ({ layer, removeLayer, toggleVisibility }) => {
    return (
        <>
            <Col md={2}><i class="fas fa-eye" onClick={() => toggleVisibility(layer.id)} /></Col>
            <Col md={6}>{layer.id}</Col>
            <Col md={2}>{layer.color}</Col>
            <Col md={2}><i class="fas fa-times" onClick={() => removeLayer(layer.id)} /></Col>
        </>
    )
}

export default LayerMenuItem;
