import React, {useState} from "react";
import {useFormik } from "formik";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useSnackbar } from "notistack";
import {
    removeCard, selectCardById, editCard,
    selectCardsStatus
} from "./cardsSlice";
import Slide from "@material-ui/core/Slide";
import Skeleton from "@material-ui/lab/Skeleton";
import {Button, IconButton, Dialog, DialogActions, DialogTitle, DialogContent, TextField, makeStyles} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
/* boxShadow: '-1px 1px 5px 1px rgb(142 142 142 / 75%)', */
const useStyles = makeStyles((theme) => ({
    deleteButton: {
        color: theme.palette.warning.main,
    },
    cardMain: {
        display: "grid",
        position: "relative",
        gridTemplateRows: "auto 1fr auto",
        cursor: "pointer",
        padding: "0.2em",
        borderRadius: ".4em",
        overflow: "hidden",
        boxShadow: `0px 0px 1px 0px ${theme.palette.text.primary}`,
        width: "auto",
        minWidth: "150px",
        maxWidth: "calc((95vw / 2) - 28px)",
        minHeight: "220px",
        maxHeight: "305px",
        margin: "0.3em 0.5em",
        [theme.breakpoints.up("xs")]: {
            maxWidth: "calc((95vw / 2) - 28px)",
            minWidth: "180px"
        },
        [theme.breakpoints.up("sm")]: {
            maxWidth: "calc((95vw / 3) - 15px)",
            minWidth: "190px"
        },
        [theme.breakpoints.up("md")]: {
            maxWidth: "calc((95vw / 4) - 15px)",
            minWidth: "200px"
        },
        [theme.breakpoints.up("lg")]: {
            maxWidth: "calc((95vw / 5) - 15px)",
            minWidth: "210px"
        },
        [theme.breakpoints.up("xl")]: {
            maxWidth: "calc((95vw / 6) - 15px)",
            minWidth: "220px"
        },
    },
    cardSubject: {
        padding: ".3em",
        borderBottom: `1px solid ${theme.palette.secondary.dark}`,
        fontWeight: "600",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    cardContent: {
        position: "relative",
        overflow: "hidden",
        overflowWrap: "break-word",
        whiteSpace: "normal",
        wordBreak: "break-all",
        padding: ".3em",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        fontSize: "1rem"
    },
    cardExtras: {
        padding: ".2em",
        display: "flex",
        justifySelf: "stretch",
        overflow: "hidden",
        justifyContent: "space-around"
    },

}));

const CardBody = (props) => {

    const id = props.id;
    // react
    const [showDialog, setShowDialog] = useState(false);
    // redux
    const cardsStatus = useSelector(selectCardsStatus);
    const dispatch = useDispatch();
    const card = useSelector(state => selectCardById(state, id));
    // router-dom
    let history = useHistory();
    // material
    const classes = useStyles();
    // notification 
    const { enqueueSnackbar } = useSnackbar();
    const renderButtons = props.renderButtons ? props.renderButtons : true;

    const handleDeleteClicked = () => {
        dispatch(removeCard(id))
            .then((result) => {
                if (result.meta.requestStatus === "fulfilled") {
                    enqueueSnackbar("Card Deleted", { 
                        variant: "success",
                    });
                } else {
                    enqueueSnackbar("Error removing item", { 
                        variant: "error",
                    });
                }
            });
    };

    const handleCardBodyClick = () => {
        setShowDialog(true);
    };

    const handleEditClicked = () => {
        history.push(`/card/edit/${id}`);
    };

    const cardprops = {
        id,
        handleDeleteClicked,
        showDialog,
        setShowDialog,
    };
    
    return (
        <>
            {cardsStatus === "updated" &&
        <>
            <div className={classes.cardMain} >
                <div className={classes.cardSubject}>
                    {card.title}
                </div>
                <div className={classes.cardContent} data-index={id} onClick={() => handleCardBodyClick()}>
                    {card.content}
                </div>
                { renderButtons &&
                    <div className={classes.cardExtras}>
                        <Button color="default" size="small" href="" data-index={id} onClick={() => handleEditClicked()}>
                            Edit
                        </Button>
                        <DeleteDialogSlide cardProps={cardprops}/>
                    </div>
                }
            </div>
            {showDialog && <EditCardDialogForm state={cardprops}/>}
        </>
            }
            {cardsStatus === "stale" &&
        <>
            <div className={classes.cardMain} >
                <Skeleton variant="rect" height={220} animation="wave"/>
            </div>
        </>
            }
        </>
    );
};

const EditCardDialogForm = (props) => {

    // state
    const {id, showDialog, setShowDialog} = props.state;
    //notification
    const { enqueueSnackbar } = useSnackbar();

    //redux
    const dispatch = useDispatch();
    let card  = useSelector(state => selectCardById(state, id));

    // formik, using hook to make form layout easier
    const formik = useFormik({
        initialValues: {
            title: card["title"],
            content: card["content"],
        },
        onSubmit: (values) => {
            // Do stuff here...
            const {title, content} = values;
            /* alert(JSON.stringify(values, null, 3)); */
            const requestBody = {
                id,
                title,
                content,
            };
            dispatch(editCard({id, requestBody}))
                .then((result) => {
                    if (result.meta.requestStatus === "fulfilled") {
                        enqueueSnackbar("Card Updated", { 
                            variant: "success",
                        });
                    } else {
                        enqueueSnackbar("Error updating item", { 
                            variant: "error",
                        });
                    }
                });
            setShowDialog(false);
        }
    });

    // handle dialog
    const handleClose = () => setShowDialog(false);

    return (
        <>
            <Dialog open={showDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-card">{formik.values.title}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        variant="outlined"
                        color="secondary"
                        id="titleDialog"
                        label="Title"
                        type="text"
                        fullWidth
                        name='title'
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        variant="outlined"
                        color="secondary"
                        id="contentDialog"
                        label="Content"
                        name='content'
                        multiline
                        rows={7}
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.content}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                Cancel
                    </Button>
                    <Button color="default" onClick={formik.handleSubmit}>
                Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
  
const DeleteDialogSlide = (props) => {
    //react 
    const [open, setOpen] = React.useState(false);
    // material
    const classes = useStyles();
    //destructure
    const {handleDeleteClicked} =props.cardProps;
  
    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleConfirm = () => {
        setOpen(false);
        handleDeleteClicked();
    };
  
    return (
        <div>
            <IconButton 
                aria-label="delete"
                onClick={handleClickOpen}
                size="small"
            >
                <DeleteIcon fontSize="small" />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-slide-prompt"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-prompt">{"Delete this Item?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
              Cancel
                    </Button>
                    <Button onClick={handleConfirm} className={classes.deleteButton}>
              Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default CardBody;