import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Slide from "@material-ui/core/Slide";
import clsx from "clsx";
import {selectDeckById, updateActiveDeck, removeDeckById, selectActiveDeck} from "./deckSlice";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
    deleteIconOutlinedColorPrimary: {
        color: theme.palette.warning.light,
        "&:hover": {
            color:"#e61e1eb3"
        }
    },
    clickableColorPrimary: {
        background: theme.palette.background.paper,
    },
    root: {
        margin: "0.3em 0.2em",
        boxShadow: "-2px 1px 2px 0px rgb(50 50 50 / 65%)",
        color: theme.palette.text.primary,
        "&$active": {
            background: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            "&:hover": {
                background: theme.palette.secondary.dark,
            }
        },
    },
    deleteButton: {
        color: theme.palette.warning.main,
    },
    active: {}
}));
  
const DeckItem = (props) => {

    const id = props.id;
    //react 
    const [openDelete, setOpenDelete] = React.useState(false);
    // redux
    const dispatch = useDispatch();
    const deck = useSelector(state => selectDeckById(state, id));
    const activeDeck = useSelector(selectActiveDeck);
    // notification 
    const { enqueueSnackbar } = useSnackbar();
    // material
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpenDelete(true);
    };
    
    const handleClose = () => {
        setOpenDelete(false);
    };

    const handleDeleteClick = () => {
        // implement dispatch state with curr deck id
        dispatch(removeDeckById(id))
            .then((result) => {
                if (result.meta.requestStatus === "fulfilled") {
                    enqueueSnackbar("Deck Deleted", { 
                        variant: "success",
                    });
                } else {
                    enqueueSnackbar("Error removing item", { 
                        variant: "error",
                    });
                }
            });
    };
    const handleDeckClick = () => {
        // implement update state with curr deck id
        dispatch(updateActiveDeck(id));
    };

    const delProps = {
        openDelete,
        handleClose,
        handleDeleteClick
    };

    return(
        <>
            <Chip 
                label={deck.name} 
                onDelete={handleClickOpen} 
                onClick={() => handleDeckClick(deck.id)} 
                color="primary" 
                variant="outlined"
                classes={{
                    root: classes.root,
                    deleteIconOutlinedColorPrimary: classes.deleteIconOutlinedColorPrimary,
                }}
                className={clsx({
                    [classes.active]: activeDeck === id,
                })}
                clickable
            />
            <DeleteDialogSlide {...delProps}/>
        </>
    );
};

const DeleteDialogSlide = (props) => {

    // material
    const classes = useStyles();
    
    const {
        openDelete,
        handleClose,
        handleDeleteClick
    } = props;

    
    const handleConfirm = () => {
        handleClose();
        handleDeleteClick();
    };
  
    return (
        <>
            <Dialog
                open={openDelete}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Delete this Item?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
              Cancel
                    </Button>
                    <Button onClick={handleConfirm} className={classes.deleteButton}>
              Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default DeckItem;