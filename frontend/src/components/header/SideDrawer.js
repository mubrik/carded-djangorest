import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer';
import {
    List, Divider, IconButton, Collapse,
    ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BookRoundedIcon from '@material-ui/icons/BookRounded';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const drawerWidth = 180;

const ListItemLink = (props) => {
    const { icon, primary, to } = props;
  
    const renderLink = React.useMemo(
      () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
      [to],
    );
  
    return (
      <li>
        <ListItem button component={renderLink}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
}

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
        },
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    drawerPaper: {
        width: drawerWidth,
    },
}));

const SideDrawer = (props) => {

    const {open, handleDrawerClose, isAuthenticated} = props;

    // material classes
    const classes = useStyles();
    const theme = useTheme();
    // collapsible menu
    const [showCollapse, setShowCollapse] = React.useState(true);

    const handleCollapseClick = () => {
        setShowCollapse(!showCollapse);
    };

    return(
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                { !isAuthenticated && 
                <>
                    <ListItemLink
                        primary={'Login'}
                        to={'/login'}
                        key={'login'}
                    />
                    <ListItemLink
                        primary={'Register'}
                        to={'/signup'}
                        key={'signup'}
                    />
                </>
                }
                { isAuthenticated && 
                <>
                    <ListItemLink
                        icon={<BookRoundedIcon color="secondary"/>}
                        primary={'Cards'}
                        to={'/cards'}
                        key={'Cards'}
                    />
                    <ListItemLink
                        icon={<LibraryBooksRoundedIcon color="secondary"/>}
                        primary={'Decks'}
                        to={'/deck'}
                        key={'Decks'}
                    />
                    <ListItemLink
                        icon={<AddBoxRoundedIcon color="secondary"/>}
                        primary={'Create Card'}
                        to={'/card/new'}
                        key={'Create Card'}
                    />
                    <ListItem button onClick={handleCollapseClick}>
                        <ListItemIcon>
                            <AccountCircleIcon color="secondary"/>
                        </ListItemIcon>
                        <ListItemText primary="Account" />
                        {showCollapse ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={showCollapse} timeout="auto" unmountOnExit>
                        <ListItemLink
                            icon={<AccountCircleIcon color="secondary" />}
                            primary={'Profile'}
                            to={'/profile'}
                            key={'Profile'}
                            disablePadding
                        />
                        <ListItemLink
                            icon={<AccountCircleIcon color="secondary" />}
                            primary={'Password'}
                            to={'/account'}
                            key={'Account Management'}
                            disablePadding
                        />

                    </Collapse>
                </>
                }
            </List>
            <Divider />
        </Drawer>
    )
}

export default SideDrawer;