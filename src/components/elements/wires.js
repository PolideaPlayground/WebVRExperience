import {Entity} from "aframe-react";
import React from 'react';
import {selectCurrentModel} from "../redux/game_state";

export default class Wires extends React.Component {
    constructor(props) {
        super(props);
        let fields = [
            {
                position: {x: -0.6, y: 0.2, z: -0.5},
                model: "#wireFork"
            }
        ]
        this.state = {
            fields: fields
        };
    }

    onMenuItemClicked(el, model) {
        //Pickup model
        console.log("Picking up: " + model);
        selectCurrentModel(el, model);
    }

    render() {
        return <Entity {...this.props}
                       className="menu"
                       geometry={{primitive: 'plane', width: 4, height: 4}}
                       material={{color: '#bfd7ff'}}>
            {
                this.state.fields.map((field) => {
                    return <Wire key={field.model} position={field.position} model={field.model}
                                 onMenuItemClicked={this.onMenuItemClicked}/>
                })
            }

            <WireHorizontal id="wire-horizontal"/>
            <WireTurn id="wire-turn"/>
            <WireVertical id="wire-vertical"/>
        </Entity>
    }
}

class Wire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: this.props.model
        }
    }

    render() {
        return <Entity className="item intersectable" hoverable hovered_menu_item
                       events={{
                           click: (evt) => {
                               let el = evt.target;
                               console.log('clicked')
                               this.props.onMenuItemClicked(el, this.state.model)
                           }
                       }}
        >
            <Entity scale={{x: 0.05, y: 0.05, z: 0.05}}
                    position={this.props.position} rotation={{x: 0, y: 0, z: 0}}
                    ply-model={`src: ${this.props.model}`}
            />
        </Entity>
    }
}

class WireFork
    extends React
        .Component {
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

