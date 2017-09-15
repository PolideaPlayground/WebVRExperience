import {Entity} from "aframe-react";
import React from "react";

import StoneGame from "./elements/stone_game";
import Windmill from "./elements/windmill";
import Menu from "./elements/menu_disks";
import EnvironmentSound from "./elements/sound";
import Background from "./elements/background";
import Sky from "./elements/sky";
import Info from "./elements/info_plane";
import Mushrooms from "./elements/mushrooms";
import Instructions from "./elements/instructions";

export default class View extends React.Component {
    render() {
        return (
            <Entity>
                <Sky
                    id={"Sky"}
                    ref={"Sky"}
                    color="#4e4b55"
                />

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
                <Background/>

                <EnvironmentSound
                    id="envSound"/>

                <Windmill
                    position={{x: -34, y: -5.2, z: 65}}
                    scale={{x: 2, y: 2, z: 2}}
                    rotation={{x: 0, y: 120, z: 0}}
                    shadow="cast: true; receive: false"/>

                <Info
                    position={{x: 4.5, y: 1.2, z: -4.5}}
                    rotation={{x: -0, y: -45, z: 0}}
                />

                <StoneGame
                    position={{x: 0, y: 0.345, z: -4}}
                    rotation={{x: 45.5, y: 0, z: 0}}
                    shadow="cast: true"
                />

                <Instructions
                    position={{x: 0, y: 2.0, z: -4.5}}
                    rotation={{x: 0, y: 0, z: 0}}
                    scale={{x: 2, y: 2, z: 1}}/>

                <Menu
                    id='menu'
                    scale={{x: 0.6, y: 0.6, z: 1}}
                    position={{x: -2.0, y: 2, z: -3.5}}
                    rotation={{x: -0, y: 30, z: 0}}
                />

                <Mushrooms
                    bind__visibile="visible: environment.mushroomState"
                />

            </Entity>
        );
    }
}


