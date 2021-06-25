import React from "react";
import {useDispatch} from "react-redux";
import { Button, TextField } from "@material-ui/core";
import newCardStyles from "./newCardStyles";
import DeckCustomSelect from "./CustomDeckSelect";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import {addNewCard} from "./cardsSlice";

const AddCardForm = () => {

    const dispatch = useDispatch();
    // material
    const classes = newCardStyles();
    // notification
    const { enqueueSnackbar } = useSnackbar();
    // formik
    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
            selectedDeck: [],
        },
        onSubmit:(values) => {
            // Do stuff here...
            const {title, content, selectedDeck: notebook} = values;
            const requestBody = {
                title,
                content,
                notebook,
            };
            if (requestBody.title === "") {
                delete requestBody.title;
            }
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
                        rows={10}
                        name="content"
                        id="cardContent"
                        label="Content"
                        color="secondary"
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <DeckCustomSelect formik={formik}/>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        margin={"dense"}
                        onClick={formik.handleSubmit}
                        disabled={!formik.dirty}
                    >
                        Create Card
                    </Button>
                </form>
            </div>
        </>
    );
};


/* const CustomSelect = ({formik, defaultArr}) => {

    const allDecksList = useSelector(selectAllDecks);
    
    const handleChange = (event, optionArray, reason) => {
        
        switch (reason) {
        case "select-option": {
            let arr = optionArray.map(deck => deck.id);
            formik.setFieldValue("selectedDeck", arr, false);
            break;
        } 
        case "remove-option":{
            let arr = optionArray.map(deck => deck.id);
            formik.setFieldValue("selectedDeck", arr, false);
            break;
        }
        
        case "clear":{
            formik.setFieldValue("selectedDeck", [], false);
            break;
        }
        
        default:
            break;
        }
    };

    return(
        <Autocomplete
            multiple
            freeSolo
            fullWidth
            autoComplete={true}
            margin={"dense"}
            id="tags-filled"
            options={allDecksList}
            defaultValue={defaultArr ? defaultArr : []}
            getOptionLabel={option => option.name}
            renderTags={(deckList, getTagProps) =>
                deckList.map((deck, index) => (
                    <Chip variant="outlined" label={deck.name} key={deck.id} {...getTagProps({ index })} />
                ))
            }
            renderInput={(params) => (
                <TextField {...params} margin={"dense"} label="Select Deck" placeholder="..." />
            )}
            onChange={handleChange}
        />
    );
}; */
export default AddCardForm;