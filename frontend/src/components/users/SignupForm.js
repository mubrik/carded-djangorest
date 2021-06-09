import React from 'react';
import { useFormik } from 'formik';
import { Button, TextField, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useDispatch} from 'react-redux'
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import {Container} from 'react-bootstrap';
import {userSignup} from './authenticationSlice'
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    flex: {
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center'
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
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: theme.palette.secondary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

const SignupForm = (props) => {
    
    // react
    const [formSubmitting, setformSubmitting] = React.useState(false)
    // redux
    const dispatch = useDispatch();
    // material
    const classes = useStyles();
    // notification 
    const { enqueueSnackbar } = useSnackbar();
    // formik
    const formik = useFormik({
        initialValues: { username: '', password1: '', password2: '', email: '' },
        onSubmit: async(values, formikBag) => {
            setformSubmitting(true)
            dispatch(userSignup(values))
            .then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    enqueueSnackbar('Account Created Successfully', { 
                        variant: 'success',
                    });
                    setformSubmitting(false)
                } else {
                    setformSubmitting(false)
                    const {
                        username, password1,
                        password2, email, non_field_errors
                    } = result.payload;
                    formikBag.setErrors({
                        username: username ? username.toString(): '',
                        password1: password1 ? password1.toString(): '',
                        password2: password2 ? password2.toString(): '',
                        email: email ? email.toString(): '',
                        non_field_errors: non_field_errors ? non_field_errors.toString(): '',
                    })
                    enqueueSnackbar(non_field_errors ? non_field_errors.toString() : 'Error, Try again', {
                        variant: 'error',
                    });
                }
            })
        },
        validationSchema: Yup.object({
            username: Yup.string()
              .max(18, 'Must be 18 characters or less')
              .min(4, 'Must be more than 4 characters')
              .required('Required'),
            password1: Yup.string()
              .required('Required'),
            password2: Yup.string()
              .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
        })
    })
 
    return (
        <>
        <Container className={classes.flex} fluid>
            <Typography variant="h3" className={classes.buttonForm}> Register for a carded account </Typography>
            <form noValidate className={classes.root} onSubmit={formik.handleSubmit}>
                <TextField
                    name="username"
                    label="Username"
                    id="id-username"
                    margin="dense"
                    color="secondary"
                    autoComplete={'username'}
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
                    autoComplete={'email'}
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
                    autoComplete={'new-password'}
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
                    autoComplete={'new-password'}
                    error={!!formik.errors.password2 && !!formik.touched.password2}
                    helperText={!!formik.errors.password2 && !!formik.touched.password2 && formik.errors.password2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div className={classes.buttonWrapper}>
                    <Button
                        variant="contained"
                        color="default"
                        type="submit"
                        onClick={formik.handleSubmit}
                        disabled={formSubmitting}
                        className={classes.buttonForm}
                        >
                        Sign up
                    </Button>
                    {formSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </form>
        </Container>
        </>
    );
};

/* <Formik
        initialValues = {{ username: '', password1: '', password2: '', email: '' }}
        onSubmit={
            async (values) => {
                alert(JSON.stringify(values, null, 2));
                dispatch(userSignup(values))
            }
        }
        validationSchema={
            Yup.object({
                username: Yup.string()
                  .max(15, 'Must be 15 characters or less')
                  .min(5, 'Must be more than 5 characters')
                  .required('Required'),
                password1: Yup.string()
                  .max(20, 'Must be 20 characters or less')
                  .required('Required'),
                password2: Yup.string()
                  .max(20, 'Must be 20 characters or less')
                  .required('Required'),
                email: Yup.string().email('Invalid email address').required('Required'),
            })
        }
        >
            {(formik) => (
            <>
            <Container fluid>
                <FormikForm className="baseForm" noValidate>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        type="Email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        isValid={formik.touched.email && (!formik.errors.email || !signupErrors.email)}
                        isInvalid={!!formik.errors.email || !!signupErrors.email}
                        />
                        <Form.Control.Feedback type={formik.touched.email && formik.errors.email ? 'invalid' : 'valid'}>
                            {formik.errors.email}
                        </Form.Control.Feedback>
                        { signupErrors.email && 
                            <Form.Control.Feedback type={'invalid'}>
                            {signupErrors.email}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                        type="text"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        isValid={formik.touched.username && (!formik.errors.username || !signupErrors.username)}
                        isInvalid={!!formik.errors.username || !!signupErrors.username}
                        />
                        <Form.Control.Feedback type={formik.touched.username && formik.errors.username ? 'invalid' : 'valid'}>
                            {formik.errors.username}
                        </Form.Control.Feedback>
                        { signupErrors.username && 
                            <Form.Control.Feedback type={'invalid'}>
                            {signupErrors.username}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        name="password1"
                        value={formik.values.password1}
                        onChange={formik.handleChange}
                        isValid={formik.touched.password1 && (!formik.errors.password1 || !signupErrors.password1)}
                        isInvalid={!!formik.errors.password1 || !!signupErrors.password1}
                        />
                        <Form.Control.Feedback type={formik.touched.password1 && formik.errors.password1 ? 'invalid' : 'valid'}>
                            {formik.errors.password1}
                        </Form.Control.Feedback>
                        { signupErrors.password1 && 
                            signupErrors.password1.map((errormsg, index) => {
                                return (
                                    <Form.Control.Feedback key={index} type={'invalid'}>
                                        {errormsg}
                                    </Form.Control.Feedback>
                                )
                            })
                        }
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password Again:</Form.Label>
                        <Form.Control
                        type="password"
                        name="password2"
                        value={formik.values.password2}
                        onChange={formik.handleChange}
                        isValid={formik.touched.password2 && !formik.errors.password2}
                        isInvalid={!!formik.errors.password2}
                        />
                        <Form.Control.Feedback type={formik.touched.password2 && formik.errors.password2 ? 'invalid' : 'valid'}>
                            {formik.errors.password2}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        SignUp
                    </Button>
                </FormikForm>
            </Container>
            </>
            )}
        </Formik> */

export default SignupForm;