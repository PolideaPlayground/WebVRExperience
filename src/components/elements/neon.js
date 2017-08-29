import React from 'react';
import {Entity} from "aframe-react";
import 'aframe-extras';


export default class Neon extends React.Component {
    render() {
        return <Entity {...this.props}>
            <NeonPlane id="neon-plane"/>
            <NeonOutline id="neon-outline"/>
            <NeonText id="neon-text"/>
        </Entity>
    }
}

class NeonPlane extends React.Component {
    render() {
        return <Entity {...this.props}>
            <Entity ply-model="src: #neonPlane"/>
        </Entity>

    }
}

class NeonOutline extends React.Component {
    render() {
        return <Entity {...this.props}>
            <Entity ply-model="src: #neonOutline"/>
        </Entity>
    }
}

class NeonText extends React.Component {
    render() {
        return <Entity {...this.props}>
            <Entity ply-model="src: #neonText"/>
        </Entity>
    }
}