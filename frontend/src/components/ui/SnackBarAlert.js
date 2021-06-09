import React from 'react'
import { SnackbarProvider } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SlideTransition from './SlideTransition'


const notistackRef = React.createRef();
const onClickDismiss = key => () => { 
    notistackRef.current.closeSnackbar(key);
}

const CustomSnackbarProvider = (props) => {

    return(
        <SnackbarProvider 
            dense
            preventDuplicate
            maxSnack={3} 
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            TransitionComponent={SlideTransition}
            ref={notistackRef}
            action={(key) => (
            <IconButton onClick={onClickDismiss(key)}>
                <CloseIcon/>
            </IconButton>)}
        >
          {props.children}
        </SnackbarProvider>
    )
}

export default CustomSnackbarProvider;