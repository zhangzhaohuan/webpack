import React from 'react';
import $ from 'jquery';


function Login() {
  const handel = () => {
    $('#Js_index_login').css({ color: '#ff0011', background: 'blue' });
  };
  return (
    <div>
      Login
      <div id="Js_index_login" onClick={handel} role="button">Js_demo</div>
    </div>
  );
}

export default Login;
