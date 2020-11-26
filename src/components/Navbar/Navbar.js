import React from 'react'
import { Container, Row, Col } from "react-bootstrap"
import OperationItem from "./OperationItem"
import UploadItem from "./UploadItem"
import NavHeader from "./NavHeader"
import LayerItem from "./LayerItem"

const operationList = ["Buffer", "Intersect", "Union"]
const menuTest = { name: "Operations", subItems: operationList, icon: "tools" }
const Navbar = ({ layers, addLayer, removeLayer, toggleVisibility }) => {

    return (
        <>
            <Col md={3}>
                <Container className="navContainer">
                    <NavHeader />
                    <OperationItem item={menuTest} />
                    <LayerItem layers={layers} removeLayer={removeLayer} toggleVisibility={toggleVisibility} />
                    <UploadItem addLayer={addLayer} />
                </Container>
            </Col>
            <Col md={9} />
        </>
    )
}
export default Navbar