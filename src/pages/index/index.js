import React from 'react';
import ReactDom from 'react-dom';
import { StoreContext } from 'redux-react-hook';
import store from './store/index';
import App from './view/app';

function Index() {
  return (
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  );
}

ReactDom.render(
  <Index />,
  document.getElementById('root'),
);
