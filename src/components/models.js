import React from 'react';
import {Entity} from "aframe-react";
import 'aframe-extras';

export class Scene extends React.Component {
    render() {
        return <Entity  {...this.props}>
            <Entity position={{x: -0.48, y: 0.55, z: 0.6}} obj-model="obj: #object">
            </Entity>
        </Entity>
    }
}

export class ObjPlane extends React.Component {
    render() {
        return <Entity  {...this.props}>
            <Entity obj-model="obj: #obj-plane; mtl: #mtl-plane" />

        </Entity>
    }
}

export class PlyPlane extends React.Component {
    render() {
        return <Entity  {...this.props}>
            <a-entity ply-model="src: #neon-ply" rotation="0 0 0"></a-entity>
        </Entity>
    }
}