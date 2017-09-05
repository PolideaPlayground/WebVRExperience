import {Entity} from "aframe-react";
import React from "react";

export default class Sound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sound: this.props.sound,
        }
    }

    render() {
        return <Entity {...this.props} sound reduxBind="windmillSelected.sound: #nightSound"/>
    }
}