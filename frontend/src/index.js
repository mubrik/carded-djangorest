import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
/* import './scss/main.scss'; */
import store from "./app/store";
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline/>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root"));