import React from 'react';
import ReactDom from 'react-dom';
import { StoreContext } from "redux-react-hook";
import store from './store/index';
import App from './view/app';

function Index(props) {
    return (
        <StoreContext.Provider value={store}>
            {props.children}
        </StoreContext.Provider>
    )
}

ReactDom.render(
    <Index><App /></Index>,
    document.getElementById('root')
);