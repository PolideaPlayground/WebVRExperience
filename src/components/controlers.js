import {Entity} from "aframe-react";
import React from "react";

export default class Controlers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cursor_enabled: true,
        };
    }

    controllerConnected = (evt) => {
        let controllerName = evt.detail.name;
        this.enableControllerRaycaster(controllerName, true);
    };

    controllerDisconnected = (evt) => {
        let controllerName = evt.detail.name;
        this.enableControllerRaycaster(controllerName, false);
    };

    enableControllerRaycaster(controllerName, enabled) {
        let cursorEnabled = true;

        if (controllerName === "daydream-controls" ||
            controllerName === "gearvr-controls" ||
            controllerName === "oculus-touch-controls" ||
            controllerName === "vive-controls" ||
            controllerName === "windows-motion-controls") {
            cursorEnabled = !enabled;
        }

        this.setState({
            cursor_enabled: cursorEnabled,
        });
    }

    render() {
        const scaleFactor = 0.7;
        let selectedModel = (
            <Entity id="model"
                    position={{x: 0.0, y: 0.05, z: -2.4}}
                    rotation={{x: -20, y: 0, z: 0}}
                    scale={{x: scaleFactor, y: scaleFactor, z: scaleFactor}}
                    bind__visible="gameState.disk_visible">
                <Entity
                    scale={{x: 0.5, y: 0.5, z: 0.5}}
                    rotation={{x: 90, y: 0, z: 0}}
                    collada-model="#rockDisk"/>
                {/*<Entity*/}
                {/*primitive={"a-cylinder"}*/}
                {/*scale={{x: scaleFactor, y: scaleFactor, z: scaleFactor}}*/}
                {/*rotation={{x: 90, y: 0, z: 0}}*/}
                {/*material={{shader: "flat", color: "#a64701", transparent: true, opacity: 0.75}}*/}
                {/*/>*/}
                <a-image
                    position="0 0 0.05"
                    scale="0.15 0.15 1"
                    bind__src="gameState.selected_texture"
                />
            </Entity>);

        return (
            <Entity events={{
                controllerconnected: this.controllerConnected,
                controllerdisconnected: this.controllerDisconnected,
            }}>

                <VRController>
                    {selectedModel}
                </VRController>

                <Entity camera-height-vr-fix camera="userHeight:1.6; fov: 60" look-controls>
                    <CursorController enabled={this.state.cursor_enabled}>
                        {selectedModel}
                    </CursorController>
                </Entity>
            </Entity>
        );
    }
}

class CursorController extends React.Component {
    render() {
        if (this.props.enabled) {
            return (
                <Entity>
                    <Entity
                        id="cursor"
                        primitive="a-cursor"
                        cursor="fuse: true; fuseTimeout: 1200"
                        raycaster="far: 10; interval: 500; objects: .intersectable; showLine: false"
                        line="color: yellow; opacity: 2"
                        material="color: yellow; shader: flat"
                    >
                        <a-animation
                            begin="cursor-fusing"
                            easing="ease-in"
                            attribute="scale"
                            fill="backwards"
                            from="1 1 1"
                            dur="1200"
                            to="0.1 0.1 0.1"
                        />
                    </Entity>
                    {
                        this.props.children
                    }
                </Entity>
            );
        } else {
            return <Entity/>
        }
    }
}

class VRController extends React.Component {
    render() {
        return (
            <Entity
                laser-controls
                raycaster={{
                    far: 20,
                    interval: 200,
                    objects: ".intersectable",
                    showLine: true,
                }}
                line="color: yellow; opacity: 0.7"
                trackpad-to-click
            >

                {this.props.children}
            </Entity>

        );
    }
}

