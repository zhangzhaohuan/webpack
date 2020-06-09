import React, { Component } from 'react';
import $ from 'jquery';

import Image from '@asset/image/001.jpg';
import Image2 from '@asset/image/002.jpg';

export default class Index extends Component {
    handel = () => {
      $('#Js_index_demo').css({ color: '#ff0011', background: 'blue' });
    }

    render() {
      return (
        <div>
          <img alt="img1" src={Image} />
          <img alt="img2" src={Image2} />
          <div id="Js_index_demo" role="button" onClick={this.handel}>Js_demo</div>
        </div>
      );
    }
}
