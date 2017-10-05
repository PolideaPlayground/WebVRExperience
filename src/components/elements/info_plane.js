import {Entity} from "aframe-react";
import React from 'react';


export default class Info extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonVisible: true,
            infoVisible: false
        }
    }

    onPolideaClicked() {
        this.setState({
            buttonVisible: false,
            infoVisible: true
        });
    }

    onXClicked() {
        this.setState({
            buttonVisible: true,
            infoVisible: false
        });
    }

    render() {
        return (
            <Entity {...this.props}
                    id="info"
                    shadow="receive: false; cast: true">
                <Entity
                    id="polidea"
                    hovered_menu_item={{
                        position_down: {x: 0, y: 0, z: 0},
                        position_up: {x: 0, y: 0, z: 0.1},
                    }}
                    visible={this.state.buttonVisible}
                    position={{x: 0, y: 0, z: 0.1}}
                    className={"intersectable"}
                    geometry={{primitive: 'plane', width: 1.1, height: 0.45}}
                    material={{shader: "flat", color: 'white', opacity: 1.0}}
                    text={{
                        align: "center",
                        baseline: "center",
                        width: 2.4,
                        wrapCount: 28,
                        lineHeight: 60,
                        height: "auto",
                        color: "#595959",
                        value: "About us"
                    }}
                    events={{
                        click: (evt) => {
                            this.onPolideaClicked();
                        }
                    }}
                />
                <Entity
                    id="text"
                    visible={this.state.infoVisible}
                    geometry={{primitive: 'plane', width: 3, height: 3}}
                    material={{shader: "flat", color: 'white', opacity: 1.0}}
                    position={{x: 1, y: 0, z: 0.1}}
                    scale={{x: 1, y: 1}}
                >
                    <Entity
                        position={{x: 1.25, y: 1.85, z: 0}}
                        scale={{x: 1, y: 1}}
                        hovered_menu_item={{
                            position_down: {x: 1.25, y: 1.85, z: -0.1},
                            position_up: {x: 1.25, y: 1.85, z: 0},
                        }}
                        className={"intersectable"}
                        geometry={{primitive: 'plane', width: 0.5, height: 0.5}}
                        material={{shader: "flat", color: 'white', opacity: 1.0}}

                        events={{
                            click: (evt) => {
                                this.onXClicked();
                            }
                        }}>
                        <Entity
                            primitive={"a-image"}
                            src="#closeImage"
                            scale={{x: 0.3, y: 0.3}}
                            position={{x: 0, y: 0, z: 0.01}}
                        />
                    </Entity>
                    <Entity
                        primitive={"a-image"}
                        position={{x: 0, y: 1.0, z: 0.05}}
                        scale={{x: 0.75, y: 0.75, z: 1}}
                        geometry={{primitive: 'plane', width: 1.82, height: 0.5}}
                        src="#polideaImage"
                    />
                    <Entity
                        position={{x: 0, y: 0.5, z: 0.05}}
                        text={{
                            align: "left",
                            baseline: "top",
                            width: 2.4,
                            wrapCount: 32,
                            lineHeight: 60,
                            height: "auto",
                            color: "#484848",
                            value: "We think that sometimes small things can make your day. That's why we created this experiment, which runs on any mobile and desktop device."
                        }}
                    />
                    <Entity
                        position={{x: 0, y: -0.5, z: 0.05}}
                        text={{
                            align: "left",
                            baseline: "top",
                            width: 2.4,
                            wrapCount: 32,
                            lineHeight: 60,
                            height: "auto",
                            color: "#484848",
                            value: "Designed and developed by VR team at Polidea."
                        }}
                    />
                    <Entity
                        position={{x: 0, y: -1.1, z: 0.05}}
                        className={"intersectable link"}
                        text={{
                            align: "center",
                            baseline: "top",
                            width: 2.4,
                            wrapCount: 28,
                            lineHeight: 60,
                            height: "auto",
                            color: "#484848",
                            value: "www.polidea.com"
                        }}
                    />
                </Entity>
            </Entity>
        );
    }
}