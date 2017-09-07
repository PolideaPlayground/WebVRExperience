import {Entity} from "aframe-react";
import React from 'react';
import {selectCurrentModel} from "../redux/game_state";

export const DISKS = {
    "#sun": {
        position: {x: -0.6, y: 0.2, z: -0.5},
        model: "#rockButton",
        exit_up: true,
        exit_right: true,
        start_left: true,
        start_down: false
    },
    "#midt": {
        position: {x: 0.6, y: -1, z: -0.5},
        model: "#rockButton",
        exit_up: false,
        exit_right: true,
        start_left: true,
        start_down: false
    },
    "#eye": {
        position: {x: -0.6, y: -1, z: -0.5},
        model: "#rockButton",
        exit_up: true,
        exit_right: false,
        start_left: true,
        start_down: false
    },
    "#fence": {
        position: {x: 0.6, y: 0.2, z: -0.5},
        model: "#rockButton",
        exit_up: true,
        exit_right: false,
        start_left: false,
        start_down: true
    },
    "#birds": {
        position: {x: 0.6, y: 0.2, z: -0.5},
        model: "#rockButton",
        exit_up: true,
        exit_right: false,
        start_left: false,
        start_down: true
    },
    "#sticks": {
        position: {x: 0.6, y: 0.2, z: -0.5},
        texture: "#sticksTexture",
        exit_up: true,
        exit_right: false,
        start_left: false,
        start_down: true
    }

};

export default class Rocks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: DISKS
        };
    }

    onMenuItemClicked(el, model) {
        //Pickup model
        console.log("Picking up: " + model);
        selectCurrentModel(el, model);
    }

    createAllRocks(fields) {
        return Object.entries(fields).map((field) => {
            return this.createRock(field[1]);
        })
    }

    createRock(field) {
        return <Rock key={field.model+Math.floor((Math.random() * 100) + 1)}
                     position={field.position}
                     model={field.model}
                     onMenuItemClicked={this.onMenuItemClicked}/>
    }

    render() {
        return <Entity {...this.props}
                       className="menu"
                       geometry={{primitive: 'plane', width: 4, height: 4}}
                       material={{color: '#bfd7ff'}}
                       shadow="receive: false; cast: true">
            {this.createAllRocks(this.state.fields)}
        </Entity>
    }
}
const scaleFactor = 0.05;

class Rock extends React.Component {
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
