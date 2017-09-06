import {Entity} from "aframe-react";
import React from "react";
import {toggleBackground} from "../redux/environment_state";

export default class Button extends React.Component {
    render() {
        return <Entity {...this.props}
                       geometry={{primitive: 'box', height: '0.1', width: '0.5', depth: '4.5'}}
                       events={{
                           click: (element) => {
                               let el = element.target;
                               return toggleBackground(el, this.props.reqState)
                           }
                       }}/>
    }
}
