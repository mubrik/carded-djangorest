import React from "react";
import { useSelector, useDispatch} from "react-redux";
import { TextField } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {selectAllDecks, selectDecksStatus, fetchDecks} from "../decks/deckSlice";

const CustomSelect = ({formik, defaultArr}) => {

    const allDecksList = useSelector(selectAllDecks);
    const deckStatus = useSelector(selectDecksStatus);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (defaultArr && defaultArr.length > 0) {
            let arr = defaultArr.map(deck => deck.id);
            formik.setFieldValue("selectedDeck", arr, false);
        }
    }, []);
    
    React.useEffect(() => {
        if (deckStatus === "stale") {
            dispatch(fetchDecks());
        }
    }, [deckStatus]);
    
    const handleChange = (event, optionArray, reason) => {
        
        switch (reason) {
        case "select-option": {
            let arr = optionArray.map(deck => deck.id);
            formik.setFieldValue("selectedDeck", arr, false);
            break;
        } 
        case "remove-option":{
            let arr = optionArray.map(deck => deck.id);
            formik.setFieldValue("selectedDeck", arr, false);
            break;
        }
        
        case "clear":{
            formik.setFieldValue("selectedDeck", [], false);
            break;
        }
        
        default:
            break;
        }
    };

    return(
        <Autocomplete
            multiple
            freeSolo
            fullWidth
            filterSelectedOptions={true}
            autoComplete={true}
            margin={"dense"}
            id="tags-filled"
            options={allDecksList}
            defaultValue={defaultArr ? defaultArr : []}
            getOptionLabel={option => option.name}
            getOptionSelected={(option, value) => {
                if (option.id === value.id) return true;
                return false;
            }}
            renderTags={(deckList, getTagProps) =>
                deckList.map((deck, index) => (
                    <Chip variant="outlined" label={deck.name} key={deck.id} {...getTagProps({ index })} />
                ))
            }
            renderInput={(params) => (
                <TextField {...params} margin={"dense"} label="Select Deck" placeholder="..." />
            )}
            onChange={handleChange}
        />
    );
};

export default CustomSelect;