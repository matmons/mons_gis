import React, { useState } from 'react'
import { Row, Button, Modal, Col, Form } from 'react-bootstrap'
import intersect from "@turf/intersect"
import getRandomColor from "./../../helpers/getRandomColor"

const IntersectModal = ({ operation, layers, addLayer }) => {
    const [layer1, setLayer1] = useState()
    const [layer2, setLayer2] = useState()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        const l1 = layers.find(layer => layer.id === layer1)
        const l2 = layers.find(layer => layer.id === layer2)

        var intersected = intersect(l1.data, l2.data)
        const newLayer = {
            id: operation + "_" + l1.id + "_" + l2.id,
            data: intersected,
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
                        <Form.Group controlId="layer1" >
                            <Form.Label>Select Layer 1</Form.Label>
                            <Form.Control as="select" onChange={(e) => setLayer1(e.target.value)}>
                                <option key="blank" default value="">---</option>
                                {layers.filter(l => l !== layer2).map(layer => (<option key={layer.id} value={layer.id}>{layer.name ? layer.name : layer.id}</option>))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="layer2" >
                            <Form.Label>Select Layer 2</Form.Label>
                            <Form.Control as="select" onChange={(e) => setLayer2(e.target.value)}>
                                <option key="blank" default value="">---</option>
                                {layers.filter(l => l !== layer1).map(layer => (<option key={layer.id} value={layer.id}>{layer.name ? layer.name : layer.id}</option>))}
                            </Form.Control>
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

export default IntersectModal;