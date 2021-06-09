import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const newCardStyles = makeStyles((theme) => ({
    wrapperMain: {
        padding: '0.4em 1em',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        borderRadius: '.4em'
    },
    flex: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        boxShadow: `0px 0px 1.5px 0px ${theme.palette.text.primary}`,
        background: `linear-gradient(
            180deg,
            ${theme.palette.background.default} 98%,
            ${theme.palette.secondary.light}f5 100%)`,
        borderRadius: '8px',
        padding: theme.spacing(1)
    },
    formCtl: {

    }
}));

export default newCardStyles;