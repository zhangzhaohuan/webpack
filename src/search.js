
import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Loadable from "react-loadable";
const  _ = require('lodash/lang');


// import Chunk from './index/chunk';

import './search.scss';
import './search2.scss';

// css module scc test
import styles from './styles/search.module.scss';


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
        const array = [1,2];
        const newArray = _.cloneDeep(array);
    }

    handel=()=>{
    }

    goToLogin = () => {
        window.location.href = 'http://localhost:80/index.html'
    }
    render() {
        return (
            <div className='search2'>
                <Router>
                    <ul>
                        <li><Link to='/'>搜索首页</Link></li>
                        <li><Link to='/detail'>detail</Link></li>
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