import * as AFRAME from "aframe";
import "aframe-particle-system-component";

import "aframe-animation-component";
import React from "react";
import ReactDOM from "react-dom";
import View from "./components/view";
import Assets from "./components/assets";
import Controlers from "./components/controlers";

import "./components/properties/hoverable";
import "./components/properties/hovered_field";
import "./components/properties/hovered_menu_item";

import "./components/shaders/glitch_shader";
import "./components/shaders/glitch_component";

class VRScene extends React.Component {
    render() {
        return (
            //TODO when turn on/off antialias and other effects
            <a-scene
                id={"Scene"}
                // antialias="false"
                material={{
                    color: "#031128"
                }}
                fog="color:#FFB;density:0;far:65;near:0"
                redux-bind="backgroundSelected.fog: fog"
                redux="reducers: modelSelected, backgroundSelected"
                shadow="type: basic"
                light="defaultLightsEnabled: false"
            >
                <Assets/>
                <Controlers/>
                <View/>
            </a-scene>
        );
    }
}

ReactDOM.render(<VRScene/>, document.querySelector("#sceneContainer"));
