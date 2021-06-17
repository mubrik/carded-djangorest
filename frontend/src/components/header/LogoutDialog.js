import React from "react";
import {Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const LogoutDialog = (props) => {

    const {openLogout, handleLogoutCancel, handleLogoutConfirm} = props;

    return(
        <>
            <Dialog open={openLogout} onClose={handleLogoutCancel} aria-labelledby="alert-dialog-title">
                <DialogTitle>{"Confirm Logout?"}</DialogTitle>
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
};

export default LogoutDialog;