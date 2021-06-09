import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useHistory} from "react-router-dom"
import { Backdrop } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import {confirmUserEmail, selectEmailConfirmationStatus} from './userSlice'

const SocialGoogleAuth = (props) => {

    // react-router
    const { key  } = useParams();
    const history = useHistory();
    console.log(key)
    // redux
    const dispatch = useDispatch()
    const emailStatus = useSelector(selectEmailConfirmationStatus)
    // notification
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        dispatch(confirmUserEmail({key}))
    },[])

    return(
        <div></div>
    )
}

export default SocialGoogleAuth;