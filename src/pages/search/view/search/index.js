
import React from 'react';
import $ from 'jquery';

const Search = () => {
  const handel = () => {
    $('#Js_demo_serch_1').css({ color: '#ff0000', background: 'blue' });
  };
  return (
    <div id="Js_demo_serch_1" role="button" onClick={handel}>
      serach
    </div>
  );
};
export default Search;
