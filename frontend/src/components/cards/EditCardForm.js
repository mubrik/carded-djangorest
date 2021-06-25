import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { Button, TextField } from "@material-ui/core";
import newCardStyles from "./newCardStyles";
import {useParams, useHistory} from "react-router-dom";
import { Formik  } from "formik";
import { useSnackbar } from "notistack";
import {editCard, selectCardById, selectCardsStatus, fetchCards} from "./cardsSlice";
import {selectAllDecks, selectDecksStatus, fetchDecks} from "../decks/deckSlice";
import DeckCustomSelect from "./CustomDeckSelect";
import NoMatchFound from "../ui/CustomNoMatchFound";
import Skeleton from "@material-ui/lab/Skeleton";

const EditCardPage = () => {
    // react state
    const [pageState, setPageState] = React.useState("load");
    //redux
    const dispatch = useDispatch();
    let cardsStatus  = useSelector(selectCardsStatus);
    let decksStatus  = useSelector(selectDecksStatus);
    // material
    const classes = newCardStyles();
    // use effect for getting cards
    React.useEffect(() => {
        if (cardsStatus === "stale") {
            setPageState("load");
            dispatch(fetchCards());
        } else {
            setPageState("show");
        }
    },[cardsStatus]);
    // effect for decks 
    React.useEffect(() => {
        if (decksStatus === "stale") {
            setPageState("load");
            dispatch(fetchDecks());
        } else {
            setPageState("show");
        }
    },[decksStatus]);

    return(
        <div className={classes.wrapperMain}>
            {pageState === "load" && 
                <Skeleton variant="rect" height={220} animation="wave"/>
            }
            {pageState === "show" && 
                <EditCardForm/>
            }
        </div>
    );
};

const EditCardForm = () => {

    // react-router
    const { id } = useParams();
    const history = useHistory();
    //redux
    const dispatch = useDispatch();
    let cardsStatus  = useSelector(selectCardsStatus);
    const allDecksList = useSelector(selectAllDecks);
    //notification
    const { enqueueSnackbar } = useSnackbar();
    // material
    const classes = newCardStyles();
    // redux store
    let card  = useSelector(state => selectCardById(state, id));
    if (cardsStatus === "updated" && !card) {
        return (
            <>
                <NoMatchFound/>
            </>
        );
    }
    // custom hook
    // formats decklist into a clean array
    let currentCardDeck = [];

    // fills current card deck with decks card is in
    if (card) {
        card.notebook.forEach(deckId => {
            let deck = allDecksList.find((deckobj) => deckId === deckobj.id);
            const {id, name} = deck;
            currentCardDeck.push({id, name});
        });
    }
 
    return(
        <>
            {card &&
                    <>
                        <Formik
                            initialValues={{
                                title: card["title"],
                                content: card["content"],
                                selectedDeck: [],
                            }}
                            onSubmit={
                                (values) => {
                                    // Do stuff here...
                                    const {title, content, selectedDeck: notebook} = values;
                                    /* alert(JSON.stringify(values, null, 3)); */
                                    const requestBody = {
                                        id,
                                        title,
                                        content,
                                        notebook
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
                            }
                        >
                            {formik => (
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
                                    <DeckCustomSelect formik={formik} defaultArr={currentCardDeck}/>
                                    <Button variant="contained" color="secondary" onClick={formik.handleSubmit}>
                                        Update Card
                                    </Button>
                                </form> 
                            )}
                        </Formik>
                    </>
            }
        </>
    );
};

export default EditCardPage;