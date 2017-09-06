import {Entity} from "aframe-react";
import React from "react";

export default class Sound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <a-entity {...this.props}
                         sound="src: #nightSound; autoplay: true"
                         reduxBind="backgroundSelected.sound: sound"/>
    }
}