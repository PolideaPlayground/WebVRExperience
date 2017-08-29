import "aframe";
import "aframe-particle-system-component";
import "aframe-animation-component";
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
            <a-scene
                debug
                material={{
                    color: "black"
                }}
                redux="reducers: modelSelected"
            >
                <Assets/>
                <Controlers/>
                <View/>
            </a-scene>
        );
    }
}

ReactDOM.render(<VRScene/>, document.querySelector("#sceneContainer"));
