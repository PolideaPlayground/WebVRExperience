import React from 'react';
import {Entity} from "aframe-react";

export default class Mushrooms extends React.Component {

    render() {
        return (
            <Entity id="mushrooms"
                    {...this.props}>
                <Entity
                    position={{x: 3.5, y: 0, z: -4.5}}
                    scale="0 0 0"
                    collada-model="#mushroom"
                    animation={{
                        property: "scale",
                        from: "0 0 0",
                        to: {x: 1, y: 1, z: 1},
                        dur: "1500",
                        fill: "forwards",
                        easing: "easeOutElastic",
                        restartEvents: "grow_mushroom"
                    }}
                >
                </Entity>

                <Entity
                    position={{x: 5.5, y: 0.2, z: -12.5}}
                    scale="0 0 0"
                    collada-model="#mushroom"
                    animation={{
                        property: "scale",
                        from: "0 0 0",
                        to: {x: 3, y: 3, z: 3},
                        dur: "2000",
                        fill: "forwards",
                        easing: "easeOutElastic",
                        restartEvents: "grow_mushroom"
                    }}
                />

                <Entity
                    position={{x: 2.5, y: 0, z: -8.5}}
                    scale="0 0 0"
                    collada-model="#mushroom"
                    animation={{
                        property: "scale",
                        from: "0 0 0",
                        to: {x: 2, y: 2, z: 2},
                        dur: "2200",
                        fill: "forwards",
                        easing: "easeOutElastic",
                        restartEvents: "grow_mushroom"
                    }}
                />

                <Entity
                    position={{x: 11.375, y: 0.453, z: -11.8}}
                    collada-model="#mushroom"
                    scale="0 0 0"
                    animation={{
                        property: "scale",
                        from: "0 0 0",
                        to: {x: 1.5, y: 1.5, z: 1.5},
                        dur: "1500",
                        fill: "forwards",
                        easing: "easeOutElastic",
                        restartEvents: "grow_mushroom"
                    }}
                />

                <Entity
                    position={{x: 0.85, y: -0.163, z: -2.6}}
                    scale="0 0 0"
                    collada-model="#mushroom"
                    animation={{
                        property: "scale",
                        from: "0 0 0",
                        to: {x: 0.5, y: 0.5, z: 0.5},
                        dur: "1800",
                        fill: "forwards",
                        easing: "easeOutElastic",
                        restartEvents: "grow_mushroom"
                    }}
                />
            </Entity>
        );
    }
}