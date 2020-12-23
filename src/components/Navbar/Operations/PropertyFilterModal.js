/**
 * This component takes all layers and a funciton for adding a new layer as input.
 * 
 * The layers are used to display available layers for manipulation. The component 
 * utilizes conditional rendinger (conditional display of input fields) baesd on input-
 * values earlier in the form. The idea is to help the user as much as possible in
 * creating the rules desired.
 * 
 * The component should also be (at least) partially resistant to unlogical input data,
 * and has multiple checks for invalid input.
 * 
 * When a form is submitted, the PropertyFilterModal-component utilizes helper-funcitons
 * to create a new layer with the features that match the criterea and adds this new
 * layer to the map.
 */
import React, { useState } from 'react'
import { Row, Button, Modal, Col, Form, Popover, OverlayTrigger } from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa'

import propertyFilter from '../../../helpers/propertyFilter'
import getRandomColor from '../../../helpers/getRandomColor'
import getUniqueValues from '../../../helpers/getUniqueValues'
import getDisplayType from '../../../helpers/getDisplayType'
import isNumber from '../../../helpers/isNumber'

const propertyOperation = {
    id: 100,
    title: 'Property Filter',
    description: "Creates a new layer with features that satisfy the user-defined rules. The allowed operators depend on the data type of the property selected."
}

const operatorMap = {
    'number': ['=', '>=', '<=', '<', '>'],
    'string': ['=']
}

const PropertyFilterModal = ({ lrs, addLayer }) => {
    const [layer, setLayer] = useState()
    const [property, setProperty] = useState()
    const [operator, setOperator] = useState()
    const [value, setValue] = useState()
    const [show, setShow] = useState(false);
    const [propertyValues, setPropertyValues] = useState({})

    const handlePropertyChange = (input) => {
        if (input === '---') {
            setProperty();
        } else {
            const property = input.split(",")[0]
            const value = input.split(",")[1]
            if (isNumber(value)) {
                setProperty([property, 'number'])
            } else {
                setProperty([property, typeof value])
            }
        }
    }
    const handleLayerSelect = (id) => {
        if (id === '---') {
            setLayer();
            setPropertyValues();
        } else {
            const selectedLayer = lrs.find(layer => layer.id === id)
            const uniqueValues = getUniqueValues(selectedLayer)

            setLayer(selectedLayer)
            setPropertyValues(uniqueValues)
        }
    }

    const handleClose = () => {
        setShow(false);
        setLayer();
        setProperty();
        setOperator()
        setValue()
    }
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        if (operator === '---' || !value) {
            handleClose()
            alert('Operator or value is invalid, please start again.')
        } else {
            const filteredFeatureList = propertyFilter(layer.data.features, property[0], operator, value)
            if (filteredFeatureList.length === 0) {
                alert('No features match the defined rules.')
            } else {
                const ffCollection = {
                    type: 'FeatureCollection',
                    features: filteredFeatureList
                }
                const newLayer = {
                    id: layer.name + "_filtered" + (Math.floor(Math.random() * 1000)).toString(),
                    name: layer.name + "_filtered",
                    data: ffCollection,
                    addedToMap: false,
                    color: getRandomColor(),
                    displayType: getDisplayType(ffCollection)
                }
                addLayer(newLayer)
                event.preventDefault()
                setLayer(undefined)
            }
        }

    }

    const valueCondtionalRender = (property) => {
        switch (property[1]) {
            case 'string':
                return (
                    <>
                        <Form.Label>Select Value</Form.Label>
                        <Form.Control as='select' onChange={(e) => setValue(e.target.value)} key="strValue">
                            <option key='blank' default value={undefined}>---</option>
                            {propertyValues[property[0]].map(val => <option key={val} value={val}>{val}</option>)}
                        </Form.Control>
                    </>
                )
            case 'number':
            default:
                return (
                    <>
                        <Form.Label>Select Value</Form.Label>
                        <Form.Control type={property[1]} onChange={(e) => setValue(parseFloat(e.target.value))} key="numValue">
                        </Form.Control>
                    </>
                )
        }
    }

    return (
        <>
            <Row>
                <Col md={2} />
                <Col md={6} onClick={handleShow}>
                    {propertyOperation.title}
                </ Col>
                <Col md={3} onClick={handleShow} />
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{propertyOperation.title}
                        <OverlayTrigger
                            trigger='hover'
                            key='right'
                            placement='right'
                            overlay={
                                <Popover>
                                    <Popover.Title as='h3'>Help</Popover.Title>
                                    <Popover.Content>
                                        {propertyOperation.description}
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
                        <Form.Group key="layer" controlId="layer" >
                            <Form.Label>Select Layer</Form.Label>
                            <Form.Control as='select' onChange={(e) => handleLayerSelect(e.target.value)} required>
                                <option key='blank' default value={null}>---</option>
                                {lrs.map(layer => (<option key={layer.id} value={layer.id}>{layer.name ? layer.name : layer.id}</option>))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="filter" >
                            {layer &&
                                <>
                                    <Form.Label>Select Property</Form.Label>
                                    <Form.Control as='select' onChange={(e) => handlePropertyChange(e.target.value)} key="property" >
                                        <option key='blank' default value={null}>---</option>
                                        {
                                            Object.entries(layer.data.features[0].properties).map(([prop, propType]) => (<option key={prop} value={[prop, propType]}>{prop}</option>))
                                        }
                                    </Form.Control>
                                </>
                            }
                            {layer && property &&
                                <>
                                    <Form.Label>Select Operator</Form.Label>
                                    <Form.Control as='select' onChange={(e) => setOperator(e.target.value)} key="operator" >
                                        <option key='blank' default value={null}>---</option>
                                        {property[1] && operatorMap[property[1]].map(op => (<option key={op} value={op}>{op}</option>))}
                                    </Form.Control>
                                </>
                            }
                            {layer && property && operator && valueCondtionalRender(property)}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' type='submit' onClick={(e) => {
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

export default PropertyFilterModal;