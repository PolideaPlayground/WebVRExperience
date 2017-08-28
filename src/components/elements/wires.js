import {Entity} from "aframe-react";
import React from 'react';

export default class Wires extends React.Component {
    render() {
        return <Entity {...this.props}
                       className="menu"
                       geometry={{primitive: 'plane', width: 4, height: 4}}
                       material={{color: '#bfd7ff'}}>
            <WireFork id="wire-fork" {...this.props}/>
            <WireHorizontal id="wire-horuzontal" {...this.props}/>
            <WireTurn id="wire-turn" {...this.props}/>
            <WireVertical id="wire-vertical" {...this.props}/>
        </Entity>
    }
}

class WireFork extends React.Component {
    render() {
        return <Entity {...this.props} hovered_menu_item scale={{x: 0.05, y: 0.05, z: 0.05}} position={{x: 0, y: -2, z: 0}} rotation={{x: 0, y: 0, z: 0}} ply-model="src: #wireFork"/>
    }
}

class WireHorizontal extends React.Component {
    render() {
        return <Entity {...this.props} hovered_menu_item scale={{x: 0.05, y: 0.05, z: 0.05}} position={{x: 0, y: -1, z: 0}} rotation={{x: 0, y: 0, z: 0}} ply-model="src: #wireHorizontal"/>
    }
}

class WireTurn extends React.Component {
    render() {
        return <Entity {...this.props} hovered_menu_item scale={{x: 0.07, y: 0.05, z: 0.05}} position={{x: 1, y: -1, z: 0}} rotation={{x: 0, y: 0, z: 0}} ply-model="src: #wireTurn"/>
    }
}

class WireVertical extends React.Component {
    render() {
        return <Entity {...this.props} hovered_menu_item scale={{x: 0.05, y: 0.05, z: 0.05}} position={{x: 1, y: -2, z: 0}} rotation={{x: 0, y: 0, z: 0}} ply-model="src: #wireVertical"/>
    }
}