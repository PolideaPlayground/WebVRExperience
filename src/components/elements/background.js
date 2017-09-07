import {Entity} from "aframe-react";
import React from "react";

export default class Background extends React.Component {
    render() {
        return <a-entity
            position="0 0 0">
            <Entity collada-model="#environment" shadow="receive: true" material="shader: flat"/>
        </a-entity>
    }
}