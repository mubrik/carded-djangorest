import React from 'react';
import { useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {clearCards} from '../cards/cardsSlice'
import {Dialog, DialogActions, DialogTitle} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SlideTransition from '../ui/SlideTransition'
import {userLogout} from '../users/authenticationSlice'

const AccountNavButton = (props) => {

    // react-router
    const history = useHistory()
    // redux
    const dispatch = useDispatch()
    // anchor element for menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    // logout dialog
    const [openLogout, setOpenLogout] = React.useState(false);
    //
    const { forwardedRef, ...bprops } = props;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (event) => {
        let path = event.target.getAttribute('href')
        handleClose()
        history.push(path)
    }

    const handleLogoutClick = () => {
        handleClose()
        setOpenLogout(true)
    }
    
    const handleLogoutCancel = () => {
        setOpenLogout(false)
    }

    const handleLogoutConfirm = () => {
        dispatch(userLogout(history))
    }

    return (
        <>
        <Button aria-controls="account-menu" 
            aria-haspopup="true" 
            onClick={handleClick} 
            startIcon={<AccountCircleIcon/>} 
            className={props.className}
            variant="contained"
            size={'small'}
            color="secondary"
            ref={forwardedRef}
            {...bprops}
        >
            Account
        </Button>
        <Menu
            id="account-menu"
            variant="menu"
            TransitionComponent={SlideTransition}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={(e) => handleMenuItemClick(e)} href={'/profile'}>Profile</MenuItem>
            <MenuItem onClick={(e) => handleMenuItemClick(e)} href={'/account'}>My account</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
        <Dialog open={openLogout} onClose={handleLogoutCancel} aria-labelledby="alert-dialog-title">
            <DialogTitle>{'Confirm Logout?'}</DialogTitle>
            <DialogActions>
                <Button onClick={handleLogoutCancel} color="default" variant='outlined'>
                    Cancel
                </Button>
                <Button onClick={handleLogoutConfirm} color="secondary" variant='outlined' autoFocus>
                    Logout
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default React.forwardRef((props, ref) => <AccountNavButton {...props} forwardedRef={ref} />);