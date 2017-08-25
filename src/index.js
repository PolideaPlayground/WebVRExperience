import "aframe";
import "aframe-particle-system-component";
import "aframe-animation-component";
import {Entity, Scene} from "aframe-react";
import React from "react";
import ReactDOM from "react-dom";
import View from "./components/view";
import Assets from "./components/assets";
import Controlers from "./components/controlers";
import "./components/properties/hoverable";
import "./components/properties/hovered_field";

class VRScene extends React.Component {
    render() {
        return (
            <Scene
                debug
                material={{
                    color: "black"
                }}
                antialias="true"
            >
                <Assets/>
                <Controlers/>
                <View/>
            </Scene>
        );
    }
}

ReactDOM.render(<VRScene/>, document.querySelector("#sceneContainer"));
