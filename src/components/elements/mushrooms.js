import React from 'react';
import {Entity} from "aframe-react";

export default class Mushrooms extends React.Component {

    render() {
        return (
            <Entity  {...this.props}>
                <Entity
                    position={{x: 3.5, y: 0, z: -4.5}}
                    scale={{x: 1, y: 1, z: 1}}
                    collada-model="#mushroom"
                >
                    <a-animation attribute="scale"
                                 dur="2000"
                                 fill="forwards"
                                 easing="ease-out-elastic"
                                 from="0 0 0"
                                 to="1 1 1"
                                 bind__visibile="visible: environment.mushroomState"
                                 />
                </Entity>

                <Entity
                    position={{x: 5.5, y: 0.2, z: -12.5}}
                    scale={{x: 3, y: 3, z: 3}}
                    collada-model="#mushroom"
                />

                <Entity
                    position={{x: 2.5, y: 0, z: -8.5}}
                    scale={{x: 2, y: 2, z: 2}}
                    collada-model="#mushroom"
                />

                <Entity
                    position={{x: 11.375, y: 0.453, z: -11.8}}
                    scale={{x: 1.5, y: 1.5, z: 1.5}}
                    collada-model="#mushroom"
                />

                <Entity
                    position={{x: 0.85, y: -0.163, z: -2.6}}
                    scale={{x: 0.5, y: 0.5, z: 0.5}}
                    collada-model="#mushroom"
                />
            </Entity>
        );
    }
}