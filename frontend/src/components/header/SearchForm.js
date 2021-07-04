import React from "react";
import {useFormik } from "formik";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles } from "@material-ui/core/styles";
import {searchCards} from "../search/searchSlice";

const useStyles = makeStyles((theme) => ({
    searchIcon: {
        padding: theme.spacing(0.8, 1.6),
        /* height: '100%', */
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
    },
    inputRoot: {
        border: `1px solid ${theme.palette.secondary.dark}`,
        borderRadius: ".5em",
        color: theme.palette.text.primary,
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

const SearchForm = (props) => {
    // material styles
    const classes = useStyles();
    // redux
    const dispatch = useDispatch();
    // react router
    const history = useHistory();
    // formik
    const formik  = useFormik({
        initialValues: {
            searchValue: ""
        },
        onSubmit: async(values) => {
            dispatch(searchCards(values));
            history.push("/search");
        }
    });

    return(
        <div className={props.className}>
            <form onSubmit={formik.handleSubmit}>
                <div className={classes.searchIcon}>
                    <SearchIcon color="secondary"/>
                </div>
                <InputBase
                    placeholder="Search…"
                    type="search"
                    name="searchValue"
                    onSubmit={formik.handleSubmit}
                    value={formik.values.searchValue}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                />
            </form>
        </div>
    );
};

export default SearchForm;