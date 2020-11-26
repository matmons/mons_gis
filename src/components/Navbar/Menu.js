import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { RiArrowDropDownLine, RiArrowDropRightLine } from 'react-icons/ri'
import OperationMenuItem from "./OperationMenuItem"

const Menu = ({ item }) => {
    const [dropdown, toggleDropdown] = useState(false)
    return (
        <>
            <Row >
                <Col md={8} onClick={() => toggleDropdown(!dropdown)}>
                    <h4>{item.name}</h4>
                </Col>
                <Col md={3}>{dropdown
                    ? <RiArrowDropDownLine size="2 em" onClick={() => toggleDropdown(!dropdown)} />
                    : <RiArrowDropRightLine size="2 em" onClick={() => toggleDropdown(!dropdown)} />}
                </Col>
            </Row>
            {
                dropdown && item.subItems.map(subItem => (
                    <OperationMenuItem id={subItem} operation={subItem} />
                ))
            }
        </>
    )
}

export default Menu