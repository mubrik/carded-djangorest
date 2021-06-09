import { createSlice, createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit'
import {apiFecthResource} from '../../api/api'

const searchAdapter = createEntityAdapter({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (card) => card.id,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.created.localeCompare(b.created),
})

const initialState = searchAdapter.getInitialState({
    loading: 'idle',
    status: 'stale',
    error: {
        isErrored: false,
        message: '',
    }
})

export const searchCards = createAsyncThunk('search/searchCards', async (params, {dispatch, getState, rejectWithValue}) => {

    let response;
    try {
        let url = `search/`
        response = await apiFecthResource.get(url, params)
        dispatch(fillSearchData(response.data))
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

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        fillSearchData(state, action) {
            searchAdapter.setAll(state, action.payload)
        }
    },
    extraReducers: {
        [searchCards.pending]: (state, action) => {
            state.loading = 'loading'
        },
        [searchCards.fulfilled]: (state, action) => {
            state.loading = 'loaded'
            state.status = 'updated'
        },
    }
})

export const {
    selectAll: selectAllCardSearch,
    selectIds: selectCardsSearchIds,
    selectTotal: selectCardsSearchTotal,
    // Pass in a selector that returns the posts slice of state
} = searchAdapter.getSelectors(state => state.search);
export const selectSearchLoadingStatus = state => state.search.loading;
export const {fillSearchData} = searchSlice.actions;

export default searchSlice.reducer
