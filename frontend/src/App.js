import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect,
} from "react-router-dom";
import { ThemeProvider  } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSnackbar } from "notistack";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import CustomSnackbarProvider from "./components/ui/SnackBarAlert";
import LoginForm from "./components/users/LoginForm";
import SignupForm from "./components/users/SignupForm";
import AboutPage from "./components/ui/AboutPage";
import CardList from "./components/cards/CardList";
import AddCardForm from "./components/cards/AddCardForm";
import EditCardForm from "./components/cards/EditCardForm";
import DeckList from "./components/decks/DeckList";
import HeaderBar from "./components/header/HeaderBar.js";
import ProfilePage from "./components/users/ProfilePage";
import AccountMangementPage from "./components/users/AccountMangementPage";
import ConfirmPasswordResetForm from "./components/users/ConfirmPasswordResetForm";
import ConfirmUserEmail from "./components/users/ConfirmUserEmail";
import SearchPage from "./components/search/SearchPage";
import NoMatchFound from "./components/ui/CustomNoMatchFound";
import {useAuth} from "./api/api";

function PrivateRoute({ children, ...rest }) {
    // auth
    let isAuthenticated = useAuth();
    // notification
    const { enqueueSnackbar } = useSnackbar();
    // React
    React.useEffect(() => {
        if (!isAuthenticated) {
            enqueueSnackbar("Logged Out", {variant: "warning", persist: false,});
        }
    }, [isAuthenticated, enqueueSnackbar]);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (children) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

function App() {

    let isAuthenticated = useAuth();
    let prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    let [darkMode, setDarkMode] = React.useState(false);
    let theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: darkMode ? "dark" : "light",
                    primary: {
                        light: "#ffffff",
                        main: "#f5f5f5",
                        dark: "#c2c2c2",
                        contrastText: "#fff",
                    },
                    secondary: {
                        light: "#ffc4ff",
                        main: "#ce93d8",
                        dark: "#9c64a6",
                        contrastText: "#000",
                    },
                    warning: {
                        main: "#b40000"
                    }
                },
                typography: {
                    fontFamily: [
                        "Open Sans",
                        "sans-serif",
                        "Segoe UI",
                    ].join(","),
                    fontSize: 14,
                },
                breakpoints: {
                    values: {
                        xs: 500,
                        sm: 600,
                        md: 960,
                        lg: 1280,
                        xl: 1920,
                        phones: 450,
                    },
                },
                darkMode: {
                    darkMode,
                    setDarkMode
                }
            }),
        [darkMode],
    );
    theme = responsiveFontSizes(theme, {factor:3});


    React.useEffect(() => {
        setDarkMode(prefersDarkMode);
    }, [prefersDarkMode]);

    return (
        <ThemeProvider theme={theme}>
            <CustomSnackbarProvider>
                <Router>
                    <HeaderBar
                        mainBody={
                            <Switch>
                                <Route path="/login" render={() => <LoginForm/>}/>
                                <Route path="/signup" render={() => <SignupForm/>}/>
                                <Route path="/about" render={() => <AboutPage/>}/>
                                <PrivateRoute path="/cards"><CardList/></PrivateRoute>
                                <PrivateRoute path="/card/new"><AddCardForm/></PrivateRoute>
                                <PrivateRoute path="/card/edit/:id"><EditCardForm/></PrivateRoute>
                                <PrivateRoute path="/deck"><DeckList/></PrivateRoute>
                                <PrivateRoute path="/profile"><ProfilePage/></PrivateRoute>
                                <PrivateRoute path="/account"><AccountMangementPage/></PrivateRoute>
                                <PrivateRoute path="/search"><SearchPage/></PrivateRoute>
                                <Route path="/password-reset/confirm/:uid/:token" render={() => <ConfirmPasswordResetForm/>}/>
                                <Route path="/accounts/confirm-email/:key" render={() => <ConfirmUserEmail/>}/>
                                <Route exact path="/">
                                    {
                                        isAuthenticated ? <Redirect to="/cards"/> : <Redirect to="/login"/>
                                    }
                                </Route>
                                <Route path="*" render={() => <NoMatchFound/>}/>
                            </Switch>
                        }
                    />
                </Router>
            </CustomSnackbarProvider>
        </ThemeProvider>
    );
}

export default App;