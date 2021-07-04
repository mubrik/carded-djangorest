import React from "react";
import { useHistory, useLocation} from "react-router-dom";
import SlideTransition from "../ui/SlideTransition";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";

const MobileHeaderDropdown = (props) => {

    // react-router
    const history = useHistory();
    const {pathname} = useLocation();
    // auth 
    const {isAuthenticated} = props;
    // anchor element for menu
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (event) => {
        let path = event.target.getAttribute("href");
        handleClose();
        history.push(path);
    };
    
    return (
        <>
            {isAuthenticated && 
        <>
            <Button aria-controls="dropdown-auth-menu" 
                aria-haspopup="true" 
                onClick={handleClick} 
                startIcon={<ArrowDropDownRoundedIcon/>} 
                className={props.className}
                variant="contained"
                size={"small"}
                color="secondary">
                {pathname ? pathname.slice(1) : "Dropdown"}
            </Button>
            <Menu
                id="dropdown-auth-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={SlideTransition}
            >
                <MenuItem onClick={(e) => handleMenuItemClick(e)} href={"/cards"}>Cards</MenuItem>
                <MenuItem onClick={(e) => handleMenuItemClick(e)} href={"/deck"}>Decks</MenuItem>
                <MenuItem onClick={(e) => handleMenuItemClick(e)} href={"/profile"}>Profile</MenuItem>
                <MenuItem onClick={(e) => handleMenuItemClick(e)} href={"/account"}>My account</MenuItem>
            </Menu>
        </>
            }
            { !isAuthenticated && 
        <>
            <Button aria-controls="dropdown-auth-menu" 
                aria-haspopup="true" 
                onClick={handleClick} 
                startIcon={<ArrowDropDownRoundedIcon/>} 
                className={props.className}
                variant="contained"
                size={"small"}
                color="secondary">
                {pathname ? pathname.slice(1) : "Dropdown"}
            </Button>
            <Menu
                id="dropdown-auth-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={SlideTransition}
            >
                <MenuItem onClick={(e) => handleMenuItemClick(e)} href={"/login"}>Login</MenuItem>
                <MenuItem onClick={(e) => handleMenuItemClick(e)} href={"/signup"}>Register</MenuItem>
            </Menu>
        </>
            }
        </>
    );
};

export default MobileHeaderDropdown;