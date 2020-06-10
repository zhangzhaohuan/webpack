
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Loadable from "react-loadable";
import './style/index.scss';
import './style/index.css';

function Loading() {
    return <div>loading</div>
}

const Home = Loadable({
    loader: () => import("@component/home/index.js"),
    loading: Loading
});
const Login = Loadable({
    loader: () => import("@component/login/index.js"),
    loading: Loading
});
class Demo extends React.Component {
    componentDidMount() {
        console.log(process.env.NODE_ENV);

    }

    goToSearch = () => {
        console.log('sdfasfsas');
        window.location.href = 'http://localhost:80/search.html'
    }

    render() {
        return (
            <div>
                <Router>
                    <ul>
                        <li><Link to='/login'>login</Link></li>
                        <li><Link to='/'>home</Link></li>
                        <div onClick={this.goToSearch}>前往search页面</div>
                    </ul>
                    <Switch>
                        <Route path='/login' component={Login} ></Route>
                        <Route path='/' exact component={Home} ></Route>
                        <Route path='' exact component={Home} ></Route>
                    </Switch>
                </Router>
                {/* <Chunk /> */}
            </div>
        )
    }
}

ReactDom.render(
    <Demo />,
    document.getElementById('root')
);