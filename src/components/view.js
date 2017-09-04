import {Entity} from "aframe-react";
import React from "react";

import Playground from "./playground";
import Windmill from "./elements/windmill";
import Wires from "./elements/wires";

export default class View extends React.Component {
    render() {
        return (
            <Entity>
                <Sky id={"Sky"} ref={"Sky"}/>

                <Entity
                    light={{
                        type: "directional",
                        intensity: 1.4,
                        castShadow: true,
                        shadowCameraTop: 35,
                        shadowCameraRight: 35,
                        shadowCameraBotton: -35,
                        shadowCameraLeft: -35,
                        shadowMapWidth: 1024,
                        shadowMapHeight: 1024,
                    }}
                    position={{x: 0, y: 40, z: 50}}

                />
                <Entity
                    light={{
                        type: "ambient",
                        intensity: 0.5
                    }}
                />


                {/*<Entity id="night" sound="src: #nightSound; autoplay: true"/>*/}
                <Sound autoplay="true"/>
                <Windmill
                    className="intersectable"
                    position={{x: -15, y: -4, z: -15}}
                    scale={{x: 4, y: 4, z: 4}}
                    rotation={{x: 0, y: 40, z: 0}}
                    shadow="cast: true; receive: false"/>

                <Playground dim={3}
                            position={{x: -2.5, y: 1, z: -6}}
                            rotation={{x: -55, y: 0, z: 0}}
                            shadow="cast: true"
                />

                <Wires id='menu'
                       position={{x: 3.5, y: 5, z: -7}}
                       rotation={{x: -0, y: -30, z: 0}}
                />

                <Background/>

            </Entity>
        );
    }
}

class Background extends React.Component {
    render() {
        return <a-entity
            position="0 0 0">
            <Entity collada-model="#environment" shadow="receive: true" material="shader: flat"/>
        </a-entity>
    }
}

class Sky extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: this.props.color,
        }
    }


    render() {
        return <Entity {...this.props} primitive="a-sky" reduxBind="windmillSelected.color: #031128"/>
    }
}

class Sound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sound: this.props.sound,
        }
    }

    render() {
        return <Entity {...this.props} sound reduxBind="windmillSelected.sound: #nightSound"/>
    }
}