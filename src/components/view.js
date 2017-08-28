import {Entity} from "aframe-react";
import React from "react";
import Playground from "./playground";
import {Windmill} from "./elements/windmill";
import Neon from "./elements/neon";
import Menu from "./menu";

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

                <Windmill position={{x: -15, y: 4, z: -15}} scale={{x: 4, y: 4, z: 4}} rotation={{x: 0, y: 40, z: 0}}/>

                <Neon id="neon" position={{x: 0, y: 11, z: -6}} scale={{x: 0.1, y: 0.1, z: 0.1}}
                      rotation={{x: 0, y: 0, z: 0}}/>

                <Playground dim={4} position={{x: -2.5, y: 3, z: -6}}/>

                <Menu id='menu' position={{x: 0, y: 2, z: -5}} rotation={{x: -65, y: 0, z: 0}}/>

            </Entity>
        );
    }
}
