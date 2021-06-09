import React from 'react'
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import { useAuth} from '../../api/api'
import {useDispatch} from 'react-redux'
import {fetchCards} from '../cards/cardsSlice'
import {fetchDecks} from '../decks/deckSlice'
import AccountNavButton from './AccountNavButton'
import SearchForm from './SearchForm'
import NavButton from './NavButton'
import SideDrawer from './SideDrawer'
import MobileHeaderDropdown from './MobileHeaderDropdown'
import DarkModeSwitch from './DarkModeSwitch'

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        fontSize: theme.typography.fontSize,
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightLight,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 24,
    },
    hide: {
        display: 'none',
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
    grow: {
        flexGrow: 1,
        flexShrink: 1,
    },
    headerImg: {
        display: 'none',
        height: '34px',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    navButton: {
        margin: theme.spacing(1),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(2),
          width: 'auto',
        },
    },
    sectionDesktop: {
        display: 'none',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        }
    },
    content: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    wrapperMain: {
        minHeight: `calc(97vh - ${theme.mixins.toolbar.minHeight}px)`,
        position: 'relative;',
        padding: '.5em .5em;',
    }
}));

const HeaderBar = (props) => {

    // main body
    const {mainBody} = props;
    // redux
    const dispatch = useDispatch();
    // auth 
    const isAuthenticated = useAuth();
    // material classes
    const classes = useStyles();
    // drawer open
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleTestClick = () => {
        dispatch(fetchCards())
        dispatch(fetchDecks())
    }

    const drawerProps = {
        open,
        handleDrawerClose,
        isAuthenticated
    }

    return (
        <div className={classes.root}>
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar variant="dense">
                <IconButton
                    color="secondary"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                    })}
                >
                    <MenuIcon />
                </IconButton>
                <img 
                className={classes.headerImg}
                alt={'title'}
                src={'/assets/images/lOGOBIG.png'}/>
                { isAuthenticated && 
                <>
                    <div className={classes.sectionMobile}>
                        <MobileHeaderDropdown isAuthenticated={isAuthenticated}/>
                    </div>
                    <div className={classes.sectionDesktop}>
                        <NavButton icon={'card'} to={'/cards'} primary={'Cards'}/>
                        <NavButton icon={'deck'} to={'/deck'} primary={'Decks'}/>
                        <SearchForm className={classes.search}/>
                    </div>                    
                    <div className={classes.grow} />
                    <div className={classes.sectionMobile}>
                        <SearchForm className={classes.search}/>
                    </div>
                    <div className={classes.sectionDesktop}>
                        <DarkModeSwitch/>
                        <Button
                            variant="contained"
                            startIcon={<ExitToAppIcon/>}
                            className={classes.navButton}
                            onClick={() => handleTestClick()}
                        >
                            Test sction
                        </Button>
                        <AccountNavButton className={classes.navButton}/>
                    </div>
                </>
                }
                { !isAuthenticated && 
                <>
                    <div className={classes.sectionMobile}>
                        <MobileHeaderDropdown isAuthenticated={isAuthenticated}/>
                    </div>
                    <div className={classes.sectionDesktop}>
                        <NavButton icon={'card'} to={'/login'} primary={'Login'}/>
                        <NavButton icon={'deck'} to={'/signup'} primary={'Register'}/>
                    </div>                    
                    <div className={classes.grow} />
                </>
                }
            </Toolbar>
        </AppBar>
        <SideDrawer {...drawerProps}/>
        <main className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
            <div className={classes.toolbar} />
            <div className={classes.wrapperMain}>
                {mainBody}
            </div>
        </main>
        </div>
    );    
}

export default HeaderBar;
