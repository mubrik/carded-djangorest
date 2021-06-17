import React from "react";
import {useDispatch, } from "react-redux";
import {Container, Button, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm } from "formik";
import { useSnackbar } from "notistack";
import {addNewDeck} from "./deckSlice";


const AddDeckForm = () => {
    // redux
    const dispatch = useDispatch();
    // notification
    const { enqueueSnackbar } = useSnackbar();

    const initialValues = {
        name: "",
    };

    function onSubmit(values) {
        // Do stuff here...
        const {name} = values;
        /* alert(JSON.stringify(values, null, 3)); */
        const requestBody = {
            name
        };
        dispatch(addNewDeck(requestBody))
            .then((result) => {
                if (result.meta.requestStatus === "fulfilled") {
                    enqueueSnackbar("Deck Created", { 
                        variant: "success",
                    });
                } else {
                    enqueueSnackbar("Error creating deck", { 
                        variant: "error",
                    });
                }
            });
    }

    return (
        <Formik {...{ initialValues, onSubmit }}>
            {() => (
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
};

export default AddDeckForm;