import React from "react";
import LogoutDialog from "./LogoutDialog";
import {useDispatch} from "react-redux";
import {IconButton} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {userLogout} from "../users/authenticationSlice";


export default function LogoutButton() {

    // logout dialog
    const [openLogout, setOpenLogout] = React.useState(false);
    // redux
    const dispatch = useDispatch();

    const handleLogoutClick = () => {
        setOpenLogout(true);
    };
    
    const handleLogoutCancel = () => {
        setOpenLogout(false);
    };

    const handleLogoutConfirm = () => {
        dispatch(userLogout(history));
    };

    const logDialogProps = {
        handleLogoutConfirm,
        handleLogoutCancel,
        openLogout
    };

    return (
        <>
            <IconButton onClick={handleLogoutClick}>
                <ExitToAppIcon />
            </IconButton>
            {openLogout && <LogoutDialog {...logDialogProps}/>}
        </>
    );
}