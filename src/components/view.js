import {Entity} from "aframe-react";
import React from "react";

import Boxes from "./boxes";
import Controlers from "./controlers";
import Playground from "./playground";

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

                <Boxes/>

                <Playground x='3' y='3' position={{x: 2, y: 6, z: -4}}/>
            </Entity>
        );
    }
}
