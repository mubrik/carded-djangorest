import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Container, Form } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import {useParams, useHistory} from "react-router-dom"
import { Formik, Field, Form as FormikForm  } from "formik";
import { useSnackbar } from 'notistack';
import {editCard, selectCardById,} from './cardsSlice'
import {selectAllDecks} from '../decks/deckSlice'
import MyCustomSelect from '../ui/MyCustomSelect'
import {useCreateDeck} from '../hooks/customHooks'

const EditCardForm = (props) => {

    // react-router
    const { id } = useParams();
    const history = useHistory();
    //redux
    const dispatch = useDispatch();
    let card  = useSelector(state => selectCardById(state, id))
    const allDecksList = useSelector(selectAllDecks)
    //notification
    const { enqueueSnackbar } = useSnackbar();

    // custom hook
    const tabledDeck = useCreateDeck(allDecksList)

    let currentCardDeck = [];

    card.notebook.forEach(deckId => {
        let deck = allDecksList.find((deckobj) => deckId === deckobj.id)
        const {id: value, name: label} = deck
        currentCardDeck.push({value, label})
    })

    const initialValues = {
        title: card['title'],
        content: card['content'],
        selectedDeck: currentCardDeck,
        allDeck: tabledDeck,
        formattedDeck:[]
    }


    function onSubmit(values) {
        // Do stuff here...
        const {title, content, formattedDeck} = values;
        /* alert(JSON.stringify(values, null, 3)); */
        const requestBody = {
            id,
            title,
            content,
            notebook: formattedDeck,
        };
        dispatch(editCard({id, requestBody}))
        .then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                enqueueSnackbar('Card Updated', { 
                    variant: 'success',
                });
                history.goBack()
            } else {
                enqueueSnackbar('Error Updating', { 
                    variant: 'error',
                });
            }
        })
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                        name='formattedDeck'
                        selected={props.values.selectedDeck}
                        data={props.values.allDeck}
                        component={MyCustomSelect}
                        />
                    </Form.Group>
                    <Button variant="contained" color="secondary" onClick={props.handleSubmit}>
                        Update Card
                    </Button>
                </FormikForm>
            </Container>
            </>
        )}
        </Formik>
    );
}

export default EditCardForm;