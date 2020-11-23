import React from 'react'
import { Row, Col, } from "react-bootstrap"

const LayerMenuItem = ({ layer }) => {
    return (
        <Row strict>
            <Col md={2}><i class="fas fa-eye"></i></Col>
            <Col md={7}>{layer.id}</Col>
            <Col md={2}>{layer.color}</Col>
            <Col md={2}><i class="fas fa-times"></i>Delete Layer</Col>
        </Row>
    )
}

export default LayerMenuItem;
