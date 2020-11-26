import React, { useState } from 'react'
import { Row, Button, Modal, Col, Dropdown, DropdownButton, Form } from 'react-bootstrap'

const layers = [{ id: 1, name: "Arealbruk" }, { id: 2, name: "Vann" }, { id: 3, name: "Vei" }]

const OperationMenuItem = ({ operation }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        alert("Form was submitted")
        console.log(event.target.value)
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
                    {/* <DropdownButton size="sm" title="Select Layer" variant="secondary">
                        {layers.map(layer => (
                            <Dropdown.Item key={layer.id}>{layer.name}</Dropdown.Item>
                        )
                        )}
                    </DropdownButton> */}
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group controlId="lay">
                            <Form.Label>Select Layer</Form.Label>
                            <Form.Control as="select">
                                {layers.map(layer => (<option key={layer.id}>{layer.name}</option>))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="radius">
                            <Form.Label>Radius</Form.Label>
                            <Form.Control placeholder="Kilometers" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={(e) => {
                        handleClose();
                        handleSubmit(e)
                    }}>
                        Add Layer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default OperationMenuItem;