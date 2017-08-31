import React from 'react';
import {Entity} from "aframe-react";

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
        return (
            <Entity {...this.props}>
                <Entity collada-model="#neonPlane"/>
            </Entity>
        );

    }
}

class NeonOutline extends React.Component {
    render() {
        return (<Entity {...this.props}>
            <Entity collada-model="#neonOutline"/>
            <Entity collada-model="#neonOutline" material-grid-glitch redux-bind="neonConnected.exit1: visible"/>
        </Entity>);
    }
}

class NeonText extends React.Component {
    render() {
        return <Entity {...this.props}>
            <Entity collada-model="#neonText"/>
            <Entity collada-model="#neonText" material-grid-glitch redux-bind="neonConnected.exit2: visible"/>
        </Entity>
    }
}