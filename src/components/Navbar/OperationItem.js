import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { RiArrowDropDownLine, RiArrowDropRightLine } from 'react-icons/ri'
import { FaTools } from 'react-icons/fa'
import OperationMenuItem from "./OperationMenuItem"

const OperationItem = ({ item }) => {
    const [dropdown, toggleDropdown] = useState(false)

    return (
        <>
            <Row >
                <Col md={1}><FaTools /></Col>
                <Col md={7} onClick={() => toggleDropdown(!dropdown)}>
                    <h5>{item.name}</h5>
                </Col>
                <Col md={3}>{dropdown
                    ? <RiArrowDropDownLine size={20} onClick={() => toggleDropdown(!dropdown)} />
                    : <RiArrowDropRightLine size={20} onClick={() => toggleDropdown(!dropdown)} />}
                </Col>
            </Row>
            {
                dropdown && item.subItems.map(subItem => (
                    <OperationMenuItem key={subItem} operation={subItem} />
                ))
            }
        </>
    )
}

export default OperationItem