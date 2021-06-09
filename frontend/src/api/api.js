import {useState, useEffect} from 'react'

const axios = require('axios');

// axios instance with base url
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/backend/',
    timeout: 4000,
});

//token handler for managing token auth, unexposed
const createTokenProvider = () => {

    /* Implementation */
    let token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH'))

    /* observer/subscriber list  */
    let observers = [];

    //fetch token
    const getToken = async () => {
        // if a valid token exists, return it
        if (token) {
            return token;
        }

        return null;
    };

    // return true if token != null
    const isLoggedIn = () => {
        return !!token;
    };

    // pushes a method from object subscribing
    const subscribe = (observer) => {
        observers.push(observer);
    };
    
    // removes method from object unsubscribing
    const unsubscribe = (observer) => {
        observers = observers.filter(_observer => _observer !== observer);
    };

    // notifies members in observers, basically running the method
    const notify = () => {
        const isLogged = isLoggedIn();
        observers.forEach(observer => observer(isLogged));
    };

    // sets token to local storage and instance token variable
    const setToken = (_token=null) => {

        if (_token) {
            localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(_token));
        } else {
            localStorage.removeItem('REACT_TOKEN_AUTH');
        }
        token = _token;
        notify();
    };

    return {
        getToken,
        isLoggedIn,
        setToken,
        subscribe,
        unsubscribe,
    };
};

// handler exposed for auth/login/token verification 
const createAuthProvider = () => {

    /* Implementation */

    // handler to set token
    const login = (token) => {
        tokenProvider.setToken(token);
    };
    
    // handler to remove token
    const logout = () => {
        tokenProvider.setToken(null);
    };

    // react hook to check auth status
    const useAuth = () => {

        const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());
    
        useEffect(() => {
            const listener = (newIsLogged) => {
                setIsLogged(newIsLogged);
            };
    
            tokenProvider.subscribe(listener);
            return () => {
                tokenProvider.unsubscribe(listener);
            };
        }, []);
    
        return isLogged;
    };

    // for making authenticated requests
    const server = () => {

        const prepareHeader = async () => {

            const tokenObj = await tokenProvider.getToken()
            let token = `Token ${tokenObj ? tokenObj['key'] : ''}`

            axiosInstance.defaults.headers.common['Authorization'] = token

        }

        const get = async (url, data) => {
            await prepareHeader()
            let response
            if (data) {
                response = await axiosInstance.get(url, {params: data})
                return response
            }
            response = await axiosInstance.get(url)
            return response
        }

        const post = async (url, data) => {
            await prepareHeader()
            let response = await axiosInstance.post(url, data)
            return response
        }
        
        const remove = async (url, data) => {
            await prepareHeader()
            let response = await axiosInstance.delete(url, data)
            return response
        }
        
        const edit = async (url, data) => {
            await prepareHeader()
            let response = await axiosInstance.put(url, data)
            return response
        }

        const getCookie = (name) => {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

        return {get, post, remove, edit, getCookie}
    }

    const apiFecthResource = server()

    return {
        useAuth,
        apiFecthResource,
        login,
        logout
    }
};

const tokenProvider = createTokenProvider()

export {tokenProvider};
export const {login, logout, useAuth, apiFecthResource} = createAuthProvider();