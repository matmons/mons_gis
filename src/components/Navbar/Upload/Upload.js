/**
 * The input of the Upload component takes a function for adding a new layer.
 * The main funcitonality of the upload component is to dispay a modal where the user 
 * can click or drag'n'drop files. 
 * 
 * The file type is check and this component adds the file contents to the map as a 
 * layer.
 * 
 * Necessary utility functionality includes the conversion from "json -> layer" and from
 * "shapefile -> json -> layer".
 */

import React, { useState, useCallback } from 'react'
import { FaUpload, FaInfoCircle } from 'react-icons/fa'
import { Row, Col, Modal, Button, Popover, OverlayTrigger } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import shp from 'shpjs'

import getRandomColor from '../../../helpers/getRandomColor'
import getDisplayType from '../../../helpers/getDisplayType'

const uploadHelp = "Please upload a single file at a time. This application supports geojson and zipped shapefiles."

const Upload = ({ addLayer }) => {
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
            color: getRandomColor(),
            displayType: getDisplayType(GeoJSON)
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
                            id: (Math.floor(Math.random() * 10000)).toString(),
                            name: fileName[0],
                            data: json,
                            addedToMap: false,
                            color: getRandomColor(),
                            displayType: getDisplayType(json)
                        }
                        addLayer(newLayer);
                    })

                }
                reader.readAsArrayBuffer(file)
                break;
            default:
                alert('Mons GIS only supports files of type geojson or zipped shapefile')
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
                    <Modal.Title>Upload
                        <OverlayTrigger
                            trigger="hover"
                            key="right"
                            placement="right"
                            overlay={
                                <Popover>
                                    <Popover.Title as="h3">Help</Popover.Title>
                                    <Popover.Content>
                                        {uploadHelp}
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <FaInfoCircle style={{ margin: 4 }} />
                        </OverlayTrigger>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <p style={{ borderStyle: 'dotted' }}>Drop the file here ...</p> :
                                <p style={{ textDecorationLine: 'underline' }}>Drag & drop a file here or click to select file</p>
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
export default Upload