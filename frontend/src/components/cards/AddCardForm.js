import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { Button, TextField } from "@material-ui/core";
import newCardStyles from "./newCardStyles";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import {addNewCard} from "./cardsSlice";
import {selectAllDecks} from "../decks/deckSlice";
import {useCreateDeck} from "../hooks/customHooks";

const AddCardForm = () => {

    const dispatch = useDispatch();
    const allDecksList = useSelector(selectAllDecks);
    // material
    const classes = newCardStyles();
    // custom hook
    const tabledDeck = useCreateDeck(allDecksList);
    // notification
    const { enqueueSnackbar } = useSnackbar();
    // formik
    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
            selectedDeck: [],
            allDeck: tabledDeck
        },
        onSubmit:(values) => {
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
                    if (result.meta.requestStatus === "fulfilled") {
                        enqueueSnackbar("Card Created", { 
                            variant: "success",
                        });
                    } else {
                        enqueueSnackbar("Error creating card", { 
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
                        rows={3}
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
                        New Card
                    </Button>
                </form>
            </div>
        </>
    );
};

export default AddCardForm;