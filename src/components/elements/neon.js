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
                <Entity collada-model="#neonPlane" material="color: red; shader: shader-glitch" material-grid-glitch/>
            </Entity>
        );

    }
}

class NeonOutline extends React.Component {
    render() {
        return (<Entity {...this.props}>
            <Entity collada-model="#neonOutline"/>
        </Entity>);
    }
}

class NeonText extends React.Component {
    render() {
        return <Entity {...this.props}>
            <Entity collada-model="#neonText"/>
        </Entity>
    }
}