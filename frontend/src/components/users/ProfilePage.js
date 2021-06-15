import React from 'react'
import {useFormik } from 'formik';
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import {editProfileData, fetchUserData,
        selectUserDetailStatus, selectUserBdate,
        selectUserProfilePic, selectUserUsername
} from './userSlice'
import {selectCardsTotal} from '../cards/cardsSlice'
import {selectDeckTotal} from '../decks/deckSlice'
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
    input_file: {
      display: 'none',
    },
    root: {
        display: 'grid',
        justifyItems: 'center',
        alignContent: 'flex-start',
        boxShadow: `0px 1px 2px 0px ${theme.palette.text.primary}`,
        borderRadius: '8px',
        margin: 'auto',
        padding: '.4em .5em',
        minHeight: 'inherit',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
    },
    profileUsername: {
        minWidth: '80px',
        alignItems: 'center',
        background: `linear-gradient(
            180deg,
            ${theme.palette.background.default} 95%,
            ${theme.palette.secondary.main}f5 100%)`,
        borderRadius: '8px',
        margin: '0.5em 0.4em',
        padding: '0.8em 0.2em',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column'
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
        minWidth: '40%',
        boxShadow: `0px 0px 3px 0px ${theme.palette.text.primary}`,
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
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    ProfileAvatarForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    ProfileAvatarImg: {
        maxWidth: '250px',
        maxHeight: '200px'
    },
    uploadBtn: {
        padding: '4px'
    },
    ProfileAvatarBtnGrp: {
        display: 'flex',
        margin: theme.spacing(1)
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '1em 0.4em'
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '1em 0.4em'
    }
}));

const ProfilePage = (props) => {
    // material
    const classes = useStyles();
    // redux
    const userDetailStatus = useSelector(selectUserDetailStatus)
    const username = useSelector(selectUserUsername)
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (userDetailStatus === 'stale') {
            dispatch(fetchUserData())
        }
    }, [userDetailStatus, dispatch])

    return (
        <div className={classes.root}>
            <Typography className={classes.profileUsername} variant="h6"> Hello {username ? username : "User"} </Typography>
            <ProfileAvatar/>
            <ProfileCardStatDetail/>
            <ProfileCardUpdateForm/>s
        </div>
    )
}

const ProfileAvatar = (props) => {
    // material
    const classes = useStyles();
    // redux
    const dispatch = useDispatch()
    const avatarLink = useSelector(selectUserProfilePic)
    // notification
    const { enqueueSnackbar } = useSnackbar();
    // formik 
    const formik = useFormik({
        initialValues: {
            profile_picture: null,
        },
        onSubmit: (values, formikBag) => {
            const formData = new FormData()
            formData.append('profile_picture', values['profile_picture'])
            dispatch(editProfileData(formData))
            .then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    enqueueSnackbar('Updated Successfully', { 
                        variant: 'success',
                    });
                    
                } else {
                    const {
                        profile_picture,
                        non_field_errors
                    } = result.payload;

                    enqueueSnackbar(non_field_errors ? non_field_errors.toString() :`Error: ${profile_picture.toString()}`, { 
                        variant: 'error',
                    });
                }
                formikBag.setSubmitting(false)
            })
        }
    })
    
    return (
        <div className={classes.flexColumn}>
            <form className={classes.ProfileAvatarForm}>
                <input
                    accept="image/*"
                    id="contained-button-u"
                    type="file"
                    name="profile_picture"
                    className={classes.input_file}
                    onChange={(event) => {
                        formik.setFieldValue("profile_picture", event.currentTarget.files[0]);
                    }}
                />
                <img alt="go brrr" src={avatarLink ? avatarLink : "/assets/images/lOGOBIG.png"} className={classes.ProfileAvatarImg} />
                <div className={classes.ProfileAvatarBtnGrp}>
                    <label htmlFor="contained-button-u" style={{marginBottom: 0}}>
                        <IconButton color="default" aria-label="upload picture" component="span" className={classes.uploadBtn} size="small">
                            <PhotoCamera size="small" />
                        </IconButton>
                    </label>
                    <Button 
                    variant="contained" 
                    color="default" 
                    size="small" 
                    onClick={formik.handleSubmit}
                    disabled={formik.isSubmitting}
                    >
                        Update Avatar
                    </Button>
                </div>
            </form>
        </div>
    )
}

const ProfileCardStatDetail = (props) => {

    const classes = useStyles();
    // redux
    const cardsTotal = useSelector(selectCardsTotal);
    const decksTotal = useSelector(selectDeckTotal);

    return (
        <div className={classes.flexRow}>
            <div className={classes.profileCardMini}> Cards <span> {cardsTotal} </span></div>
            <div className={classes.profileCardMini}> Decks <span> {decksTotal} </span></div>
        </div>
    )
}

const ProfileCardUpdateForm = (props) => {

    // redux
    const dispatch = useDispatch()
    const userBday = useSelector(selectUserBdate)
    // notification
    const { enqueueSnackbar } = useSnackbar();

    // formik 
    const formik = useFormik({
        initialValues: {
            birth_date: userBday ? userBday : null
        },
        onSubmit: (values, formikBag) => {
            /* alert(JSON.stringify(values, null, 2)); */
            const formData = new FormData()
            formData.append('birth_date', values['birth_date'])
            dispatch(editProfileData(formData))
            .then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    enqueueSnackbar('Updated Successfully', { 
                        variant: 'success',
                    });
                } else {
                    const {
                        birth_date,
                        non_field_errors
                    } = result.payload;

                    enqueueSnackbar(non_field_errors ? non_field_errors.toString() :`Error: ${birth_date.toString()}`, { 
                        variant: 'error',
                    });
                    
                }
                formikBag.setSubmitting(false)
            })
        }
    })

    // material styles
    const classes = useStyles();

    return (
        <form noValidate className={classes.profileCard}>
            <TextField
                id="date"
                label="Birthday"
                type="date"
                name="birth_date"
                color="secondary"
                margin="dense"
                defaultValue={formik.values.birth_date}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={formik.handleChange}
            />
            <Button variant="contained" color="default" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
                Submit
            </Button>
        </form>
    )
}

export default ProfilePage;