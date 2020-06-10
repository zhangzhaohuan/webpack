import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Link,
} from 'react-router-dom';
import Loadable from 'react-loadable';
import '../style/index.scss';
import '../style/index.css';

function Loading() {
  return <div>loading</div>;
}

const Home = Loadable({
  loader: () => import('@src/pages/index/view/home/index.js'),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import('@src/pages/index/view/login/index.js'),
  loading: Loading,
});

const App = () => {
  const goToSearch = () => {
    window.location.href = 'http://localhost:8080/search.html';
  };
  return (
    <div>
      <Router>
        <ul>
          <li><Link to="/login">login</Link></li>
          <li><Link to="/">home</Link></li>
          <div onClick={goToSearch} role="button">前往search页面</div>
        </ul>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Home} />
          <Route path="" exact component={Home} />
        </Switch>
      </Router>
      {/* <Chunk /> */}
    </div>
  );
};

export default App;
