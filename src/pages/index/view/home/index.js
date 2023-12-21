import React, { useCallback } from "react";
import $ from "jquery";
import { useDispatch, useMappedState } from "redux-react-hook";

import Image from "@asset/image/001.jpg";
import Image2 from "@asset/image/002.jpg";
import axios from "axios";

const Index = () => {
  const mapState = useCallback((state) => state.commonReducer, []);
  const common = useMappedState(mapState);
  const dispatch = useDispatch();
  const handel = () => {
    $("#Js_index_demo").css({ color: "#ff0011", background: "blue" });
  };
console.log('common',common);
// dispatch attion
  const handelDispatch = () => {
    dispatch({
      type: "common_istrue",
      data: {
        isCommon:!common.isCommon
      },
    });
  };

// dispatch function
const handelDispatchThunk = () => {
  dispatch((dispatch)=>{  
    if(!common.isCommon){
      dispatch({
        type: "common_istrue",
        data: {
          isCommon:!common.isCommon
        },
      })
    }
  });
};

// dispatch function return promise
const handelDispatchPromise = () => {
  dispatch((dispatch)=>{  
    dispatch({
      type: "common_istrue",
      data: {
        isCommon:!common.isCommon
      },
    })
    return axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then( (response) =>
      console.log(response)
    ,(err)=>console.log(err)
    )
  });
};


  return (
    <div>
      <h3>图片显示</h3>
      <img src={Image} alt="base64" />
      <img src={Image2} alt="file-loader" />
      <div className="bgImg"></div>
      <div id="Js_index_demo" onClick={handel} role="button">
        Js_demo
      </div>
      <span className="icon iconfont">&#xe61d;</span>
      {/* <i className="iconfont">&#xe61d;</i> */}
      <div onClick={handelDispatch} role="button">
        handelDispatchAction
      </div>
      <div onClick={handelDispatchThunk} role="button">
        handelDispatchFunction
      </div>
      <div onClick={handelDispatchPromise} role="button">
        handelDispatchPromise
      </div>
      <div><span className="icon iconfont">&#xe61d;</span></div>
    </div>
  );
};
export default Index;
