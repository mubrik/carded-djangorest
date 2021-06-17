import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { Button, TextField } from "@material-ui/core";
import newCardStyles from "./newCardStyles";
import {useParams, useHistory} from "react-router-dom";
import { useFormik  } from "formik";
import { useSnackbar } from "notistack";
import {editCard, selectCardById,} from "./cardsSlice";
import {selectAllDecks} from "../decks/deckSlice";
import {useCreateDeck} from "../hooks/customHooks";

const EditCardForm = () => {

    // react-router
    const { id } = useParams();
    const history = useHistory();
    //redux
    const dispatch = useDispatch();
    let card  = useSelector(state => selectCardById(state, id));
    const allDecksList = useSelector(selectAllDecks);
    //notification
    const { enqueueSnackbar } = useSnackbar();
    // material
    const classes = newCardStyles();

    // custom hook
    const tabledDeck = useCreateDeck(allDecksList);

    let currentCardDeck = [];

    card.notebook.forEach(deckId => {
        let deck = allDecksList.find((deckobj) => deckId === deckobj.id);
        const {id: value, name: label} = deck;
        currentCardDeck.push({value, label});
    });

    // formik
    const formik = useFormik({
        initialValues: {
            title: card["title"],
            content: card["content"],
            selectedDeck: currentCardDeck,
            allDeck: tabledDeck,
            formattedDeck:[]
        },
        onSubmit:(values) => {
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
                    if (result.meta.requestStatus === "fulfilled") {
                        enqueueSnackbar("Card Updated", { 
                            variant: "success",
                        });
                        history.goBack();
                    } else {
                        enqueueSnackbar("Error Updating", { 
                            variant: "error",
                        });
                    }
                });
        }
    });

    return(
        <>
            <div className={classes.wrapperMain}>
                <form className={classes.flex} onSubmit={formik.handleSubmit} noValidate>
                    <TextField
                        fullWidth
                        margin={"dense"}
                        name="title"
                        id="cardTitle"
                        label="Title"
                        color="secondary"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField
                        multiline
                        fullWidth
                        margin={"dense"}
                        rows={4}
                        name="content"
                        id="cardContent"
                        label="Content"
                        color="secondary"
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {/* <InputBase 
                        name='selectedDeck'
                        data={formik.values.allDeck}
                        inputComponent={MyCustomSelect}
                    /> */}
                    <Button variant="contained" color="secondary" onClick={formik.handleSubmit}>
                        Update Card
                    </Button>
                </form>
            </div>
        </>
    );
};

export default EditCardForm;