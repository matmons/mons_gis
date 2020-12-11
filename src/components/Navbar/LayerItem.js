import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { RiArrowDropDownLine, RiArrowDropRightLine } from 'react-icons/ri'
import { FaBuffer } from 'react-icons/fa'
import NavLayer from "./NavLayer.js"

const LayerItem = ({ map, layers, removeLayer }) => {
    const [dropdown, toggleDropdown] = useState(false)

    return (
        <>
            <Row >
                <Col md={1}><FaBuffer onClick={() => toggleDropdown(!dropdown)} /></Col>
                <Col md={7} onClick={() => toggleDropdown(!dropdown)}>
                    <h5>Layers</h5>
                </Col>
                <Col md={3}>{dropdown
                    ? <RiArrowDropDownLine size={20} onClick={() => toggleDropdown(!dropdown)} />
                    : <RiArrowDropRightLine size={20} onClick={() => toggleDropdown(!dropdown)} />}
                </Col>
            </Row>
            {
                dropdown && layers.map(layer => (
                    <NavLayer key={layer.id} map={map} layer={layer} removeLayer={removeLayer} />
                ))
            }
        </>
    )
}

export default LayerItem;