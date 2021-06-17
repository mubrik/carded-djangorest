import React from "react";
import {useSelector} from "react-redux";
import { makeStyles} from "@material-ui/core/styles";
import {ListGroup} from "react-bootstrap";
import {selectActiveDeck} from "../decks/deckSlice";

const useStyles = makeStyles((theme) => ({
    wrapperMain: {
        padding: "0.4em 1em",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        borderRadius: ".4em"
    },
    innerForm: {
        padding: "0.4em 0.4em",
        border: `0.5px solid ${theme.palette.secondary.dark}`,
        borderRadius: ".5em",
        marginBottom: theme.spacing(2)
    },
    Decks: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
    },
    innerDecks: {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        alignItems: "flex-start",
        gap: "1em",
        [theme.breakpoints.between("100", "500")]: {
            gridTemplateColumns: "none",
            gridTemplateRows: "auto"
        },
    },
    innerListForm: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.palette.secondary.light}`,
        borderRadius: ".8em",
        [theme.breakpoints.between("100", "500")]: {
            maxHeight: "200px"
        },
    },
    innerCards: {
        display: "flex",
        flexWrap: "wrap",
    },
    deckList: {
        display: "flex",
        flexWrap: "wrap",
        marginBottom: theme.spacing(2),
    },
    formContainer: {
        width: "100%",
        marginRight: "auto",
        marginLeft: "auto",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "flex-start",
        gap: "1em"
    },
}));

const MainBodyLayout = (props) => {
    // material classes
    const classes = useStyles();
    // decks
    const deck = props.deck;
    // deckform
    const deckForm = props.deckForm;
    // cards
    const cards = props.cards;
    // search
    const search = props.search;
    // selected deck
    const selectedDeckId = useSelector(selectActiveDeck);

    return(
        <div className={classes.wrapperMain}>
            <div className={classes.innerForm}>
                {props.input}
            </div>
            {cards && 
            <div className={classes.innerCards}>
                {props.body}
            </div>
            }
            {search && 
            <div className={classes.innerCards}>
                {props.searchBody}
            </div>
            }
            { deck &&
            <div className={classes.Decks}>
                <ListGroup horizontal className={classes.deckList}>
                    {props.deckList}
                </ListGroup>
                <div className={classes.innerDecks}>
                    {selectedDeckId && 
                        <div className={classes.innerListForm}>
                            {deckForm}
                        </div>
                    }
                    <div className={classes.innerCards}>
                        {props.decks}
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

const InputFormLayout = (props) => {
    // material classes
    const classes = useStyles();

    return (
        <div className={classes.formContainer}>
            <div className={classes.inputContainer}>
                {props.input}
            </div>
            <div className={classes.buttonContainer}>
                {props.options}
            </div>
        </div>
    );
};

export {InputFormLayout, MainBodyLayout};