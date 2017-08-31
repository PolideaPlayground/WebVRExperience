import {Entity} from "aframe-react";
import React from "react";

import Playground from "./playground";
import Windmill from "./elements/windmill";
import Neon from "./elements/neon";
import Wires from "./elements/wires";

export default class View extends React.Component {
    render() {
        return (
            <Entity>
                <Entity primitive="a-sky" color="#031128"/>

                <Entity
                    light={{
                        type: "point"
                    }}
                />
                <Entity
                    light={{
                        type: "ambient"
                    }}
                />


                <Entity
                    primitive="a-plane"
                    rotation="-90 0 0"
                    static-body
                    color="#0e2802"
                    height="100"
                    width="100"
                    position={{
                        x: 0,
                        y: 0,
                        z: 0
                    }}
                />

                <Windmill
                    position={{x: -15, y: 4, z: -15}}
                    scale={{x: 4, y: 4, z: 4}}
                    rotation={{x: 0, y: 40, z: 0}}/>

                <Neon id="neon"
                      position={{x: 0, y: 5, z: -12}}
                      scale={{x: 0.05, y: 0.05, z: 0.05}}
                      rotation={{x: 90, y: 0, z: 0}}/>

                <Playground dim={3}
                            position={{x: -2.5, y: 1, z: -6}}
                            rotation={{x: -55, y: 0, z: 0}}
                />

                <Wires id='menu'
                       position={{x: 3.5, y: 5, z: -7}}
                       rotation={{x: -0, y: -30, z: 0}}/>

                <Background/>

            </Entity>
        );
    }
}

class Background extends React.Component {
    render() {
        return <a-entity position="0 0 -10">
            {/*<!-- Ground Highlight -->*/}

            {/*<!-- Orange -->*/}
            <a-entity position="20 0 -25">
                <a-sphere position="0 4.2 0" radius="4.2" color="#F16745" roughness="0.8" width-segments="52"
                          height-segments="52" material="" geometry=""></a-sphere>
            </a-entity>

            {/*<!-- Green -->*/}
            <a-entity position="-23 0 20">
                <a-sphere position="0 1.75 0" radius="1.75" color="#7BC8A4" roughness="0.2" material=""
                          geometry=""></a-sphere>
            </a-entity>

            {/*<!-- Blue -->*/}
            <a-entity position="21 0 20">
                <a-sphere position="0 1 0" radius="1" color="#4CC3D9" metalness="0.1" material=""
                          geometry=""></a-sphere>
            </a-entity>

            {/*<!-- Yellow -->*/}
            <a-entity position="23 0 31">
                <a-sphere position="0 0.5 0" radius="0.5" color="#FFC65D" material="" geometry=""></a-sphere>
            </a-entity>

            {/*<!-- Purple -->*/}
            <a-entity position="30 0 -22">
                <a-sphere position="0 10 0" radius="10" color="#93648D" segments-width="52" segments-height="52"
                          material="" geometry=""></a-sphere>
            </a-entity>

            {/*<!-- Yellow -->*/}
            <a-entity position="-24 0 -44">
                <a-sphere position="0 18 0" radius="18" color="#FFC65D" material="" geometry=""></a-sphere>
            </a-entity>

            {/*<!-- Green -->*/}
            <a-entity position="25 0 30">
                <a-sphere position="0 12 0" radius="12" color="#7BC8A4" material="" geometry=""></a-sphere>
            </a-entity>

            {/*<!-- White -->*/}
            <a-entity position="-25 0 25">
                <a-sphere position="0 3 0" radius="3" color="#ECECEC" material="" geometry=""></a-sphere>
            </a-entity>

            {/*<!-- Orange -->*/}
            <a-entity position="-26 0 26">
                <a-sphere position="0 1 0" radius="1" color="#F16745" roughness="0.8" material=""
                          geometry=""></a-sphere>
            </a-entity>

            {/*<!-- Yellow -->*/}
            <a-entity position="-20 0 60">
                <a-sphere position="0 30 0" radius="30" color="#FFC65D" roughness="0.6" material=""
                          geometry=""></a-sphere>
            </a-entity>

            {/*<!-- Blue -->*/}
            <a-entity position="-21 0 34">
                <a-sphere position="0 2 0" radius="2" color="#4CC3D9" material="" geometry=""></a-sphere>
            </a-entity>

            {/*<!-- Orange -->*/}
            <a-entity position="20 0 25">
                <a-sphere position="0 4 0" radius="4" color="#F16745" roughness="1" material="" geometry=""></a-sphere>
            </a-entity>

            {/*<!-- Blue -->*/}
            <a-entity position="26 0 24">
                <a-sphere position="0 1.5 0" radius="1.5" color="#4CC3D9" metalness="0.1" material=""
                          geometry=""></a-sphere>
            </a-entity>

            {/*<!-- Yellow -->*/}
            <a-entity position="25 0 24">
                <a-sphere position="0 .6 0" radius=".6" color="#FFC65D" material="" geometry=""></a-sphere>
            </a-entity>

            {/*<!-- Purple -->*/}
            <a-entity position="15 0 25">
                <a-sphere position="0 2 0" radius="2" color="#93648D" material="" geometry=""></a-sphere>
            </a-entity>

            {/*<!-- Purple -->*/}
            <a-entity position="34 0 20">
                <a-sphere position="0 0.15 0" radius="0.15" color="#93648D" material="" geometry=""></a-sphere>
            </a-entity>

            {/*<!-- Blue -->*/}
            <a-entity position="24 0 31">
                <a-sphere position="0 0.1 0" radius="0.1" color="#4CC3D9" material="" geometry=""></a-sphere>
            </a-entity>

            {/*<!-- Green -->*/}
            <a-entity position="35 0 25">
                <a-sphere position="0 0.3 0" radius="0.3" color="#7BC8A4" material="" geometry=""></a-sphere>
            </a-entity>
        </a-entity>
    }
}