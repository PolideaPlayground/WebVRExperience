import {Entity} from "aframe-react";
import React from 'react';
import {selectCurrentModel} from "../redux/game_state";

export const WIRES = {
    "#wireFork": {
        position: {x: -0.6, y: 0.2, z: -0.5},
        model: "#wireFork",
        exit_up: true,
        exit_right: true,
        start_left: true,
        start_down: false
    },
    "#wireHorizontal": {
        position: {x: 0.6, y: -1, z: -0.5},
        model: "#wireHorizontal",
        exit_up: false,
        exit_right: true,
        start_left: true,
        start_down: false
    },
    "#wireTurn": {
        position: {x: -0.6, y: -1, z: -0.5},
        model: "#wireTurn",
        exit_up: true,
        exit_right: false,
        start_left: true,
        start_down: false
    },
    "#wireVertical": {
        position: {x: 0.6, y: 0.2, z: -0.5},
        model: "#wireVertical",
        exit_up: true,
        exit_right: false,
        start_left: false,
        start_down: true
    }

};

export default class Wires extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: WIRES
        };
    }

    onMenuItemClicked(el, model) {
        //Pickup model
        console.log("Picking up: " + model);
        selectCurrentModel(el, model);
    }

    createAllWires(fields) {
        return Object.entries(fields).map((field) => {
            return this.createWire(field[1]);
        })
    }

    createWire(field) {
        return <Wire key={field.model}
                     position={field.position}
                     model={field.model}
                     onMenuItemClicked={this.onMenuItemClicked}/>
    }

    render() {
        return <Entity {...this.props}
                       className="menu"
                       geometry={{primitive: 'box', width: 4, height: 4, depth: 0.2}}
                       material={{color: '#bfd7ff'}}
                       shadow="receive: false; cast: true">
            {this.createAllWires(this.state.fields)}
        </Entity>
    }
}
const scaleFactor = 0.05;

class Wire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: this.props.model,
            position: this.props.position
        }
    }

    render() {
        return <Entity className="item intersectable"
                       hoverable hovered_menu_item
                       rotation={{x: 0, y: 0, z: 0}}
                       shadow="cast: false; receive: false"
                       events={{
                           click: (evt) => {
                               let el = evt.target;
                               console.log('clicked')
                               this.props.onMenuItemClicked(el, this.state.model)
                           }
                       }}>
            <Entity scale={{x: scaleFactor, y: scaleFactor, z: scaleFactor}}
                    position={this.state.position}
                    rotation={{x: 0, y: 0, z: -90}}
                    shadow="cast: false; receive: false"
                    collada-model={this.state.model}
            />
        </Entity>
    }
}
