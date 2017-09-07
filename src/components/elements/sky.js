import {Entity} from "aframe-react";
import React from "react";

export default class Sky extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: this.props.color,
        }
    }

    render() {
        return <Entity {...this.props}
                       primitive="a-sky"
                       color={this.state.color}
                       redux-bind="backgroundSelected.color: color"

        />
    }
}
