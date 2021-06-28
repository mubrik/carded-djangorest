import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import SvgIcon from "@material-ui/core/SvgIcon";
import GoogleLogo from "./GoogleLogo.svg";

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
    );
};

const getArrayDifference = (arrayA, arrayB) => {
    let _difference = new Set(arrayA);
    for (let elem of arrayB) {
        _difference.delete(elem);
    }
    return [..._difference];
};

const getArrayIntersection = (arrayA, arrayB) => {
    let _intersection = [];
    for (let elem of arrayB) {
        if (arrayA.includes(elem)) {
            _intersection.push(elem);
        }
    }
    return _intersection;
};

export { InputFormLayout, 
    getArrayDifference, getArrayIntersection
};

export function toParams(query) {
    const q = query.replace(/^\??\//, "");
  
    return q.split("&").reduce((values, param) => {
        const [key, value] = param.split("=");
  
        values[key] = value;
  
        return values;
    }, {});
}
  
export function toQuery(params, delimiter = "&") {
    const keys = Object.keys(params);
  
    return keys.reduce((str, key, index) => {
        let query = `${str}${key}=${params[key]}`;
  
        if (index < (keys.length - 1)) {
            query += delimiter;
        }
  
        return query;
    }, "");
}

export function GoogleIcon() {
    return (
        <SvgIcon component={GoogleLogo} viewBox={"0 0 24 24"}/>
    );
}