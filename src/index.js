import * as AFRAME from "aframe";
import "aframe-particle-system-component";
import "aframe-animation-component";
import extras from 'aframe-extras';

import {Scene} from "aframe-react";
import React from "react";
import ReactDOM from "react-dom";
import View from "./components/view";
import Assets from "./components/assets";
import Controlers from "./components/controlers";
import "./components/properties/hoverable";
// Register a single component.
extras.physics.registerAll();                               // Register a particular package, and its dependencies.
extras.registerAll();
import "./components/properties/hovered_field";
import "./components/properties/hovered_menu_item";

class VRScene extends React.Component {
    render() {
        return (
            <Scene
                debug
                material={{
                    color: "#031128"
                }}
                fog="color:#AAB;density:0;far:35;near:0"
            >
                <Assets/>
                <Controlers/>
                <View/>
            </Scene>
        );
    }
}

ReactDOM.render(<VRScene/>, document.querySelector("#sceneContainer"));
