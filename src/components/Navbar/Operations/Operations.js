/**
 * A simple component for listing all operations Mons GIS supports.
 * 
 * This component manages the dropdown of operations visible to the user, and passes
 * information further down the component-tree.
 * 
 * [Very similar to Layers.js]
 */

import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { RiArrowDropDownLine, RiArrowDropRightLine } from 'react-icons/ri'
import { FaTools } from 'react-icons/fa'

import OperationModal from './OperationModal'
import PropertyFilterModal from './PropertyFilterModal'
import OperationList from '../../../helpers/OperationList'

const Operations = ({ lrs, addLayer }) => {
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
                    <OperationModal key={op.id} operation={op} lrs={lrs} addLayer={addLayer} />
                ))
            }
            {dropdown && <PropertyFilterModal lrs={lrs} addLayer={addLayer} />}
        </>
    )
}

export default Operations