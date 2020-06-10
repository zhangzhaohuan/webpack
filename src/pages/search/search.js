
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Loadable from "react-loadable";
import $ from 'jquery';

// import Chunk from './index/chunk';

import './style/search.scss';
import './style/search2.scss';

// css module scc test
import styles from './style/search.module.scss';


function Loading() {
    return <div>loading</div>
}

const Search = Loadable({
    loader: () => import("@component/search/index.js"),
    loading: Loading
});
const Detail = Loadable({
    loader: () => import("@component/detail/index.js"),
    loading: Loading
});

class Demo2 extends React.Component {
    componentDidMount(){
        console.log($);
    }

    handel=()=>{
        $('#Js_demo').css({ "color": "#ff0011", "background": "blue" });
    }

    goToLogin = () => {
        window.location.href = 'http://localhost:80/index.html'
    }
    render() {
        return (
            <div className='search2'>
                <Router>
                    <ul>
                        <li><Link to='/detail'>detail</Link></li>
                        <li><Link to='/'>搜索首页</Link></li>
                        <div onClick={this.goToLogin}>前往登录页面</div>
                    </ul>
                    <Switch>
                        <Route path='/detail' component={Detail} ></Route>
                        <Route path='/'  component={Search} ></Route>
                    </Switch>
                </Router>

                <div className={styles.name}>
                    <div>
                        <div className={styles.age}>
                            css module
                        </div>
                    </div>
                </div>
                <div className='name'>css2 module </div>

                <div id='Js_demo' onClick={this.handel}>Js_demo</div>
            

                {/* <Chunk /> */}

            </div>
        )
    }
}

ReactDom.render(
    <Demo2 />,
    document.getElementById('root')
);