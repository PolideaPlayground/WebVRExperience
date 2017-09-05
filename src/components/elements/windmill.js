import React from 'react';
import {Entity} from "aframe-react";
import {toggleBackground} from "../redux/environment_state";

export default class Windmill extends React.Component {

    render() {
        return <Entity  {...this.props}>
            <Entity position={{x: -0.48, y: 0.55, z: 0.6}} collada-model="#propeller"
                    events={{
                        click: (element) => {
                            let el = element.target;
                            return toggleBackground(el)
                        }
                    }}
            >
                <a-animation attribute="rotation"
                             dur="5000"
                             fill="forwards"
                             easing="linear"
                             from="0 0 0"
                             to="0 0 360"
                             repeat="indefinite"/>
            </Entity>
            <Entity postion="0 1 0" collada-model="#windmill"/>
        </Entity>
    }
}