/**
 * The LayerManager component manages a layer.
 * 
 * Each layer has its own LayerManager.
 * 
 * The component manages:
 *  - Visibility
 *  - Color
 *  - Deletion of layer
 */

import React, { useState } from 'react'
import { Row, Col, OverlayTrigger, Popover } from "react-bootstrap"
import { IconContext } from "react-icons"
import { FaEye, FaEyeSlash, FaTimes, FaCircle } from 'react-icons/fa';
import { CirclePicker } from "react-color"

const LayerManager = ({ map, layer, removeLayer }) => {
    const [localColorIcon, setColor] = useState(layer.color)
    const [localEyeIcon, setEye] = useState("visible")

    const toggleVisibility = (layerId) => {
        const visibility = map.getLayoutProperty(layerId, "visibility");
        if (visibility === 'visible') {
            map.setLayoutProperty(layerId, 'visibility', 'none');
            setEye('none')
        } else {
            map.setLayoutProperty(layerId, 'visibility', 'visible')
            setEye('visible')
        }
    };
    const colorChange = (color, event) => {
        setColor(color.hex)
        layer.color = color.hex
        switch (layer.displayType) {
            case "Line":
                map.setPaintProperty(layer.id, 'line-color', color.hex)
                break;
            case "Polygon":
                map.setPaintProperty(layer.id, "fill-color", color.hex)
                break;
            default:
                map.setPaintProperty(layer.id, "fill-color", color.hex);
                break;
        }
    };
    return (
        <Row>
            <Col md={1} />
            <Col md={2}>{localEyeIcon === 'visible'
                ? <FaEye onClick={() => {
                    toggleVisibility(layer.id);
                }} />
                : <FaEyeSlash onClick={() => {
                    toggleVisibility(layer.id)
                }} />
            }
            </Col>
            <Col md={4} style={{ overflow: 'auto' }}>
                {layer.name ? layer.name : layer.id}
            </Col>
            <OverlayTrigger
                trigger="click"
                key="right"
                placement="right"
                overlay={
                    <Popover>
                        <Popover.Title as="h3">Change layer color</Popover.Title>
                        <Popover.Content>
                            <CirclePicker color={localColorIcon} onChangeComplete={colorChange} />
                        </Popover.Content>
                    </Popover>
                }
            >
                <Col md={2}>
                    <IconContext.Provider value={{ color: localColorIcon }}>
                        <FaCircle />
                    </IconContext.Provider>
                </Col>
            </OverlayTrigger>

            <Col md={2}><FaTimes onClick={() => removeLayer(layer.id)} /></Col>
        </Row>
    )
}

export default LayerManager;
