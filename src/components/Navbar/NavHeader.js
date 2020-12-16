/**
 * The Globe and Mons GIS header of the navigation bar.
 */

import React from 'react'
import { FaGlobeAmericas, } from "react-icons/fa"
import { Row, Col } from "react-bootstrap"

const NavHeader = () => {
    return (
        <>
            <Row className="strictRow">
                <Col md={2} >
                    <FaGlobeAmericas size={32} />
                </Col>
                <Col md={8}>
                    <h2> Mons GIS </h2>
                </Col>
                <Col md={2} />
            </Row>
        </>
    )
}
export default NavHeader