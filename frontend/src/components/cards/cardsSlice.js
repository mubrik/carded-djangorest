import { createSlice, createAsyncThunk,
        createEntityAdapter, createSelector
    } from '@reduxjs/toolkit'
import {apiFecthResource} from '../../api/api'
import {removeCardFromDecks, updateCardInDeck} from '../decks/deckSlice'

const cardsAdapter = createEntityAdapter({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (card) => card.id,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.created.localeCompare(b.created),
})

const initialState = cardsAdapter.getInitialState({
    loading: 'idle',
    status: 'stale',
    error: {
        isErrored: false,
        message: '',
    }
})

export const fetchCards = createAsyncThunk('cards/fetchCards', async (params, {dispatch, rejectWithValue}) => {

    let response;
    try {

        let url = `notes/`
        response = await apiFecthResource.get(url);
        return response.data;

    } catch (err) {
        if (err.response) {
            // The request was made and the server responded with a status code out of the range of 2xx
            return rejectWithValue({message: 'Invalid Request was made'})

        } else if (err.request) {
            // The request was made but no response was received
            return rejectWithValue({message: 'No Response recieved from server'})
        }
    }
})

export const addNewCard = createAsyncThunk('cards/addNewCard', async (params, {getState, dispatch, rejectWithValue}) => {

    let response;
    try {
        response = await apiFecthResource.post('notes/', params)
        dispatch(updateCardInDeck({newCard: response.data, type: 'create'}))
        return response.data;

    } catch (err) {
        if (err.response) {
            // The request was made and the server responded with a status code out of the range of 2xx
            return rejectWithValue(err.response.data)

        } else if (err.request) {
            // The request was made but no response was received
            return rejectWithValue(err.request)
        }
    }
})

export const removeCard = createAsyncThunk('cards/removeCard', async (params, {getState, dispatch, rejectWithValue}) => {

    let response;
    try {
        let url = `notes/${params}/`
        response = await apiFecthResource.remove(url)
        const {cards} = getState()
        let deletedCard = cards.entities[params]
        dispatch(removeCardFromDecks({delCard: deletedCard}))
        return params

    } catch (err) {
        if (err.response) {
            // The request was made and the server responded with a status code out of the range of 2xx
            return rejectWithValue(err.response.data)

        } else if (err.request) {
            // The request was made but no response was received
            return rejectWithValue(err.request)
        }
    }
})

export const editCard = createAsyncThunk('cards/editCard', async (params, {dispatch, getState, rejectWithValue}) => {

    let response;
    const {id, requestBody} = params;
    try {
        let url = `notes/${id}/`
        response = await apiFecthResource.edit(url, requestBody)
        const {cards} = getState()
        let prevCard = cards.entities[id]
        dispatch(updateCardInDeck({prevCard, newCard: response.data, type: 'update'}))
        return response.data;

    } catch (err) {
        if (err.response) {
            // The request was made and the server responded with a status code out of the range of 2xx

            return rejectWithValue(err.response.data)

        } else if (err.request) {
            // The request was made but no response was received
            return rejectWithValue(err.request)
        }
    }
})

export const searchCards = createAsyncThunk('cards/searchCards', async (params, {dispatch, getState, rejectWithValue}) => {

    let response;
    try {
        let url = `search/`
        response = await apiFecthResource.get(url, params)
        return response.data;

    } catch (err) {
        if (err.response) {
            // The request was made and the server responded with a status code out of the range of 2xx

            return rejectWithValue(err.response.data)

        } else if (err.request) {
            // The request was made but no response was received
            return rejectWithValue(err.request)
        }
    }
})

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        clearCards(state, action) {
            cardsAdapter.removeAll(state)
            state.status = 'stale'
        },
        setStale(state, action) {
            state.status = 'stale'
        }
    },
    extraReducers: {
        [fetchCards.pending]: (state, action) => {
            state.loading = 'loading'
        },
        [fetchCards.fulfilled]: (state, action) => {
            cardsAdapter.upsertMany(state, action.payload)
            state.loading = 'loaded'
            state.status = 'updated'
        },
        [addNewCard.fulfilled]: (state, action) => {
            cardsAdapter.addOne(state, action.payload)
        },
        [editCard.fulfilled]: (state, action) => {
            const updObj = {
                id: action.payload['id'],
                changes: {
                    ...action.payload
                }
            }
            cardsAdapter.updateOne(state, updObj)
        },
        [removeCard.fulfilled]: (state, action) => {
            cardsAdapter.removeOne(state, action.payload)
        },
        [fetchCards.rejected]: (state, action) => {
            state.loading = 'failed'
        },
    }
});

export const {
    selectAll: selectAllCards,
    selectById: selectCardById,
    selectIds: selectCardsIds,
    selectTotal: selectCardsTotal,
    // Pass in a selector that returns the posts slice of state
} = cardsAdapter.getSelectors(state => state.cards);

export const {clearCards, setStale} = cardsSlice.actions;

export const selectCardsStatus = (state) => state.cards.status;

export const selectCardsLoadingStatus = createSelector(
    [selectAllCards],
    (cards) => cards.loading
)
export const selectDecksByCardId = createSelector(
    [selectAllCards, (state, cardId) => cardId],
    (cards, cardId) => cards[cardId].notebook
)

export default cardsSlice.reducer