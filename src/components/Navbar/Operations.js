import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { RiArrowDropDownLine, RiArrowDropRightLine } from 'react-icons/ri'
import { FaTools } from 'react-icons/fa'

import OperationModal from './OperationModal'
import PropertyFilterModal from './PropertyFilterModal'
import OperationList from '../../helpers/OperationList'

const Operations = ({ layers, addLayer }) => {
    const [dropdown, toggleDropdown] = useState(false)
    return (
        <>
            <Row >
                <Col md={1}><FaTools /></Col>
                <Col md={7} onClick={() => toggleDropdown(!dropdown)}>
                    <h5>Operations</h5>
                </Col>
                <Col md={3}>{dropdown
                    ? <RiArrowDropDownLine size={20} onClick={() => toggleDropdown(!dropdown)} />
                    : <RiArrowDropRightLine size={20} onClick={() => toggleDropdown(!dropdown)} />}
                </Col>
            </Row>
            {
                dropdown && OperationList.map(op => (
                    <OperationModal key={op.id} operation={op} layers={layers} addLayer={addLayer} />
                ))
            }
            {dropdown && <PropertyFilterModal layers={layers} addLayer={addLayer} />}
        </>
    )
}

export default Operations