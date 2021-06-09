import React from 'react';
import Switch from '@material-ui/core/Switch';
import { useTheme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const DarkModeSwitch = (props) => {
    /* const {darkMode, setDarkMode} = {...props} */
    const theme = useTheme();

    return(
        <FormControlLabel
        label="Dark Mode"
        control={
            <Switch
                checked={theme.darkMode.darkMode}
                onChange={() => theme.darkMode.setDarkMode(state => !state)}
                name="darkMode"
                inputProps={{ 'aria-label': 'darkmode checkbox' }}
            />
        }
        />
    )
}

export default DarkModeSwitch;