
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Link,
} from 'react-router-dom';
import Loadable from 'react-loadable';
import $ from 'jquery';

// import Chunk from './index/chunk';

import '../style/search.scss';
import '../style/search2.scss';

// css module scc test
import styles from '../style/search.module.scss';


function Loading() {
  return <div>loading</div>;
}

const Search = Loadable({
  loader: () => import('@src/pages/search/view/search/index.js'),
  loading: Loading,
});
const Detail = Loadable({
  loader: () => import('@src/pages/search/view/detail/index.js'),
  loading: Loading,
});

const App = () => {
  const handel = () => {
    $('#Js_demo').css({ color: '#ff0011', background: 'blue' });
  };

  const goToLogin = () => {
    window.location.href = 'http://localhost:8080/index.html';
  };

  return (
    <div className="search2">
      <Router>
        <ul>
          <li><Link to="/detail">detail</Link></li>
          <li><Link to="/">搜索首页</Link></li>
          <div onClick={goToLogin} role="button">前往登录页面</div>
        </ul>
        <Switch>
          <Route path="/detail" component={Detail} />
          <Route path="/" component={Search} />
        </Switch>
      </Router>

      <div className={styles.name}>
        <div>
          <div className={styles.age}>
            css module
          </div>
        </div>
      </div>
      <div className="name">css2 module </div>

      <div id="Js_demo" onClick={handel} role="button">Js_demo</div>


      {/* <Chunk /> */}

    </div>
  );
};

export default App;
