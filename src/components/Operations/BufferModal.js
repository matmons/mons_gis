import React, { useState } from 'react'
import { Row, Button, Modal, Col, Form } from 'react-bootstrap'
import buffer from "@turf/buffer"
import getRandomColor from "./../../helpers/getRandomColor"

const BufferModal = ({ operation, layers, addLayer }) => {
    const [layerId, setLayerId] = useState()
    const [radius, setRadius] = useState()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        const selectedLayer = layers.find(layer => layer.id === layerId)
        console.log(selectedLayer)
        var buffered = buffer(selectedLayer.data, radius)
        const newLayer = {
            id: operation + "_" + (selectedLayer.id).toString(),
            data: buffered,
            addedToMap: false,
            color: getRandomColor()
        }
        addLayer(newLayer)
        event.preventDefault()
    }

    return (
        <>
            <Row>
                <Col md={2} />
                <Col md={6} onClick={handleShow}>
                    {operation}
                </ Col>
                <Col md={3} onClick={handleShow} />
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{operation}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="layer" >
                            <Form.Label>Select Layer</Form.Label>
                            <Form.Control as="select" onChange={(e) => setLayerId(e.target.value)}>
                                <option key="blank" default value="">---</option>
                                {layers.map(layer => (<option key={layer.id} value={layer.id}>{layer.name ? layer.name : layer.id}</option>))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="radius" >
                            <Form.Label>Radius</Form.Label>
                            <Form.Control type="number" placeholder="Kilometers" onChange={(e) => setRadius(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={(e) => {
                        handleSubmit(e);
                        handleClose()
                    }}>
                        Add Layer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BufferModal;