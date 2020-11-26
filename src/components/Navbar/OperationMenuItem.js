import React, { useState } from 'react'
import { Row, Button, Modal, Col, Dropdown, DropdownButton } from 'react-bootstrap'

const layers = [{ id: 1, name: "Arealbruk" }, { id: 2, name: "Vann" }, { id: 3, name: "Vei" }]

const OperationMenuItem = ({ operation }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    <DropdownButton size="sm" title="Select Layer" variant="secondary">
                        {layers.map(layer => (
                            <Dropdown.Item key={layer.id}>{layer.name}</Dropdown.Item>
                        )
                        )}
                    </DropdownButton>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default OperationMenuItem;