import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ProSidebarProvider } from 'react-pro-sidebar';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ProSidebarProvider>
                <App />
            </ProSidebarProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
