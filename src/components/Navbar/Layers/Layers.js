/**
 * A simple component for listing all layers currently added to the map.
 * 
 * This component manages the dropdown of layers visible to the user, and passes
 * information further down the component-tree.
 * 
 * [Very similar to Operaitons.js]
 */

import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { RiArrowDropDownLine, RiArrowDropRightLine } from 'react-icons/ri'
import { FaBuffer } from 'react-icons/fa'
import LayerManager from "./LayerManager.js"

const Layers = ({ map, lrs, removeLayer }) => {
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
                dropdown && lrs.map(layer => (
                    <LayerManager key={layer.id} map={map} layer={layer} removeLayer={removeLayer} />
                ))
            }
        </>
    )
}

export default Layers;