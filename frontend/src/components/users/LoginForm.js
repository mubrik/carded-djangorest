import React from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import { Button, TextField, Typography, Link } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import {userLogin, userSocialLogin} from "./authenticationSlice";
import {PasswordResetRequest} from "./AccountMangementPage";
import {useFormik } from "formik";
import {Container} from "react-bootstrap";
import { useSnackbar } from "notistack";
import GoogleLogin from "react-google-login";
import LoginGithub from "../utils/LoginGithub";
import {GoogleIcon} from "../utils/utilities";
import {useAuth} from "../../api/api";
import useStyles from "./authFormStyles";
import CustomBackdrop from "../ui/CustomBackdrop";
import * as Yup from "yup";

const LoginForm = () => {

    // backdrop state
    const [show, setShow] = React.useState(false);
    //  auth
    let isAuthenticated = useAuth();
    // notification
    const { enqueueSnackbar } = useSnackbar();
    // redux
    const dispatch = useDispatch();
    // router
    const history = useHistory();
    // material
    const classes = useStyles();
    // useeffect
    React.useEffect(() => {
        if (isAuthenticated) {
            history.replace("/cards");
        }
    },[isAuthenticated]);
    // formik
    const formik = useFormik({
        initialValues:{username: "", password: ""},
        onSubmit: (values, formikBag) => {
            dispatch(userLogin(values))
                .then((result) => {
                    if (result.meta.requestStatus === "rejected") {
                        const {
                            username, password,
                            non_field_errors
                        } = result.payload;
                    
                        formikBag.setErrors({
                            username: username ? username.toString() : "Invalid Credentials",
                            password: password ? password.toString() : "Invalid Credentials",
                        });
                        enqueueSnackbar(non_field_errors ? non_field_errors.toString() :"Authenticaton Error", { 
                            variant: "error",
                        });
                        formikBag.setSubmitting(false);
                    }
                });
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(4, "Must be more than 4 characters")
                .required("Required"),
            password: Yup.string()
                .required("Required"),
        })
    });
    return (
        <>
            <CustomBackdrop open={show}/>
            <Container className={classes.flex} fluid>
                <Typography variant="h3" className={classes.buttonForm}> Welcome to Carded </Typography>
                <Typography variant="subtitle1" className={classes.buttonForm}> Please Login to continue or click <Link href="/signup" color="inherit">here</Link> to register an account </Typography>
                <form noValidate className={classes.root} onSubmit={formik.handleSubmit}>
                    <TextField
                        name="username"
                        label="Username"
                        id="id-username"
                        margin="dense"
                        color="secondary"
                        autoComplete="username"
                        error={!!formik.errors.username}
                        helperText={!!formik.errors.username && formik.errors.username}
                        fullWidth
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        id="id-password"
                        margin="dense"
                        color="secondary"
                        fullWidth
                        autoComplete="current-password"
                        error={!!formik.errors.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <div className={classes.buttonWrapper}>
                        <Button
                            variant="contained"
                            color="default"
                            type="submit"
                            disabled={formik.isSubmitting}
                            className={classes.buttonForm}
                            margin='dense'
                        >
                        Login
                        </Button>
                        <Typography variant="body1" className={classes.buttonForm}> or </Typography>
                        <GoogleAuthButton backdrop={setShow}/>
                        <GithubAuthButton backdrop={setShow}/>
                        {formik.isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </form>
                <PasswordResetRequest/>
            </Container>
        </>
    );
};

const GoogleAuthButton = ({backdrop}) => {

    // material
    const classes = useStyles();
    // redux
    const dispatch = useDispatch();
    // notification
    const { enqueueSnackbar } = useSnackbar();
    // handle login
    function handleSuccessLogin({accessToken}) {
        let url = "/backend/dj-rest-auth/google/";
        dispatch(userSocialLogin({url, access_token:accessToken}))
            .then((result) => {
                if (result.meta.requestStatus === "rejected") {
                    const { non_field_errors } = result.payload;
                    enqueueSnackbar(non_field_errors ? non_field_errors.toString() : "Error Using social Auth, Try again later", {
                        variant: "error"
                    });
                    return;
                }
                enqueueSnackbar("Welcome", {
                    variant: "success"
                });
            });
    }
    // handle load
    function handleFailureLogin(res) {
        console.log(res);
        enqueueSnackbar("Error Using social Auth, Try again later", {
            variant: "error"
        });
    }

    return(
        <GoogleLogin
            clientId={"225063154787-g0p5ukj9irp5ak4i74nvcolf7hk7mdki.apps.googleusercontent.com"}
            cookiePolicy={"http://localhost:8000"}
            onSuccess={handleSuccessLogin}
            onFailure={handleFailureLogin}
            render={renderProps => (
                <Button 
                    variant="contained"
                    startIcon={<GoogleIcon/>}
                    className={classes.buttonForm} 
                    onClick={() => {
                        backdrop(true);
                        renderProps.onClick();
                    }} 
                    disabled={renderProps.disabled}>
                        Sign In with Google
                </Button>
            )}
        />
    );
};

const GithubAuthButton = () => {

    // material
    const classes = useStyles();
    // redux
    const dispatch = useDispatch();
    // notification
    const { enqueueSnackbar } = useSnackbar();
    // handle login
    function handleSuccessLogin({code}) {
        let url = "/backend/dj-rest-auth/github/";
        dispatch(userSocialLogin({url, code}))
            .then((result) => {
                if (result.meta.requestStatus === "rejected") {
                    const { non_field_errors } = result.payload;
                    enqueueSnackbar(non_field_errors ? non_field_errors.toString() : "Error Using social Auth, Try again later", {
                        variant: "error"
                    });
                    return;
                }
                enqueueSnackbar("Welcome", {
                    variant: "success"
                });
            });
    }
    // handle load fail
    function handleFailureLogin(res) {
        console.log(res);
        enqueueSnackbar("Error Using social Auth, Try again later", {
            variant: "error"
        });
    }

    return(
        <LoginGithub
            className={classes.buttonForm}
            clientId={"03fa45fab73ccf9ff6dc"}
            onSuccess={handleSuccessLogin}
            onFailure={handleFailureLogin}
            redirectUri={"http://localhost:8000/accounts/github/login/callback/"}
        />
    );
};


export default LoginForm;