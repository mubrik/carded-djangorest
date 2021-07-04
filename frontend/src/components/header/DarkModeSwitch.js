import React from "react";
import Switch from "@material-ui/core/Switch";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles(() => ({
    root: {
        margin: 0
    }
}));

const DarkModeSwitch = () => {
    /* const {darkMode, setDarkMode} = {...props} */
    const theme = useTheme();
    const classes = useStyles();

    return(
        <FormControlLabel
            label="Dark Mode"
            className={classes.root}
            control={
                <Switch
                    checked={theme.darkMode.darkMode}
                    onChange={() => theme.darkMode.setDarkMode(state => !state)}
                    name="darkMode"
                    inputProps={{ "aria-label": "darkmode checkbox" }}
                />
            }
        />
    );
};

export default DarkModeSwitch;