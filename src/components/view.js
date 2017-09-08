import {Entity} from "aframe-react";
import React from "react";

import StoneGame from "./elements/stone_game";
import Windmill from "./elements/windmill";
import Rocks from "./elements/menu_disks";
import EnvironmentSound from "./elements/sound";
import Background from "./elements/background";
import Sky from "./elements/sky";
import Info from "./elements/info_plane";

export default class View extends React.Component {
    render() {
        return (
            <Entity>
                <Sky id={"Sky"} ref={"Sky"} color="#4e4b55"/>

                <Entity
                    bind__light="intensity: environment.lightIntensity"
                    light={{
                        type: "directional",
                        castShadow: true,
                        shadowCameraTop: 35,
                        shadowCameraRight: 35,
                        shadowCameraBottom: -35,
                        shadowCameraLeft: -35,
                        shadowMapWidth: 1024,
                        shadowMapHeight: 1024,
                    }}
                    position={{x: 0, y: 140, z: 80}}

                />
                <Entity
                    light={{
                        type: "ambient",
                        intensity: 0.5
                    }}
                />

                <EnvironmentSound id="envSound"/>
                <Windmill
                    position={{x: -20, y: -3, z: 80}}
                    scale={{x: 4, y: 4, z: 4}}
                    rotation={{x: 0, y: 120, z: 0}}
                    shadow="cast: true; receive: false"/>

                <Info position={{x: 3.5, y: 4, z: -4.5}}
                      rotation={{x: -0, y: -30, z: 0}}
                />

                <StoneGame dimX={3}
                           dimY={2}
                           position={{x: 0, y: 1, z: -4}}
                           rotation={{x: 27.5, y: 0, z: 0}}
                           shadow="cast: true"
                />

                <Rocks id='menu'
                       position={{x: -3.5, y: 4, z: -4.5}}
                       rotation={{x: -0, y: 30, z: 0}}
                />

                <Background/>

            </Entity>
        );
    }
}


