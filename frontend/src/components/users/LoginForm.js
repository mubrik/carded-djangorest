import React from 'react';
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { Button, TextField, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {userLogin} from './authenticationSlice'
import {PasswordResetRequest} from './AccountMangementPage'
import {useFormik } from 'formik';
import {Container} from 'react-bootstrap';
import { useSnackbar } from 'notistack';
import GoogleLogin from 'react-google-login';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    flex: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        boxShadow: `0px 0px 1.5px 0px ${theme.palette.text.primary}`,
        background: `linear-gradient(
            180deg,
            ${theme.palette.background.default} 98%,
            ${theme.palette.secondary.light}f5 100%)`,
        borderRadius: '8px',
        padding: theme.spacing(1)
    },
    buttonForm: {
        margin: theme.spacing(1),
    },
    buttonWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: theme.palette.secondary.main,
        position: 'absolute',
        top: '24px',
        left: '32px',
        marginTop: -8,
        marginLeft: -8,
        zIndex: 1
    },
}));

const LoginForm = (props) => {

    // notification
    const { enqueueSnackbar } = useSnackbar();
    // react
    const [formSubmitting, setformSubmitting] = React.useState(false)
    // redux
    const dispatch = useDispatch();
    // router
    const history = useHistory();
    // material
    const classes = useStyles();
    // formik
    const formik = useFormik({
        initialValues:{username: '', password: ''},
        onSubmit: async (values, formikBag) => {
            setformSubmitting(true)
            let bodyData = { username: "mubrik", password: "django@321"}
            dispatch(userLogin(bodyData))
            .then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    history.push('/cards')
                } else {
                    setformSubmitting(false)
                    const {
                        username, password,
                        non_field_errors
                    } = result.payload;
                    
                    formikBag.setErrors({
                        username: username ? username.toString() : 'Invalid Credentials',
                        password: password ? password.toString() : 'Invalid Credentials',
                    })
                    enqueueSnackbar(non_field_errors ? non_field_errors.toString() :'Authenticaton Error', { 
                        variant: 'error',
                    });
                }
            })
        },
        validationSchema: Yup.object({
            username: Yup.string()
            .min(4, 'Must be more than 4 characters')
            .required('Required'),
        })
    })
    return (
        <>
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
                    id="id-password"
                    margin="dense"
                    color="secondary"
                    error={!!formik.errors.password}
                    fullWidth
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div className={classes.buttonWrapper}>
                    <Button
                        variant="contained"
                        color="default"
                        type="submit"
                        disabled={formSubmitting}
                        className={classes.buttonForm}
                        margin='dense'
                        >
                        Login
                    </Button>
                    <Typography variant="body1" className={classes.buttonForm}> or </Typography>
                    {formSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </form>
            <PasswordResetRequest/>
        </Container>
        </>
    )
}

const GoogleAuthButton = (props) => {

    // material
    const classes = useStyles();

    return(
        <GoogleLogin
        clientId={'316539219448-qtvdqd6iban1fbqajma9nbjdq5f75g70.apps.googleusercontent.com'}
        onSuccess={(response) => console.log(response)}
        onFailure={(err, detail) => console.log(err, detail)}
        render={renderProps => (
            <Button variant="contained" className={classes.buttonForm} onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</Button>
        )}
        cookiePolicy={'http://localhost:3000'}
        responseType={'code'}
        />
    )
}


export default LoginForm;