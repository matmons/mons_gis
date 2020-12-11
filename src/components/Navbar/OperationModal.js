import React, { useState } from 'react'
import { Row, Button, Modal, Col, Form } from 'react-bootstrap'
import buffer from '@turf/buffer'
import intersect from '@turf/intersect'
import difference from '@turf/difference'
import getRandomColor from '../../helpers/getRandomColor'

const OperationModal = ({ operation, layers, addLayer }) => {
    const [layerIds, setLayerIds] = useState({})
    const [parameters, setParameters] = useState({})
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        console.log(operation.layerList[0])
        switch (operation.title) {
            case 'Buffer':
                const selectedLayer = layers.find(layer => layer.id === layerIds[operation.layerList[0]])
                var buffered = buffer(selectedLayer.data, parameters['Radius'])
                const bufferLayer = {
                    id: operation.title + '_' + (selectedLayer.id).toString(),
                    data: buffered,
                    addedToMap: false,
                    color: getRandomColor()
                }
                addLayer(bufferLayer)
                event.preventDefault()
                setLayerIds([])
                break;
            case 'Intersect':
                const int_l1 = layers.find(layer => layer.id === layerIds[operation.layerList[0]])
                const int_l2 = layers.find(layer => layer.id === layerIds[operation.layerList[1]])
                console.log(int_l1.data.features[0], int_l2.data.features[0])
                var intersected = intersect(int_l1.data.features[0], int_l2.data.features[0])
                const intersectLayer = {
                    id: operation.title + '_' + int_l1.id + '_' + int_l2.id,
                    data: intersected,
                    addedToMap: false,
                    color: getRandomColor()
                }
                if (intersectLayer) {
                    addLayer(intersectLayer)
                } else {
                    alert("No area to intersect")
                }
                event.preventDefault()
                setLayerIds([])
                break;
            case 'Difference':
                const diff_l1 = layers.find(layer => layer.id === layerIds[operation.layerList[0]])
                const diff_l2 = layers.find(layer => layer.id === layerIds[operation.layerList[1]])
                var diff = difference(diff_l1.data.features[0], diff_l2.data.features[0])
                const differenceLayer = {
                    id: operation.title + '_' + diff_l1.id + '_' + diff_l2.id,
                    data: diff,
                    addedToMap: false,
                    color: getRandomColor()
                }
                if (differenceLayer) {
                    addLayer(differenceLayer)
                } else {
                    alert("No area to subtract")
                }
                event.preventDefault()
                setLayerIds([])
                break;
            default:
                alert("Defaulted")
        }
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
                    <Modal.Title>{operation.title}</Modal.Title>
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