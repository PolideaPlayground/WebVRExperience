import {Entity} from "aframe-react";
import React from "react";

import Boxes from "./boxes";
import Playground from "./playground";
import { Windmill} from "./windmill";
import {Scene, PlyPlane, ObjPlane} from "./models";

export default class View extends React.Component {
    render() {
        return (
            <Entity>
                <Entity primitive="a-sky" color="#112211"/>
                <Entity
                    particle-system={{
                        preset: "snow"
                    }}
                />
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
                    color="pink"
                    height="100"
                    width="100"
                    position={{
                        x: 0,
                        y: 0,
                        z: 0
                    }}
                />

                <Playground dim={3} position={{x: 0, y: 0, z: -6}}/>
                <Boxes/>
                <Windmill position={{x: -5, y: 4, z: -15}} scale={{x: 4, y: 4, z: 4}}/>

                <Scene id="scene" position={{x: -38.805, y: -4, z: 0}} scale={{x: 4, y: 4, z: 4}} rotation={{x: 0, y: -90, z: 0}}/>
                <a-entity id="t-rex" ply-model="src: #t-rex" rotation="-90 -135 0" position="-1 -16 0" scale="1 1 1" />
                <PlyPlane id="ply" position={{x: 0, y: 0, z: 0}} scale={{x: 0.1, y: 0.1, z: 0.1}} rotation={{x: -90, y: 0, z: 0}}/>
                {/*<ObjPlane id="obj" position={{x: 0, y: 0, z: 0}} scale={{x: 1, y: 1, z: 1}} rotation={{x: 0, y: 0, z: 0}}/>*/}
            </Entity>
        );
    }
}
