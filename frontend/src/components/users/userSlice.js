import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import {apiFecthResource} from "../../api/api";

const axios = require("axios");

// axios instance with base url
const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    timeout: 4000,
});

const initialState = {
    data: {
        status: "stale",
        email: null,
        user_profile: {
            profile_picture: null,
            birth_date: null
        }
    },
};

export const fetchUserData = createAsyncThunk("user/fetchUserData", async (passedArgs, { rejectWithValue }) => {

    try {
        let response = await apiFecthResource.get("/users/get_user_detail/");
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

export const editProfileData = createAsyncThunk("user/editProfileData", async (passedArgs, { rejectWithValue, getState }) => {

    try {
        const { user } = getState();
        let response = await apiFecthResource.edit(`/profiles/${user.data.id}/`, passedArgs);
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

export const updateUserPassword = createAsyncThunk("user/updateUserPassword", async (passedArgs, { rejectWithValue }) => {

    try {
        let response = await apiFecthResource.post("/dj-rest-auth/password/change/", passedArgs);
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

export const resetUserPassword = createAsyncThunk("user/resetUserPassword", async (passedArgs, {rejectWithValue }) => {

    try {
        let response = await apiFecthResource.post("/dj-rest-auth/password/reset/", passedArgs);
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

export const confirmPasswordReset = createAsyncThunk("user/confirmPasswordReset", async (passedArgs, { rejectWithValue }) => {

    try {
        let response = await apiFecthResource.post("/dj-rest-auth/password/reset/confirm/", passedArgs);
        return response.data;

    } catch (err) {
        if (err.response) {
            // The request was made and the server responded with a status code out of the range of 2xx
            return rejectWithValue({non_field_errors:["Link expired"]});

        } else if (err.request) {
            // The request was made but no response was received
            return rejectWithValue({non_field_errors:["Unable to reach server"]});
        }
    }
});

export const confirmUserEmail = createAsyncThunk("user/confirmUserEmail", async (passedArgs, { rejectWithValue }) => {

    try {
        let response = await axiosInstance.post("/dj-rest-auth/registration/verify-email/", passedArgs);
        return response.data;

    } catch (err) {
        if (err.response) {
            // The request was made and the server responded with a status code out of the range of 2xx
            return rejectWithValue({non_field_errors:["Link expired"]});

        } else if (err.request) {
            // The request was made but no response was received
            return rejectWithValue({non_field_errors:["Unable to reach server"]});
        }
    }
});


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUserData.fulfilled]: (state, action) => {
            state.data = {
                status: "loaded",
                ...action.payload
            };
        },
        [fetchUserData.rejected]: (state) => {
            state.data.status = "stale";
        },
        [editProfileData.fulfilled]: (state, action) => {
            state.data.user_profile = action.payload;
            state.status = "loaded";
        },
        [editProfileData.rejected]: (state) => {
            state.data.status = "stale";
        },
    }
});

export const selectEmailConfirmationStatus = state => state.user.emailConfirmation;
export const selectUserDetailStatus = state => state.user.data.status;
export const selectUserEmail = state => state.user.data.email;
export const selectUserUsername = state => state.user.data.username;
export const selectUserProfilePic = state => state.user.data.user_profile.profile_picture;
export const selectUserBdate = state => state.user.data.user_profile.birth_date;

export default userSlice.reducer;