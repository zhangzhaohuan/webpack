import React, { Component,useCallback } from 'react';

import $ from 'jquery';
import { useMappedState,useDispatch } from 'redux-react-hook';

import Image from '@asset/image/001.jpg';
import Image2 from '@asset/image/002.jpg';

const Index = () => {
  const mapState = useCallback(state => state.common_reducer, []);
  console.log(mapState);
  const common = useMappedState(mapState);

  const dispatch = useDispatch();

  const  handel = ()=> {
    $('#Js_index_demo').css({ "color": "#ff0011", "background": "blue" });
  }

  const handelDispatch = ()=>{
    dispatch({
      type:'common_istrue',
      data:{}
    })
    
  }
  return (
    <div>
      <img src={Image} />
      <img src={Image2} />
      <div id='Js_index_demo' onClick={handel}>Js_demo</div>

      <div onClick={handelDispatch}>'handelDispatch'</div>
    </div>
  )
}
export default Index;




