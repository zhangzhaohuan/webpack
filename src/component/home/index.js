import React, { Component } from 'react';
import $ from 'jquery';

import Image from '@asset/image/001.jpg';
import Image2 from '@asset/image/002.jpg';

export default class Index extends Component {
    handel = () => {
        $('#Js_index_demo').css({ "color": "#ff0011", "background": "blue" });
    }
    render() {
        return (
            <div>
                <img src={Image} />
                <img src={Image2} />
                <div id='Js_index_demo' onClick={this.handel}>Js_demo</div>
            </div>
        )
    }
}
