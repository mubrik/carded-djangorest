import React from "react";
import { useSelector, useDispatch} from "react-redux";
import {selectCardsTotal, selectCardsIds, selectCardsStatus, fetchCards} from "./cardsSlice";
import { useSnackbar } from "notistack";
import {MainBodyLayout} from "../ui/uiFormat";
import CustomBackdrop from "../ui/CustomBackdrop";
import CustomCardInput from "./CardInputBox";
import {useCardsCreator} from "../hooks/customHooks";
import EmptyListRender from "../ui/EmptyListRender";


const CardList = () => {
    // redux
    const cardsStatus = useSelector(selectCardsStatus);
    const dispatch = useDispatch();
    // notification
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        if (cardsStatus === "stale") {
            dispatch(fetchCards())
                .then((result) => {
                    if (result.meta.requestStatus === "rejected") {
                        enqueueSnackbar("Error getting cards, Try again", { 
                            variant: "error",
                        });
                    }
                });
        }
    }, [cardsStatus, dispatch]);

    return (
        <>
            <MainBodyLayout
                input={<CustomCardInput/>}
                body={<CardsListRender/>}
                cards
            />
        </>
    );
};

const CardsListRender = () => {

    const totalCardsNum = useSelector(selectCardsTotal);
    const cardsStatus = useSelector(selectCardsStatus);
    const totalCardsId = useSelector(selectCardsIds);
    const cardsArray = useCardsCreator(totalCardsId);

    if (cardsArray === null && cardsStatus === "stale") {
        return (
            <CustomBackdrop/>
        );
    } else if (cardsStatus === "updated" && totalCardsNum === 0) {
        return(
            <EmptyListRender>Empty Cards, Create a Card</EmptyListRender>
        );
    }

    return(
        [cardsArray]
    );
};

export default CardList;