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
                />

                <Entity
                    position={{x: 5.5, y: 0.2, z: -12.5}}
                    scale={{x: 3, y: 3, z: 3}}
                    collada-model="#mushroom"
                />

                <Entity
                    position={{x: 1.5, y: 0, z: -8.5}}
                    scale={{x: 2, y: 2, z: 2}}
                    collada-model="#mushroom"
                />

                <Entity
                    position={{x: 12.5, y: 0.5, z: -16.5}}
                    scale={{x: 1.5, y: 1.5, z: 1.5}}
                    collada-model="#mushroom"
                />

                <Entity
                    position={{x: 0.85, y: 0, z: -2.6}}
                    scale={{x: 0.5, y: 0.5, z: 0.5}}
                    collada-model="#mushroom"
                />
            </Entity>
        );
    }
}