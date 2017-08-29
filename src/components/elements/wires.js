import {Entity} from "aframe-react";
import React from 'react';

export default class Wires extends React.Component {
    render() {
        return <Entity {...this.props}
                       className="menu"
                       geometry={{primitive: 'plane', width: 4, height: 4}}
                       material={{color: '#bfd7ff'}}>
            <WireFork id="wire-fork"/>
            <WireHorizontal id="wire-horizontal"/>
            <WireTurn id="wire-turn"/>
            <WireVertical id="wire-vertical"/>
        </Entity>
    }
}

class WireFork extends React.Component {
    render() {
        return <Entity className="item intersectable" hoverable hovered_menu_item>
            <Entity scale={{x: 0.05, y: 0.05, z: 0.05}}
                    position={{x: -0.6, y: 0.2, z: -0.5}} rotation={{x: 0, y: 0, z: 0}} ply-model="src: #wireFork"/>
        </Entity>
    }
}

class WireHorizontal extends React.Component {
    render() {
        return <Entity className="item intersectable" hoverable hovered_menu_item>
            <Entity scale={{x: 0.05, y: 0.05, z: 0.05}}
                    position={{x: 0.6, y: 0.2, z: -0.5}}
                    ply-model="src: #wireHorizontal"/>
        </Entity>
    }
}

class WireTurn extends React.Component {
    render() {
        return <Entity className="item intersectable" hoverable hovered_menu_item>
            <Entity scale={{x: 0.05, y: 0.05, z: 0.05}}
                    position={{x: -0.6, y: -1, z: -0.5}} ply-model="src: #wireTurn"/>
        </Entity>
    }
}

class WireVertical extends React.Component {
    render() {
        return <Entity className="item intersectable" hoverable hovered_menu_item>
            <Entity
                scale={{x: 0.05, y: 0.05, z: 0.05}} position={{x: 0.6, y: -1, z: -0.5}}
                ply-model="src: #wireVertical"/>
        </Entity>
    }
}

