import React, { useState } from 'react'
import { Row, Button, Modal, Col, Form, Popover, OverlayTrigger } from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa'
import { Buffer, Intersect, Union, Difference } from '../../helpers/operationFunctions'

const OperationModal = ({ operation, layers, addLayer }) => {
    const [layerIds, setLayerIds] = useState({})
    const [parameters, setParameters] = useState({})
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        switch (operation.title) {
            case 'Buffer':
                const buff_l1 = layers.find(layer => layer.id === layerIds[operation.layerList[0]])
                var bufferLayer = Buffer(buff_l1, parameters['Radius'])
                addNewLayer(event, bufferLayer)
                break;
            case 'Intersect':
                const int_l1 = layers.find(layer => layer.id === layerIds[operation.layerList[0]])
                const int_l2 = layers.find(layer => layer.id === layerIds[operation.layerList[1]])
                var intersected = Intersect(int_l1, int_l2)
                addNewLayer(event, intersected)
                break;
            case 'Union':
                const union_l1 = layers.find(layer => layer.id === layerIds[operation.layerList[0]])
                const union_l2 = layers.find(layer => layer.id === layerIds[operation.layerList[1]])
                var unionLayer = Union(union_l1, union_l2)
                addNewLayer(event, unionLayer)
                break;
            case 'Difference':
                const diff_l1 = layers.find(layer => layer.id === layerIds[operation.layerList[0]])
                const diff_l2 = layers.find(layer => layer.id === layerIds[operation.layerList[1]])
                var diffLayer = Difference(diff_l1, diff_l2)
                addNewLayer(event, diffLayer)
                break;
            default:
                alert("Defaulted")
        }
    }
    const addNewLayer = (event, newLayer) => {
        if (newLayer) {
            addLayer(newLayer)
        } else {
            alert("No area to subtract")
        }
        event.preventDefault()
        setLayerIds([])
    }

    return (
        <>
            <Row>
                <Col md={2} />
                <Col md={6} onClick={handleShow}>
                    {operation.title}
                </ Col>
                <Col md={3} onClick={handleShow} />
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{operation.title}
                        <OverlayTrigger
                            trigger="hover"
                            key="right"
                            placement="right"
                            overlay={
                                <Popover>
                                    <Popover.Title as="h3">Help</Popover.Title>
                                    <Popover.Content>
                                        {operation.description}
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <FaInfoCircle style={{ margin: 4 }} />
                        </OverlayTrigger>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {operation.layerList.map((l) => {
                            return (
                                <Form.Group key={l} controlId={l} >
                                    <Form.Label>Select {l}</Form.Label>
                                    <Form.Control as="select" onChange={(e) => setLayerIds((layers) => {
                                        layers[l] = e.target.value
                                        return layerIds
                                    })} required>
                                        <option key="blank" default value={null}>---</option>
                                        {layers.map(layer => (<option key={layer.id} value={layer.id}>{layer.name ? layer.name : layer.id}</option>))}
                                    </Form.Control>
                                </Form.Group>
                            )
                        })}
                        {operation.parameters && Object.entries(operation.parameters).map(([key, value]) => {
                            return (
                                <Form.Group key={key} controlId={key.toString()} >
                                    <Form.Label>{key.toString()}</Form.Label>
                                    <Form.Control type={value} onChange={(e) => setParameters((params) => {
                                        params[key] = e.target.value
                                        return params
                                    })} />
                                </Form.Group>
                            )
                        })}

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

export default OperationModal;