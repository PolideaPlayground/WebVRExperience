import {Entity} from "aframe-react";
import React from "react";
import ComplexBox from "./elements/complex_box";

export default class Controlers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cursor_enabled: true,
            daydream_enabled: false,
            gearvr_enabled: false
        };

        console.re.log("Init controlls!");
    }

    controllerConnected = (evt) => {
        // Wait for controller to connect before
        let controllerName = evt.detail.name;
        console.re.log("Controller:" + controllerName);
        this.enableControllerRaycaster(controllerName, true);
    };

    controllerDisconnected = (evt) => {
        // Wait for controller to connect before
        let controllerName = evt.detail.name;
        console.re.log("Controller:" + controllerName);
        this.enableControllerRaycaster(controllerName, false);
    };

    enableControllerRaycaster(controllerName, enabled) {
        let cursorEnabled = true;
        let daydreamEnabled = false;
        let gearvrEnabled = false;

        if (controllerName === "daydream-controls") {
            daydreamEnabled = enabled;
            cursorEnabled = !enabled;
        }

        if (controllerName === "gearvr-controls") {
            gearvrEnabled = enabled;
            cursorEnabled = !enabled;
        }

        this.setState({
            cursor_enabled: cursorEnabled,
        });

        this.setState({
            gearvr_enabled: gearvrEnabled
        });

        console.log(this.state)
    }

    render() {
        return (
            <Entity events={{
                controllerconnected: this.controllerConnected,
                controllerdisconnected: this.controllerDisconnected,
            }}>
                <GearVRController enabled={this.state.gearvr_enabled}/>
                <DaydreamController enabled={this.state.daydream_enabled}/>
                <ComplexBox
                    position="4 2 -4"
                    rotation="0 0 180"
                    color="#F55"
                    animation__click={{
                        startEvents: "click",
                        property: "rotation",
                        dur: 2000,
                        loop: true,
                        to: "360 360 360"
                    }}
                />

                <Entity
                    class="collidable"
                    primitive="a-box"
                    position="-1 2 -4"
                    color="blue"
                />

                <Entity primitive="a-camera" look-controls wasd-controls>
                    <CursorController enabled={this.state.cursor_enabled}/>
                </Entity>
            </Entity>
        );
    }
}

class CursorController extends React.Component {
    render() {
        if (this.props.enabled) {
            return <Entity
                id="cursor"
                primitive="a-cursor"
                cursor="fuse: true"
                raycaster="far: 20; objects: .intersectable; showLine: true"
                line="color: black; opacity: 2"
                rotation="0 0 0"
                position="0 0 -0.75"
                geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
                material="color: yellow; shader: flat"
            >
                {/*TODO React-ify*/}
                <a-animation
                    begin="click"
                    easing="ease-in"
                    attribute="scale"
                    fill="backwards"
                    from="0.1 0.1 0.1"
                    to="1 1 1"
                />
                <a-animation
                    begin="cursor-fusing"
                    easing="ease-in"
                    attribute="scale"
                    fill="backwards"
                    from="1 1 1"
                    to="0.1 0.1 0.1"
                />
            </Entity>
        } else {
            return <Entity/>
        }
    }
}

class GearVRController extends React.Component {
    render() {
        let gearRaycaster;
        if (this.props.enabled) {
            gearRaycaster = <ComplexBox scale="0.1 0.1 0.1" raycaster="far: 20; objects: .intersectable; showLine: true"
                                        line="color: black; opacity: 2"/>;
        }
        return (
            <Entity gearvr-controls>
                {gearRaycaster}
            </Entity>

        );
    }
}

class DaydreamController extends React.Component {
    render() {
        let daydreamRaycaster;
        if (this.props.enabled) {
            daydreamRaycaster =
                <ComplexBox scale="0.1 0.1 0.1" raycaster="far: 20; objects: .intersectable; showLine: true"
                            line="color: black; opacity: 2"/>;
        }
        return (
            <Entity daydream-controls>
                {daydreamRaycaster}
            </Entity>

        );
    }
}

