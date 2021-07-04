import React from "react";
import Button from "@material-ui/core/Button";
import {makeStyles } from "@material-ui/core/styles";
import BookRoundedIcon from "@material-ui/icons/BookRounded";
import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";
import {Link as RouterLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    }
}));

const NavButton = (props) => {

    // material classes
    const classes = useStyles();
    // icon mangement
    let IconToUse;

    switch (props.icon) {
    case "card":
        IconToUse = BookRoundedIcon;
        break;
    case "deck":
        IconToUse = LibraryBooksRoundedIcon;
        break;
    default:
        break;
    }

    return(
        <Button
            component={RouterLink}
            variant="contained"
            color="secondary"
            size={"small"}
            classes={{
                root: classes.root
            }}
            startIcon={<IconToUse/>}
            to={props.to}
        >
            {props.primary}
        </Button>
    );
};

export default NavButton;
