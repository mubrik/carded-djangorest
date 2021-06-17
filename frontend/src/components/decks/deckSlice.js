import { createSlice, createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import {setStale, fetchCards} from "../cards/cardsSlice";
import {apiFecthResource} from "../../api/api";
import {getArrayDifference} from "../utils/utilities";

const decksAdapter = createEntityAdapter({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (deck) => deck.id,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.created.localeCompare(b.created),
});

const initialState = decksAdapter.getInitialState({
    loading: "idle",
    status: "stale",
    activeDeck: null,
    error: {
        isErrored: false,
        message: "",
    }
});

export const fetchDecks = createAsyncThunk("decks/fetchDecks", async (params, { rejectWithValue}) => {

    let response;
    try {
        let url = "notebooks/";
        response = await apiFecthResource.get(url);
        return response.data;

    } catch (err) {
        if (err.response) {
            // The request was made and the server responded with a status code out of the range of 2xx
            return rejectWithValue({message: "Invalid Request was made"});

        } else if (err.request) {
            // The request was made but no response was received
            return rejectWithValue({message: "No Response recieved from server"});
        }
    }
});

export const addNewDeck = createAsyncThunk("decks/addNewDeck", async (params, {rejectWithValue}) => {

    let response;
    try {
        response = await apiFecthResource.post("notebooks/", params);
        return response.data;

    } catch (err) {
        if (err.response) {
            // The request was made and the server responded with a status code out of the range of 2xx
            return rejectWithValue(err.response.data);

        } else if (err.request) {
            // The request was made but no response was received
            return rejectWithValue({non_field_errors:"Unable to reach server"});
        }
    }
});

export const removeDeckById = createAsyncThunk("decks/removeDeckById", async (params, { dispatch, rejectWithValue}) => {

    try {
        let url = `notebooks/${params}/`;
        await apiFecthResource.remove(url);
        dispatch(removeDeck(params));
        return params;

    } catch (err) {
        if (err.response) {
            // The request was made and the server responded with a status code out of the range of 2xx
            console.log(err.response);
            return rejectWithValue(err.response.data);

        } else if (err.request) {
            // The request was made but no response was received
            return rejectWithValue({non_field_errors:"Unable to reach server"});
        }
    }
});

export const updateDeckCards = createAsyncThunk("decks/updateDeckCards", async (params, {dispatch, rejectWithValue, getState}) => {

    let response;
    try {
        const {deckId, cards} = params;
        const {decks} = getState();
        let deckName = decks.entities[deckId].name;
        let data = {name: deckName, notebook_notes: cards};
        response = await apiFecthResource.edit(`notebooks/${deckId}/`, data);
        dispatch(setStale());
        dispatch(fetchCards());
        return response.data;

    } catch (err) {
        if (err.response) {
            // The request was made and the server responded with a status code out of the range of 2xx
            return rejectWithValue(err.response.data);

        } else if (err.request) {
            // The request was made but no response was received
            return rejectWithValue({non_field_errors:"Unable to reach server"});
        }
    }
});

const decksSlice = createSlice({
    name: "decks",
    initialState,
    reducers: {
        clearDecks(state) {
            decksAdapter.removeAll(state);
            state.status = "stale";
        },
        removeDeck(state, action) {
            let delDeckId = action.payload;
            let delIndex = state.ids.findIndex((deckId) => deckId === delDeckId);

            if (state.activeDeck === action.payload) {
                if (delIndex > 0 && state.ids.length > 1 ) {
                    state.activeDeck = state.ids[delIndex - 1];
                } 
                else if (delIndex === 0 && state.ids.length > 1 ) {state.activeDeck = state.ids[delIndex + 1];}
                else {state.activeDeck = null;}
            }
            decksAdapter.removeOne(state, action.payload);
        },
        updateActiveDeck(state, action) {
            state.activeDeck = action.payload;
        },
        updateCardInDeck(state, action) {
            let prevCard = action.payload["prevCard"] ? action.payload["prevCard"] : [];
            let newCard = action.payload["newCard"] ? action.payload["newCard"] : [];
            let actionType = action.payload["type"];

            if (actionType === "update") {
                let prevDeckArray = prevCard.notebook.slice();
                let deckDiff = getArrayDifference(prevDeckArray, newCard.notebook);
                deckDiff.forEach(deckId => {
                    let newArr = state.entities[deckId].notebook_notes.filter(prevId => prevId !== prevCard.id);
                    state.entities[deckId].notebook_notes = newArr;
                });
            }
            
            newCard.notebook.forEach(deckId => {
                if (state.entities[deckId].notebook_notes.includes(newCard.id)) return;
                state.entities[deckId].notebook_notes.push(newCard.id);
            });
        },
        removeCardFromDecks(state, action) {
            let deletedCard = action.payload["delCard"];
            const deletedCardId = deletedCard["id"];
            const deletedCardDecks = deletedCard.notebook.slice();

            deletedCardDecks.forEach(deckId => {
                let newArr = state.entities[deckId].notebook_notes.filter(prevId => prevId !== deletedCardId);
                state.entities[deckId].notebook_notes = newArr;
            });
        }
    },
    extraReducers: {
        [fetchDecks.pending]: (state) => {
            state.loading = "loading";
        },
        [fetchDecks.fulfilled]: (state, action) => {
            decksAdapter.upsertMany(state, action.payload);
            state.loading = "loaded";
            state.status = "updated";
        },
        [fetchDecks.rejected]: (state) => {
            state.loading = "failed";
        },
        [addNewDeck.fulfilled]: (state, action) => {
            decksAdapter.addOne(state, action.payload);
        },
        [updateDeckCards.fulfilled]: (state, action) => {
            const updObj = {
                id: action.payload["id"],
                changes: {
                    ...action.payload
                }
            };
            decksAdapter.updateOne(state, updObj);
        },
    }
});

export const {
    selectAll: selectAllDecks,
    selectById: selectDeckById,
    selectIds: selectDecksIds,
    selectTotal: selectDeckTotal,
    // Pass in a selector that returns the posts slice of state
} = decksAdapter.getSelectors(state => state.decks);
export const selectDecksStatus = (state) => state.decks.status;
export const selectActiveDeck = (state) => state.decks.activeDeck;
export const selectCardsByDeckId = (state, id) => {
    if (id === null || id === undefined) return [];
    let arr = selectDeckById(state, id).notebook_notes;
    return arr;
};

export const {updateActiveDeck, removeCardFromDecks, updateCardInDeck, removeDeck, clearDecks} = decksSlice.actions;

export default decksSlice.reducer;