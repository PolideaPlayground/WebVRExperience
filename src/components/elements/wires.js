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
            },
            {
                position: {x: 0.6, y: 0.2, z: -0.5},
                model: "#wireHorizontal"
            },
            {
                position: {x: -0.6, y: -1, z: -0.5},
                model: "#wireTurn"
            },
            {
                position: {x: 0.6, y: -1, z: -0.5},
                model: "#wireVertical"
            }
        ];
        this.state = {
            fields: fields
        };
    }

    onMenuItemClicked(el, model) {
        //Pickup model
        console.log("Picking up: " + model);
        selectCurrentModel(el, model);
    }

    createAllWires(fields) {
        return fields.map((field) => {
            return this.createWire(field);
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
                       geometry={{primitive: 'plane', width: 4, height: 4}}
                       material={{color: '#bfd7ff'}}>
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
        return <Entity className="item intersectable" hoverable hovered_menu_item
                       events={{
                           click: (evt) => {
                               let el = evt.target;
                               console.log('clicked')
                               this.props.onMenuItemClicked(el, this.state.model)
                           }
                       }}>
            <Entity scale={{x: scaleFactor, y: scaleFactor, z: scaleFactor}}
                    position={this.state.position}
                    rotation={{x: 90, y: 0, z: 0}}
                    collada-model={this.state.model}
            />
        </Entity>
    }
}
