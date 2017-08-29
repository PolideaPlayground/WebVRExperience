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
const scaleFactor = 0.4;

class WireFork extends React.Component {
    render() {
        return (
            <Entity className="item intersectable" hoverable hovered_menu_item>
                <Entity
                    scale={{x: scaleFactor, y: scaleFactor, z: scaleFactor}}
                    rotation={{x: 90, y: 0, z: 0}}
                    position={{x: -0.6, y: 0.2, z: 0.2}}
                    collada-model="#wireFork"/>
            </Entity>
        );
    }
}

class WireHorizontal extends React.Component {
    render() {
        return (
            <Entity className="item intersectable" hoverable hovered_menu_item>
                <Entity
                    rotation={{x: 90, y: 0, z: 0}}
                    scale={{x: scaleFactor, y: scaleFactor, z: scaleFactor}}
                    position={{x: 0.6, y: 0.2, z: 0.2}}
                    collada-model="#wireHorizontal"/>
            </Entity>
        );
    }
}

class WireTurn extends React.Component {
    render() {
        return (
            <Entity className="item intersectable" hoverable hovered_menu_item>
                <Entity
                    rotation={{x: 90, y: 0, z: 0}}
                    scale={{x: scaleFactor, y: scaleFactor, z: scaleFactor}}
                    position={{x: -0.6, y: -1, z: 0.2}}
                    collada-model="#wireTurn"/>
            </Entity>
        );
    }
}

class WireVertical extends React.Component {
    render() {
        return (
            <Entity className="item intersectable" hoverable hovered_menu_item>
                <Entity
                    scale={{x: scaleFactor, y: scaleFactor, z: scaleFactor}}
                    rotation={{x: 90, y: 0, z: 0}}
                    position={{x: 0.6, y: -1, z: 0.2}}
                    collada-model="#wireVertical"/>
            </Entity>
        );
    }
}

