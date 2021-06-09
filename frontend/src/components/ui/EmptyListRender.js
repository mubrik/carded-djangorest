import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles((theme) => ({
    emptyRoot: {
        display: 'grid',
        justifyContent: 'center',
        width: '100%'
    },
    text: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    Icon: {
        justifySelf: 'center',
    },
}));


const EmptyListRender = (props) => {
    // material
    const classes = useStyles();

    return(
        <div className={classes.emptyRoot}>
            <ArrowUpwardIcon fontSize="large" className={classes.Icon}/>
            <Typography variant={'h4'}> {props.children} </Typography>
        </div>
    )
}

export default EmptyListRender;