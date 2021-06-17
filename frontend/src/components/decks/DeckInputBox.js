import React from "react";
import { useFormik } from "formik";
import {TextField, Button} from "@material-ui/core";
import {useDispatch, } from "react-redux";
import { useSnackbar } from "notistack";
import {addNewDeck} from "./deckSlice";
import {InputFormLayout} from "../ui/uiFormat";
import * as Yup from "yup";

const CustomDeckInput = () => {
    // redux
    const dispatch = useDispatch();
    // notification
    const { enqueueSnackbar } = useSnackbar();
    // formik
    const formik = useFormik({
        initialValues: {deckName: "" },
        onSubmit: async (values, formikBag) => {
            // Do stuff here...
            const {deckName} = values;
            /* alert(JSON.stringify(values, null, 3)); */
            const requestBody = {
                name: deckName
            };
            dispatch(addNewDeck(requestBody))
                .then((result) => {
                    if (result.meta.requestStatus === "fulfilled") {
                        enqueueSnackbar("Deck Created", { 
                            variant: "success",
                        });
                        formikBag.resetForm();
                    } else {
                        enqueueSnackbar("Error creating deck", { 
                            variant: "error",
                        });
                    }
                });
        },
        validationSchema: Yup.object({
            deckName: Yup.string()
                .required("Required"),
        }),
        validateOnBlur: false
    });

    return (
        <>
            <InputFormLayout
                input={
                    <form className="baseForm" onSubmit={formik.handleSubmit} required>
                        <TextField 
                            label="Create Deck" 
                            variant="outlined" 
                            name="deckName" 
                            placeholder="Start typing to create a new deck"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.deckName}
                            size="small"
                            error={ formik.errors.deckName ? true : false}
                            helperText={formik.errors.deckName}
                            fullWidth/>
                    </form>
                }

                options={
                    <InputButtonGroup formik={formik}/>
                }
            />

        </>
    );
};

const InputButtonGroup = (props) => {
    const {formik} = props;

    return (
        <Button onClick={formik.handleSubmit} variant="outlined" color="secondary">Save Deck</Button>
    );
};

export {CustomDeckInput};