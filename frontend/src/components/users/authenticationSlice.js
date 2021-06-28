import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import {login, logout, apiFecthResource} from "../../api/api";
import {fetchUserData} from "./userSlice";
import {clearDecks} from "../decks/deckSlice";
import {clearCards} from "../cards/cardsSlice";

const axios = require("axios");

const initialState = {
    token: null,
    authenticated: false,
    loading: "idle",
};

export const userLogin = createAsyncThunk("auth/userLogin", async (passedArgs, {dispatch, rejectWithValue }) => {

    const loginValues = passedArgs;
    try {
        let response = await axios.post("/backend/dj-rest-auth/login/", loginValues);
        dispatch(setAuthToken(response.data));
        login(response.data);
        dispatch(fetchUserData());
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

export const userSocialLogin = createAsyncThunk("auth/userGoogleLogin", async (passedArgs, {dispatch, rejectWithValue }) => {

    
    try {
        const {url, ...rest} = passedArgs;
        let response = await axios.post(url, rest);
        dispatch(setAuthToken(response.data));
        login(response.data);
        dispatch(fetchUserData());
        return response.data;

    } catch (err) {
        if (err.response) {
            // The request was made and the server responded with a status code out of the range of 2xx
            console.log(err.response.data);
            return rejectWithValue(err.response.data);

        } else if (err.request) {
            // The request was made but no response was received
            return rejectWithValue({non_field_errors:"Unable to reach server"});
        }
    }
    
});

export const userLogout = createAsyncThunk("auth/userLogout", async (passedArgs, { dispatch }) => {
    await apiFecthResource.post("dj-rest-auth/logout/");
    logout();
    dispatch(clearAuthToken());
    dispatch(clearCards());
    dispatch(clearDecks());
});

export const userSignup = createAsyncThunk("auth/userSignup", async (passedArgs, {dispatch, rejectWithValue }) => {

    const requestBody = passedArgs;
    try {
        let response = await axios.post("dj-rest-auth/registration/", requestBody);
        dispatch(setAuthToken(response.data));
        login(response.data);
        dispatch(fetchUserData());
        return response.data;

    } catch (err) {
        if (err.response) {
            // The request was made and the server responded with a status code out of the range of 2xx
            return rejectWithValue(err.response.data);

        } else if (err.request) {
            // The request was made but no response was received
            return rejectWithValue({non_field_errors:["Unable to reach server"]});
        }
    }
    
});

const authenticationSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthToken(state, action) {
            state.token = action.payload["key"];
            state.authenticated = true;
        },
        clearAuthToken(state) {
            state.token = null;
            state.authenticated = false;
        }
    },
    extraReducers: {
        [userLogin.pending]: (state) => {
            state.loading = "loading";
        },
        [userLogin.fullfilled]: (state) => {
            state.loading = "loaded";
        },
        [userSignup.fulfilled]: (state) => {
            state.loading = "loaded";
        },
    }
});


export const authTokenSelector = (state) => state.auth.token;
export const authStatusSelector = (state) => state.auth.authenticated;

export const {clearAuthToken, setAuthToken} = authenticationSlice.actions;

export default authenticationSlice.reducer;