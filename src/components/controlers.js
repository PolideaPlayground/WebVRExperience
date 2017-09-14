import {Entity} from "aframe-react";
import React from "react";

const scaleFactor = 1;

export default class Controlers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cursor_enabled: true,
            daydream_enabled: false,
            gearvr_enabled: false
        };
    }

    controllerConnected = (evt) => {
        // Wait for controller to connect before
        let controllerName = evt.detail.name;
        // console.re.log("Controller:" + controllerName);
        this.enableControllerRaycaster(controllerName, true);
    };

    controllerDisconnected = (evt) => {
        // Wait for controller to connect before
        let controllerName = evt.detail.name;
        // console.re.log("Controller:" + controllerName);
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

        this.setState({
            daydream_enabled: daydreamEnabled
        });
    }

    render() {
        let selectedModel = (
            <Entity id="model"
                    position={{x: 0.0, y: 0.0, z: -2.4}}
                    bind__visible="gameState.disk_visible">
                <Entity
                    scale={{x: scaleFactor, y: scaleFactor, z: scaleFactor}}
                    rotation={{x: 90, y: 0, z: 0}}
                    collada-model="#rockDisk"/>
                <a-image
                    position="0 0 0.15"
                    scale="0.33 0.33 1"
                    bind__src="gameState.selected_texture"
                />
            </Entity>);

        return (
            <Entity events={{
                controllerconnected: this.controllerConnected,
                controllerdisconnected: this.controllerDisconnected,
            }}>

                <GearVRController enabled={this.state.gearvr_enabled}>
                    {selectedModel}
                </GearVRController>
                <DaydreamController enabled={this.state.daydream_enabled}>
                    {selectedModel}
                </DaydreamController>

                <Entity camera="userHeight:1.6" look-controls wasd-controls>
                    <CursorController enabled={true}/>
                    {selectedModel}
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
                fuseTimeout="1000"
                raycaster="far: 10; interval: 500; objects: .intersectable; showLine: false"
                line="color: yellow; opacity: 2"
                geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
                material="color: yellow; shader: flat"
            >
                <a-animation
                    begin="cursor-fusing"
                    easing="ease-in"
                    attribute="scale"
                    fill="backwards"
                    from="1 1 1"
                    dur="1000"
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
            gearRaycaster = <Entity
                primitive="a-cursor"
                cursor="fuse: false"
                downEvents={["trackpaddown", "triggerdown"]}
                upEvents={["trackpadup", "triggerup"]}
                raycaster="far: 10;  interval: 500; objects: .intersectable; showLine: true"
                line="color: yellow; opacity: 2"/>;
        }
        return (
            <Entity gearvr-controls clickable-controller>
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
                <Entity
                    primitive="a-cursor"
                    cursor="fuse: false"
                    downEvents="trackpaddown"
                    upEvents="trackpadup"
                    raycaster="far: 20; interval: 500; objects: .intersectable; showLine: true"
                    line="color: yellow; opacity: 2"/>;
        }
        return (
            <Entity daydream-controls>
                {daydreamRaycaster}
            </Entity>

        );
    }
}

