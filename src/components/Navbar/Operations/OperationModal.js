/**
 * This component takes an operation, all layers and a funciton for adding a new layer
 * as input.
 * 
 * The operation is one of those in OperationList. The OperationModal-component uses 
 * this information to decide what to display in the modal.
 * 
 * The layers are used to display available layers for manipulation. Not all layers are
 * valid for all operations, therefor this component benefits an function (useEfffect)
 * that removes invalid layers from this operation.
 * 
 * The component should also be (at least) partially resistant to unlogical input data,
 * and has multiple checks for invalid input.
 * 
 * When a form is submitted, this component manipulates/transformes the layer to a new 
 * layer through the help of the switch funciton(handleSubmit). handleSubmit also adds
 * the new transformed layer to the map.
 */
import React, { useState, useEffect } from 'react'
import { Row, Button, Modal, Col, Form, Popover, OverlayTrigger } from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa'
import { Buffer, Intersect, Union, Difference, Clustering } from '../../../helpers/operationFunctions'

const OperationModal = ({ operation, lrs, addLayer }) => {
    const [layerIds, setLayerIds] = useState({})
    const [parameters, setParameters] = useState({})
    const [show, setShow] = useState(false);
    const [validLayers, setValidLayers] = useState(lrs)

    useEffect(() => {
        switch (operation.title) {
            case 'Buffer':
            default:
                setValidLayers(lrs)
                break;
            case 'Intersect':
                setValidLayers(lrs.filter(layer => layer.displayType === 'Polygon'))
                break;
            case 'Union':
                setValidLayers(lrs.filter(layer => layer.displayType === 'Polygon'))
                break;
            case 'Difference':
                setValidLayers(lrs.filter(layer => layer.displayType === 'Polygon'))
                break;
            case 'Clustering':
                setValidLayers(lrs.filter(layer => layer.displayType === 'Point'))
                break;
        }
    }, [operation, lrs])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        if (Object.values(layerIds).filter(layer => layer === '---').length > 0) {
            alert('Invalid layer selection')
        } else {
            switch (operation.title) {
                case 'Buffer':
                    const buff_l1 = lrs.find(layer => layer.id === layerIds[operation.layerList[0]])
                    var bufferLayer = Buffer(buff_l1, parameters['Radius'])
                    addNewLayer(event, bufferLayer)
                    break;
                case 'Intersect':
                    const int_l1 = lrs.find(layer => layer.id === layerIds[operation.layerList[0]])
                    const int_l2 = lrs.find(layer => layer.id === layerIds[operation.layerList[1]])
                    var intersected = Intersect(int_l1, int_l2)
                    addNewLayer(event, intersected)
                    break;
                case 'Union':
                    const union_l1 = lrs.find(layer => layer.id === layerIds[operation.layerList[0]])
                    const union_l2 = lrs.find(layer => layer.id === layerIds[operation.layerList[1]])
                    var unionLayer = Union(union_l1, union_l2)
                    addNewLayer(event, unionLayer)
                    break;
                case 'Difference':
                    const diff_l1 = lrs.find(layer => layer.id === layerIds[operation.layerList[0]])
                    const diff_l2 = lrs.find(layer => layer.id === layerIds[operation.layerList[1]])
                    var diffLayer = Difference(diff_l1, diff_l2)
                    addNewLayer(event, diffLayer)
                    break;
                case 'Clustering':
                    const cluster_l1 = lrs.find(layer => layer.id === layerIds[operation.layerList[0]])
                    var clusterLayer = Clustering(cluster_l1, parameters['Number of Clusters'])
                    addNewLayer(event, clusterLayer)
                    break;
                default:
                    alert("Defaulted")
                    break;
            }
        }
    }
    const addNewLayer = (event, newLayer) => {
        if (newLayer) {
            addLayer(newLayer)
        } else {
            alert("No resulting area")
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
                    <Form onSubmit={e => e.preventDefault()}>
                        {operation.layerList.map((l) => {
                            return (
                                <Form.Group key={l} controlId={l} >
                                    <Form.Label>Select {l}</Form.Label>
                                    <Form.Control as="select" onChange={(e) => setLayerIds((layers) => {
                                        layers[l] = e.target.value
                                        return layerIds
                                    })} required>
                                        <option key="blank" default value={null}>---</option>
                                        {validLayers.map(layer => (<option key={layer.id} value={layer.id}>{layer.name ? layer.name : layer.id}</option>))}
                                    </Form.Control>
                                </Form.Group>
                            )
                        })}
                        {operation.parameters && Object.entries(operation.parameters).map(([key, value]) => {
                            return (
                                <Form.Group key={key} controlId={key.toString()} >
                                    <Form.Label>{key.toString()}</Form.Label>
                                    <Form.Control type={value} onChange={(e) => setParameters((params) => {
                                        params[key] = e.target.value;
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