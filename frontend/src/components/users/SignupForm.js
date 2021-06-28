import React from "react";
import { useFormik } from "formik";
import { Button, TextField, Typography, Link } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useDispatch} from "react-redux";
import { useSnackbar } from "notistack";
import useStyles from "./authFormStyles";
import {Container} from "react-bootstrap";
import {userSignup} from "./authenticationSlice";
import * as Yup from "yup";

const SignupForm = () => {
    // redux
    const dispatch = useDispatch();
    // material
    const classes = useStyles();
    // notification 
    const { enqueueSnackbar } = useSnackbar();
    // formik
    const formik = useFormik({
        initialValues: { username: "", password1: "", password2: "", email: "" },
        onSubmit: (values, formikBag) => {
            dispatch(userSignup(values))
                .then((result) => {
                    if (result.meta.requestStatus === "fulfilled") {
                        enqueueSnackbar("Account Created Successfully", { 
                            variant: "success",
                        });
                    } else {
                        const {
                            username, password1,
                            password2, email, non_field_errors
                        } = result.payload;
                        formikBag.setErrors({
                            username: username ? username.toString(): "",
                            password1: password1 ? password1.toString(): "",
                            password2: password2 ? password2.toString(): "",
                            email: email ? email.toString(): "",
                            non_field_errors: non_field_errors ? non_field_errors.toString(): "",
                        });
                        enqueueSnackbar(non_field_errors ? non_field_errors.toString() : "Error, Try again", {
                            variant: "error",
                        });
                    }
                    formikBag.setSubmitting(false);
                });
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(18, "Must be 18 characters or less")
                .min(4, "Must be more than 4 characters")
                .required("Required"),
            password1: Yup.string()
                .required("Required"),
            password2: Yup.string()
                .required("Required"),
            email: Yup.string().email("Invalid email address").required("Required"),
        })
    });
 
    return (
        <>
            <Container className={classes.flex} fluid>
                <Typography variant="h3" className={classes.buttonForm}> Register for a carded account </Typography>
                <Typography variant="subtitle1" className={classes.buttonForm} paragraph> Have an account? click <Link href="/login" color="inherit">here</Link> to login </Typography>
                <form noValidate className={classes.root} onSubmit={formik.handleSubmit}>
                    <TextField
                        name="username"
                        label="Username"
                        id="id-username"
                        margin="dense"
                        color="secondary"
                        autoComplete={"username"}
                        error={!!formik.errors.username && !!formik.touched.username}
                        helperText={!!formik.errors.username && !!formik.touched.username && formik.errors.username}
                        fullWidth
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        id="id-email"
                        margin="dense"
                        color="secondary"
                        autoComplete={"email"}
                        error={!!formik.errors.email && !!formik.touched.email}
                        helperText={!!formik.errors.email && !!formik.touched.email && formik.errors.email}
                        fullWidth
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField
                        name="password1"
                        label="Password"
                        type="password"
                        id="id-password1"
                        margin="dense"
                        color="secondary"
                        autoComplete={"new-password"}
                        error={!!formik.errors.password1 && !!formik.touched.password1}
                        helperText={!!formik.errors.password1 && !!formik.touched.password1 && formik.errors.password1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        id="id-password2"
                        margin="dense"
                        color="secondary"
                        autoComplete={"new-password"}
                        error={!!formik.errors.password2 && !!formik.touched.password2}
                        helperText={!!formik.errors.password2 && !!formik.touched.password2 && formik.errors.password2}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <div className={classes.signupButtonWrapper}>
                        <Button
                            variant="contained"
                            color="default"
                            type="submit"
                            onClick={formik.handleSubmit}
                            disabled={formik.isSubmitting}
                            className={classes.buttonForm}
                        >
                        Sign up
                        </Button>
                        {formik.isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </form>
            </Container>
        </>
    );
};

export default SignupForm;