import React from 'react';
import { createRoot } from 'react-dom/client';
import { StoreContext } from 'redux-react-hook';
import store from './store/index';
import App from './view/app';
import './style/index.less';
import './style/index.css';

function Index() {
  return (
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  );
}
const root = createRoot(document.getElementById('root'));
root.render(<Index />);

