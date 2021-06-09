import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Container, Form } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { Formik, Field, Form as FormikForm } from "formik";
import { useSnackbar } from 'notistack';
import {addNewCard} from './cardsSlice'
import {selectAllDecks} from '../decks/deckSlice'
import MyCustomSelect from '../ui/MyCustomSelect'
import {useCreateDeck} from '../hooks/customHooks'

const AddCardForm = (props) => {

    const dispatch = useDispatch();
    const allDecksList = useSelector(selectAllDecks)

    // custom hook
    const tabledDeck = useCreateDeck(allDecksList)
    // notification
    const { enqueueSnackbar } = useSnackbar();

    const initialValues = {
        title: "",
        content: "",
        selectedDeck: [],
        allDeck: tabledDeck
    }

    function onSubmit(values) {
        // Do stuff here...
        const {title, content, selectedDeck} = values;
        /* alert(JSON.stringify(values, null, 3)); */
        const requestBody = {
            title,
            content,
            notebook: selectedDeck,
        };
        dispatch(addNewCard(requestBody))
        .then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                enqueueSnackbar('Card Created', { 
                    variant: 'success',
                });
            } else {
                enqueueSnackbar('Error creating card', { 
                    variant: 'error',
                });
            }
        })
    }

    return (
        <Formik {...{ initialValues, onSubmit }}>
        {(props) => (
            <>
            <Container fluid>
                <FormikForm className="baseForm" noValidate>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Field
                        type="text"
                        id="cardTitle"
                        className="form-control"
                        name="title"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Text</Form.Label>
                        <Field as="textarea"
                        id="cardContent"
                        className="form-control"
                        name="content"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Deck</Form.Label>
                        <Field 
                        name='selectedDeck'
                        data={props.values.allDeck}
                        component={MyCustomSelect}
                        />
                    </Form.Group>
                    <Button variant="contained" color="secondary" onClick={props.handleSubmit}>
                        New Card
                    </Button>
                </FormikForm>
            </Container>
            </>
        )}
        </Formik>
    );
}

export default AddCardForm;