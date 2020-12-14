import React, { useState, useCallback } from 'react'
import { FaUpload } from "react-icons/fa"
import { Row, Col, Modal, Button } from "react-bootstrap"
import { useDropzone } from "react-dropzone"
import shp from 'shpjs'

import getRandomColor from "./../../helpers/getRandomColor"

const UploadItem = ({ addLayer }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const convertJSONToLayer = (jsonString, filename) => {
        const GeoJSON = JSON.parse(jsonString);
        const newLayer = {
            id: (Math.floor(Math.random() * 1000)).toString(),
            name: filename,
            data: GeoJSON,
            addedToMap: false,
            color: getRandomColor()
        }
        addLayer(newLayer);
    }

    const onDrop = useCallback((allFiles) => {
        const file = allFiles[0]
        const fileName = file.name.split('.')

        const reader = new FileReader()

        reader.onabort = () => console.log('Reading was aborted')
        reader.onerror = () => console.log('Reading has failed')
        switch (fileName[1]) {
            case 'geojson':
                reader.onload = function () {
                    convertJSONToLayer(reader.result, fileName[0])
                }
                reader.readAsText(file)
                break;
            case 'zip':
                reader.onload = function () {
                    shp(reader.result).then(function (json) {
                        const newLayer = {
                            id: (Math.floor(Math.random() * 1000)).toString(),
                            name: fileName[0],
                            data: json,
                            addedToMap: false,
                            color: getRandomColor()
                        }
                        addLayer(newLayer);
                    })

                }
                reader.readAsArrayBuffer(file)
                break;
            default:
                alert("Mons GIS only supports files of type geojson or zipped shapefile")
        }

    })

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