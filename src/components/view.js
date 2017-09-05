import {Entity} from "aframe-react";
import React from "react";

import Playground from "./playground";
import Windmill from "./elements/windmill";
import Wires from "./elements/wires";
import Sound from "./elements/sound";
import Background from "./elements/background";
import Sky from "./elements/sky";

export default class View extends React.Component {
    render() {
        return (
            <Entity>
                <Sky id={"Sky"} ref={"Sky"} color="black" fog="color:#FFB;density:0;far:65;near:0"/>

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

                <Entity id={"block"}
                        shadow="receive: false"
                        material="src: url(https://vwartclub.com/media/learning/useful-tips-vray-world-how-to-create-a-displacement-map-in-photoshop/9.jpg); color: red; roughness: 1; metalness: 0;"
                        collada-model="#block" position={{x: 0, y: 2, z: -2}}/>

                <a-sphere
                          id={"block2"}
                          shadow="receive: false"
                          material="src: url(https://vwartclub.com/media/learning/useful-tips-vray-world-how-to-create-a-displacement-map-in-photoshop/9.jpg); color: red; roughness: 1; metalness: 0;"
                          position="1 1 -2"
                            />
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


