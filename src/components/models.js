import React from 'react';
import {Entity} from "aframe-react";
import 'aframe-extras';

export class ObjPlane extends React.Component {
    render() {
        return <Entity  {...this.props}>
            <Entity obj-model="obj: #obj-plane; mtl: #mtl-plane" />

        </Entity>
    }
}

export class Neon extends React.Component {
    render() {
        return <Entity  {...this.props}>
            <a-entity ply-model="src: #neon-ply"></a-entity>
        </Entity>
    }
}