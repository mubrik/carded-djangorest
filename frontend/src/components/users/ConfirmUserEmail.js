import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useHistory} from "react-router-dom";
import { Backdrop } from "@material-ui/core";
import { useSnackbar } from "notistack";
import {confirmUserEmail} from "./userSlice";
import {authStatusSelector} from "./authenticationSlice";

const ConfirmUserEmail = () => {

    // react 
    const [confirmStatus, setConfirmStatus ] = React.useState("load");
    // react-router
    const { key  } = useParams();
    const history = useHistory();
    // redux
    const dispatch = useDispatch();
    const isAuth = useSelector(authStatusSelector);
    // notification
    const { enqueueSnackbar, } = useSnackbar();

    useEffect(() => {
        dispatch(confirmUserEmail({key}))
            .then((result) => {
                if (result.meta.requestStatus === "fulfilled") {
                    enqueueSnackbar("Email Verified!", {variant:"success"});
                    setConfirmStatus("success");
                } else {
                    enqueueSnackbar("Please check link", {variant:"error"});
                    setConfirmStatus("failed");
                }
            });
    },[]);

    useEffect(() => {
        if (isAuth && confirmStatus === "success") {
            setTimeout(() => {
                history.push("/cards");
            }, 2000);
        } else {
            setTimeout(() => {
                history.push("/login");
            }, 2000);
        }
    }, [confirmStatus, isAuth, history]);

    if (confirmStatus ===  "load") {
        return(
            <Backdrop open={true}/>
        );
    } else if (confirmStatus ===  "success") {
        return(
            <div className={"inner-main"}>
                <div className={"profile-main"}>
                    <p> Email Verified!</p>
                    <p> Redirecting...</p>
                </div>
            </div>
        );
    } else if (confirmStatus ===  "failed") {
        return(
            <div className={"inner-main"}>
                <div className={"profile-main"}>
                    <p> Error, verifying link. please request verification link again</p>
                </div>
            </div>
        );
    }
    

};

export default ConfirmUserEmail;