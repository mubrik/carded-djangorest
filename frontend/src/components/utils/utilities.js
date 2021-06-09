import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const InputFormLayout = (props) => {


    return (
        <Container fluid>
            <Row fluid="true">
                <Col>
                    {props.input}
                </Col>
                <Col xs="auto" xl="auto" lg="auto">
                    {props.options}
                </Col>
            </Row>
        </Container>
    )
}

const getArrayDifference = (arrayA, arrayB) => {
    let _difference = new Set(arrayA)
    for (let elem of arrayB) {
        _difference.delete(elem)
    }
    return [..._difference]
}

const getArrayIntersection = (arrayA, arrayB) => {
    let _intersection = []
    for (let elem of arrayB) {
        if (arrayA.includes(elem)) {
            _intersection.push(elem)
        }
    }
    return _intersection
}

export { InputFormLayout, 
    getArrayDifference, getArrayIntersection
};