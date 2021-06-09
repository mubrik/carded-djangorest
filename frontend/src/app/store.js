import React from 'react';
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../components/users/authenticationSlice'
import userReducer from '../components/users/userSlice'
import cardsReducer from '../components/cards/cardsSlice'
import deckReducer from '../components/decks/deckSlice'
import searchReducer from '../components/search/searchSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        cards: cardsReducer,
        decks: deckReducer,
        user: userReducer,
        search: searchReducer,
    }
})