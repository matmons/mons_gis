import React from 'react'
import { FaGlobeAmericas } from "react-icons/fa"
import { Container, Row, Col } from "react-bootstrap"
import Menu from "./Menu"

const operationList = ["Buffer", "Intersect", "Union"]
const menuTest = { name: "Operations", subItems: operationList, icon: "tools" }
const Navbar = () => {
    return (
        <>
            <Col md={3}>
                <Container className="navContainer">
                    <Row className="strictRow">
                        <Col md={2} >
                            <FaGlobeAmericas size="2em" />
                        </Col>
                        <Col md={8}>
                            <h2> Mons GIS </h2>
                        </Col>
                        <Col md={2} />
                    </Row>
                    <Menu item={menuTest} />
                    <Row>Layers</Row>
                    <Row>Upload</Row>
                </Container>
            </Col>
            <Col md={9} />
        </>
    )
}
export default Navbar