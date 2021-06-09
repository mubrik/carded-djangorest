import React from 'react';
import { useSelector} from 'react-redux'
import {selectCardsSearchTotal, selectCardsSearchIds, selectSearchLoadingStatus} from './searchSlice'
import {MainBodyLayout} from '../ui/uiFormat'
import CustomBackdrop from '../ui/CustomBackdrop'
import CustomCardInput from '../cards/CardInputBox'
import {useCardsCreator} from '../hooks/customHooks'
import EmptyListRender from '../ui/EmptyListRender'

const SearchPage = (props) => {

    return (
        <>
        <MainBodyLayout
            input={<CustomCardInput/>}
            searchBody={<SearchListRender/>}
            search
        />
        </>
    );
}

const SearchListRender = (props) => {

    const totalCardsNum = useSelector(selectCardsSearchTotal)
    const searchLoading = useSelector(selectSearchLoadingStatus)
    const totalCardsId = useSelector(selectCardsSearchIds)
    const cardsArray = useCardsCreator(totalCardsId)

    if (searchLoading !== 'loaded') {
        return (
            <CustomBackdrop/>
        )
    } else if (cardsArray.length === 0 && totalCardsNum === 0) {
        return(
            <EmptyListRender>Empty..</EmptyListRender>
        )
    }

    return(
        [cardsArray]
    )
}

export default SearchPage