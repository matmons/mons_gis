import React, { useState, useCallback } from 'react'
import { FaUpload } from "react-icons/fa"
import { Row, Col, Modal, Button } from "react-bootstrap"
import { useDropzone } from "react-dropzone"

import getRandomColor from "./../../helpers/getRandomColor"

const UploadItem = ({ addLayer }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const convertJSONToLayer = (jsonString) => {
        const GeoJSON = JSON.parse(jsonString);
        const newLayer = {
            id: GeoJSON.name ? GeoJSON.name : (Math.floor(Math.random() * 1000)).toString(),
            data: GeoJSON,
            addedToMap: false,
            color: getRandomColor()
        }
        console.log(newLayer)
        addLayer(newLayer);
    }

    const onDrop = useCallback((file) => {
        const reader = new FileReader()

        reader.onabort = () => console.log('Reading was aborted')
        reader.onerror = () => console.log('Reading has failed')

        reader.onload = function () {
            convertJSONToLayer(reader.result)
        }
        reader.readAsText(file[0])

    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <>
            <Row>
                <Col md={1}><FaUpload onClick={() => handleShow()} /></Col>
                <Col md={7} onClick={() => handleShow()}>
                    <h5>Upload</h5>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <p>Drop the files here ...</p> :
                                <p>Drag & drop files here or click to select files</p>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default UploadItem