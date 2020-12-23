/**
 * The LayerManager component manages a layer.
 * 
 * The layer manager renders different information depening on the layer it gets as 
 * input. For example, it checks if a layer is a Point-layer or not, and removes the
 * option to change color if it is. A user is not able to change colors of a Point Layer
 * in Mons GIS, and should therefore not be given a false hope that he/she can.
 * 
 * The component manages:
 *  - Visibility
 *  - Color
 *  - Deletion of layer
 * 
 *  For each layer
 */

import React, { useState } from 'react'
import { Row, Col, OverlayTrigger, Popover, Form, Modal, Button } from "react-bootstrap"
import { IconContext } from "react-icons"
import { FaEye, FaEyeSlash, FaTimes, FaCircle } from 'react-icons/fa';
import { CirclePicker } from "react-color"

const LayerManager = ({ map, layer, removeLayer }) => {
    const [localColorIcon, setColor] = useState(layer.color)
    const [localEyeIcon, setEye] = useState("visible")
    const [layerName, setLayerName] = useState(layer.name)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            case "Point":
                map.setPaintProperty(layer.id, 'icon-color', color.hex)
                break;
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
    const changeName = (name) => {
        setLayerName(name)
        layer.name = name
    }
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
            <Col md={4} style={{ overflow: 'auto' }} onClick={handleShow}>
                {layer.name ? layer.name : layer.id}
            </Col>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Layer Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={e => e.preventDefault()}>
                        <Form.Group key='nameChange' controlId='nameChange' >
                            <Form.Label>New Name</Form.Label>
                            <Form.Control type='string' onChange={(e) => changeName(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={(event) => {
                        event.preventDefault()
                        handleClose()
                    }}>
                        Change Name
                    </Button>
                </Modal.Footer>
            </Modal>
            {layer.displayType === 'Point' ? <Col md={2} /> :
                <OverlayTrigger
                    trigger="click"
                    key="right"
                    rootClose
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
            }
            <Col md={2}><FaTimes onClick={() => removeLayer(layer.id)} /></Col>
        </Row>
    )
}

export default LayerManager;
