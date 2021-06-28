import React from "react";
import {useDispatch} from "react-redux";
import {useParams, useHistory} from "react-router-dom";
import { useFormik  } from "formik";
import {TextField, Button, Typography } from "@material-ui/core";
import {confirmPasswordReset} from "./userSlice";

const ConfirmPasswordResetForm = () => {

    // react-router
    const { uid, token  } = useParams();
    const history = useHistory();
    // redux
    const dispatch = useDispatch();

    // formik
    const formik = useFormik({
        initialValues: {
            uid,
            token,
            new_password1: "",
            new_password2: ""
        },
        onSubmit: async (values) => {
            alert(JSON.stringify(values, null, 2));
            dispatch(confirmPasswordReset(values));
        }
    });

    return (
        <div className={"profile-main"}>
            <form className={"profile-form"}>
                <TextField
                    id="filled-new_password1-input"
                    name="new_password1"
                    label="New Password"
                    type="password"
                    variant="outlined"
                    value={formik.values.new_password1}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <TextField
                    id="filled-new_password2-input"
                    name="new_password2"
                    label="New Password Again"
                    type="password"
                    variant="outlined"
                    value={formik.values.new_password2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <Button variant="contained" color="secondary" onClick={formik.handleSubmit}>
                Update Password
                </Button>
                <Typography variant="subtitle1">
                Forgot Password? Click here to request a pssword reset
                </Typography>
            </form>
        </div>
    );
};

export default ConfirmPasswordResetForm;