import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import {useFormik } from 'formik';
import {TextField, Button,} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import {addNewCard} from './cardsSlice'
import {InputFormLayout} from '../ui/uiFormat'
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    baseCardForm: {
        width: '100%',
        marginBottom: theme.spacing(1),
        display: 'grid',
        gridTemplateRows: 'auto',
        gap: '1em'
    },
    cardFormButtonsGroup: {
        display: 'flex'
    },
    formButton: {
        margin: theme.spacing(1)
    },
    deleteButton: {
        margin: theme.spacing(1),
        color: theme.palette.warning.main,
        borderColor: theme.palette.warning.main,
    }
}));



const CustomCardInput = () => {
    
    // react 
    const [showInput, setShowInput] = useState(false);
    // redux
    const dispatch = useDispatch();
    // notification
    const { enqueueSnackbar } = useSnackbar();
    // formik
    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
        },
        onSubmit: async (values) => {
            const {title, content} = values;
            /* alert(JSON.stringify(values, null, 3)); */
            const requestBody = {
                title,
                content,
            };
            dispatch(addNewCard(requestBody))
            .then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    formik.handleReset()
                    setShowInput(false)
                    enqueueSnackbar('Card Created', { 
                        variant: 'success',
                    });
                } else {
                    enqueueSnackbar('Error creating card', { 
                        variant: 'error',
                    });
                }
            })
        }
    })
    // material classes
    const classes = useStyles()
    // handle focuseEvent
    const handleFocus = (e) => {
        setShowInput(true)
    }
    const handleClose = (e) => {
        setShowInput(false)
    }

    return(
        <InputFormLayout
        input={
            <form className={classes.baseCardForm} autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
                {showInput && 
                    <TextField 
                    id="title-basic" 
                    name="title" 
                    label="Title" 
                    variant="outlined"
                    color="secondary"
                    onChange={formik.handleChange} 
                    margin="dense"/>
                }
                    <TextField id="content-basic"
                    name="content" 
                    label="New Card" 
                    variant="outlined" 
                    color="secondary"
                    onChange={formik.handleChange} 
                    onFocus={handleFocus}
                    value={formik.values.content}
                    multiline 
                    fullWidth
                    placeholder="Start typing to add a new card"
                    />
                {showInput && 
                <div className={classes.cardFormButtonsGroup}>
                    <Button variant="outlined" color="secondary" onClick={formik.handleSubmit} className={classes.formButton}> Save Card</Button>
                    <Button variant="outlined" color="secondary" onClick={handleClose} className={classes.deleteButton}> Cancel</Button>
                </div>
                }
            </form>
        }

        options={
            <InputButtonGroup formik={formik} input={{showInput, setShowInput}}/>
        }
        
        />
    )
}

const InputButtonGroup = (props) => {
    const {input} = props;

    return (
        <Button onClick={() => input.setShowInput((state) => !state)}
        variant="outlined"
        color="secondary">{input.showInput ? 'Close' : 'Expand'}</Button>
    )
}

export default CustomCardInput;