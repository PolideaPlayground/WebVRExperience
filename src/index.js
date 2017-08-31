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
            <a-scene
                debug
                material={{
                    color: "#031128"
                }}
                fog="color:#AAB;density:0;far:35;near:0"
                redux="reducers: modelSelected, neonConnected"
            >
                <Assets/>
                <Controlers/>
                <View/>
            </a-scene>
        );
    }
}

ReactDOM.render(<VRScene/>, document.querySelector("#sceneContainer"));
