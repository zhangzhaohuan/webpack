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
      <img src={Image} alt="" />
      <img src={Image2} alt="" />
      <div id="Js_index_demo" onClick={handel} role="button">
        Js_demo
      </div>
      <span className="icon font_family">&#xe608;</span>
      <div onClick={handelDispatch} role="button">
        handelDispatchAction
      </div>
      <div onClick={handelDispatchThunk} role="button">
        handelDispatchFunction
      </div>
      <div onClick={handelDispatchPromise} role="button">
        handelDispatchPromise
      </div>
      
    </div>
  );
};
export default Index;
