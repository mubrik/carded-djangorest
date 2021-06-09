import React from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      backgroundColor: theme.palette.primary.main,
    },
}));

const CustomBackdrop = (props) => {

    const classes = useStyles();

    return(
        <Backdrop open={true} color="primary" className={classes.backdrop}>
            <CircularProgress color="secondary"/>
        </Backdrop>
    )
}

/* export default CustomBackdrop; */
export default React.forwardRef((props, ref) => <CustomBackdrop {...props} forwardedRef={ref} />);