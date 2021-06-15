import React from 'react'
import {
  BrowserRouter as Router,
  Switch, useHistory,
  Route,
  Redirect,
} from 'react-router-dom'
import { ThemeProvider  } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSnackbar } from 'notistack';
import { createMuiTheme } from '@material-ui/core/styles';
import CustomSnackbarProvider from './components/ui/SnackBarAlert'
import LoginForm from './components/users/LoginForm'
import SignupForm from './components/users/SignupForm'
import CardList from './components/cards/CardList'
import AddCardForm from './components/cards/AddCardForm'
import EditCardForm from './components/cards/EditCardForm'
import DeckList from './components/decks/DeckList'
import HeaderBar from './components/header/HeaderBar.js'
import ProfilePage from './components/users/ProfilePage'
import AccountMangementPage from './components/users/AccountMangementPage'
import ConfirmPasswordResetForm from './components/users/ConfirmPasswordResetForm'
import ConfirmUserEmail from './components/users/ConfirmUserEmail'
import SearchPage from './components/search/SearchPage'
import NoMatchFound from './components/ui/CustomNoMatchFound'
import {useAuth} from './api/api'

function PrivateRoute({ children, ...rest }) {
    // auth
    let isAuthenticated = useAuth();
    // notification
    const { enqueueSnackbar } = useSnackbar();
    // router
    const history = useHistory()
    // React
    React.useEffect(() => {
        if (!isAuthenticated) {
            enqueueSnackbar('Logged Out', {variant: 'warning', persist: false,})
        }
    }, [isAuthenticated, enqueueSnackbar])

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
    let prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    let [darkMode, setDarkMode] = React.useState(false)
    const prefTheme = React.useMemo(
        () =>
          createMuiTheme({
            palette: {
              type: darkMode ? 'dark' : 'light',
              primary: {
                light: '#ffffff',
                main: '#f5f5f5',
                dark: '#c2c2c2',
                contrastText: '#fff',
              },
              secondary: {
                light: '#ffc4ff',
                main: '#ce93d8',
                dark: '#9c64a6',
                contrastText: '#000',
              },
              warning: {
                main: '#b40000'
              }
            },
            typography: {
              fontFamily: [
                'Open Sans',
                'sans-serif',
                "Segoe UI",
              ].join(','),
              fontSize: 14,
            },
            darkMode: {
                darkMode,
                setDarkMode
            }
          }),
        [darkMode],
    );

    React.useEffect(() => {
        setDarkMode(prefersDarkMode)
    }, [prefersDarkMode])

    return (
        <ThemeProvider theme={prefTheme}>
            <CustomSnackbarProvider>
                <Router>
                    <HeaderBar
                    mainBody={
                        <Switch>
                            <Route path="/login" render={() => <LoginForm/>}/>
                            <Route path="/signup" render={() => <SignupForm/>}/>
                            <PrivateRoute path="/cards" children={<CardList/>}/>
                            <PrivateRoute path="/card/new" children={<AddCardForm/>}/>
                            <PrivateRoute path="/card/edit/:id" children={<EditCardForm/>}/>
                            <PrivateRoute path="/deck" children={<DeckList/>}/>
                            <PrivateRoute path="/profile" children={<ProfilePage/>}/>
                            <PrivateRoute path="/account" children={<AccountMangementPage/>}/>
                            <PrivateRoute path="/search" children={<SearchPage/>}/>
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
    )
}

export default App