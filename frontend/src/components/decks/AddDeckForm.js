import React from 'react';
import {useDispatch, } from 'react-redux'
import {Container, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm } from "formik";
import {addNewDeck} from './deckSlice'


const AddDeckForm = (props) => {

    const dispatch = useDispatch();

    const initialValues = {
        name: "",
    }

    function onSubmit(values) {
        // Do stuff here...
        const {name} = values;
        /* alert(JSON.stringify(values, null, 3)); */
        const requestBody = {
            name
        };
        dispatch(addNewDeck(requestBody))
    }

    return (
        <Formik {...{ initialValues, onSubmit }}>
        {(props) => (
            <>
            <Container fluid>
                <FormikForm className="baseForm" noValidate>
                    <Form.Group>
                        <Form.Label>Deck Name</Form.Label>
                        <Field
                        type="text"
                        id="deckName"
                        className="form-control"
                        name="name"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create Deck
                    </Button>
                </FormikForm>
            </Container>
            </>
        )}
        </Formik>
    );
}

export default AddDeckForm;