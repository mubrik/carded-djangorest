import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { Typography } from "@material-ui/core";
import {selectDeckById, selectActiveDeck, selectDeckTotal} from "./deckSlice";
import {selectCardsStatus, fetchCards} from "../cards/cardsSlice";
import {useCardsCreator} from "../hooks/customHooks";

const DeckCardSection = () => {

    // redux
    const dispatch = useDispatch();
    const activeDeck = useSelector(selectActiveDeck);
    const cardsStatus = useSelector(selectCardsStatus);
    const totalDeckNum = useSelector(selectDeckTotal);
    const singleDeck = useSelector((state) => selectDeckById(state, activeDeck));
    const cardsArray = useCardsCreator(singleDeck ? singleDeck.notebook_notes : null);

    React.useEffect(() => {
        if (cardsStatus === "stale") {
            dispatch(fetchCards());
        }
    }, [cardsStatus]);

    if (activeDeck === null && totalDeckNum > 0 ) {
        return (
            <Typography variant="body1">Select a Deck</Typography>
        );
    } else if (activeDeck === null && totalDeckNum === 0) {
        return (
            <>
            </>
        );
    }

    return(
        <>
            {cardsArray && cardsArray.length > 0 &&
            [cardsArray]
            }
            {cardsArray && cardsArray.length === 0 &&
            <Typography variant="body1">Empty Deck, Add some cards</Typography>
            }
        </>
    );

};

export default DeckCardSection;