import React from 'react'
import {useFormik } from 'formik';
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import {TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Link } from '@material-ui/core';
import {
    updateUserPassword, resetUserPassword,
    selectUserDetailStatus, fetchUserData,
    selectUserEmail
} from './userSlice'
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    input_file: {
      display: 'none',
    },
    root: {
        display: 'grid',
        justifyItems: 'center',
        alignContent: 'flex-start',
        boxShadow: `0px 1px 4px 0px ${theme.palette.text.primary}`,
        borderRadius: '8px',
        margin: 'auto',
        padding: '.4em .5em',
        minHeight: 'inherit',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
    },
    profileCardMini: {
        minWidth: '80px',
        boxShadow: `0px 0px 1.5px 0px ${theme.palette.text.primary}`,
        alignItems: 'center',
        background: `linear-gradient(
            180deg,
            ${theme.palette.background.default} 97%,
            ${theme.palette.secondary.main}f5 100%)`,
        borderRadius: '8px',
        margin: '0.5em 0.4em',
        padding: '0.8em 0.2em',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    profileCard: {
        minWidth: '70%',
        boxShadow: `0px 0px 1.5px 0px ${theme.palette.text.primary}`,
        alignItems: 'center',
        background: `linear-gradient(
            180deg,
            ${theme.palette.background.default} 98%,
            ${theme.palette.secondary.main}f5 100%)`,
        borderRadius: '8px',
        margin: '0.5em 0.4em',
        padding: '0.8em 0.2em',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    topMargin: {
        marginTop: theme.spacing(1)
    },
    cancelButton: {
        margin: theme.spacing(1),
        color: theme.palette.warning.main,
        borderColor: theme.palette.warning.main,
    }
}));

const AccountMangementPage = (props) => {

    // material styles
    const classes = useStyles();
    // redux
    const userDetailStatus = useSelector(selectUserDetailStatus)
    const dispatch = useDispatch()
    

    React.useEffect(() => {
        if (userDetailStatus === 'stale') {
            dispatch(fetchUserData())
        }
    }, [userDetailStatus, dispatch])

    return (
        <div className={classes.root}>
            <PasswordChangeForm />
            <PasswordResetRequest/>
        </div>
    )
}

const PasswordChangeForm = (props) => {

    // redux
    const dispatch = useDispatch()
    // material styles
    const classes = useStyles();
    // notification 
    const { enqueueSnackbar } = useSnackbar();

    // formik
    const formik = useFormik({
        initialValues: {
            old_password: '',
            new_password1: '',
            new_password2: ''
        },
        onSubmit: (values, formikBag) => {
            alert(JSON.stringify(values, null, 2));
            dispatch(updateUserPassword(values))
            .then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    enqueueSnackbar('Password Updated Successfully', { 
                        variant: 'success',
                    });
                } else {
                    const {
                        old_password, new_password1,
                        new_password2, non_field_errors
                    } = result.payload;
                    formikBag.setErrors({
                        old_password: old_password ? old_password.toString(): '',
                        new_password1: new_password1 ? new_password1.toString(): '',
                        new_password2: new_password2 ? new_password2.toString(): '',
                        non_field_errors: non_field_errors ? non_field_errors.toString(): '',
                    })
                    enqueueSnackbar('Error Updating Password', {
                        variant: 'error',
                    });
                }
                formikBag.setSubmitting(false)
            })
        },
        validationSchema: Yup.object({
            old_password: Yup.string().required('Required'),
            new_password1: Yup.string().required('Required'),
            new_password2: Yup.string().required('Required'),
        })
    })

    return(
        <>
        <form className={classes.profileCard} onSubmit={formik.handleSubmit}>
            <TextField
            id="filled-old_password-input"
            name="old_password"
            label="Old Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            margin="dense"
            color="secondary"
            error={!!formik.errors.old_password}
            helperText={formik.errors.old_password}
            value={formik.values.old_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            <TextField
            id="filled-new_password1-input"
            name="new_password1"
            label="New Password"
            type="password"
            autoComplete="new-password"
            variant="outlined"
            margin="dense"
            color="secondary"
            error={!!formik.errors.new_password1}
            helperText={formik.errors.new_password1}
            value={formik.values.new_password1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            <TextField
            id="filled-new_password2-input"
            name="new_password2"
            label="New Password Again"
            type="password"
            autoComplete="new-password"
            variant="outlined"
            margin="dense"
            color="secondary"
            error={!!formik.errors.new_password2}
            helperText={formik.errors.new_password2}
            value={formik.values.new_password2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            <Button variant="contained" 
            onClick={formik.handleSubmit} 
            margin="dense" 
            className={classes.topMargin}
            disabled={formik.isSubmitting}
            >
                Update Password
            </Button>
        </form>
        </>
    )
}

const PasswordResetRequest = (props) => {
    // redux 
    const dispatch = useDispatch()
    const userEmail = useSelector(selectUserEmail)
    // react
    const [open, setOpen] = React.useState(false);
    // material styles
    const classes = useStyles();
    // formik
    const formik = useFormik({
        initialValues: {
            email: userEmail ? userEmail : ''
        },
        onSubmit: async (values) => {
            alert(JSON.stringify(values, null, 2));
            dispatch(resetUserPassword(values))
        }
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
        <Link
            component="button"
            variant='subtitle2'
            onClick={handleClickOpen}
            className={classes.topMargin}
            color="inherit"
        >
            Forgot Password? Click here to request a password reset
        </Link>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-password-reset">
            <DialogTitle id="form-dialog-password-reset">Password Reset</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Enter your email address and we will forward you a password reset link
            </DialogContentText>
            <TextField
                autoFocus
                color="secondary"
                name="email"
                margin="dense"
                id="emailForm"
                label="Email Address"
                type="email"
                onChange={formik.handleChange}
                defaultValue={formik.values.email}
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} className={classes.cancelButton}>
                Cancel
            </Button>
            <Button onClick={formik.handleSubmit} color="default">
                Request Reset
            </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default AccountMangementPage;
export {PasswordResetRequest, PasswordChangeForm}