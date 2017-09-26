import {Entity} from "aframe-react";
import React from "react";

export default class EnvironmentSound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sound: this.props.sound
        }
    }

    render() {
        return <Entity {...this.props}
                       sound={{src: this.state.sound, volume: 1}}
                       bind__sound="environment.sound"/>
    }
}