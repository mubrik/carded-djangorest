import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {MainBodyLayout} from "../ui/uiFormat";
import {useDecksCreator} from "../hooks/customHooks";
import {selectDecksIds, selectDecksStatus, fetchDecks, selectDeckTotal} from "./deckSlice";
import DeckCardSection from "./DeckCardSection";
import {CustomDeckInput} from "./DeckInputBox";
import DeckListForm from "./DeckListForm";
import CustomBackdrop from "../ui/CustomBackdrop";
import EmptyListRender from "../ui/EmptyListRender";


const DeckList = () => {

    // redux
    const decksStatus = useSelector(selectDecksStatus);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (decksStatus === "stale") {
            dispatch(fetchDecks());
        }
    }, [decksStatus, dispatch]);

    return (
        <>
            <MainBodyLayout
                deck
                input={<CustomDeckInput/>}
                deckList={<DeckChipsRenderList/>}
                decks={<DeckCardSection/>}
                deckForm={<DeckListForm />}
            />
        </>
    );
};

const DeckChipsRenderList = () => {

    // redux
    const decks = useSelector(selectDecksIds);
    const decksStatus = useSelector(selectDecksStatus);
    const totalDeckNum = useSelector(selectDeckTotal);
    // create deck list 
    const deckArray = useDecksCreator(decks);

    if (deckArray === null && decksStatus === "stale") {
        return (
            <CustomBackdrop/>
        );
    } else if (decksStatus === "updated" && totalDeckNum === 0) {
        return(
            <EmptyListRender>Empty Decks, Create a Deck</EmptyListRender>
        );
    }

    return(
        [deckArray]
    );

};

export default DeckList;