import {Entity} from "aframe-react";
import React from 'react';
import {selectCurrentModel} from "../redux/game_state";

export const DISKS = {
    "#sun": {
        position: {x: -0.6, y: 0.2, z: 0.2},
        texture: "#sunTexture",
    },
    "#fog": {
        position: {x: 0.6, y: -1, z: 0.2},
        texture: "#fogTexture",
    },
    "#eye": {
        position: {x: -0.6, y: -1, z: 0.2},
        texture: "#eyeTexture",
    },
    "#birds": {
        position: {x: 0.6, y: 0.2, z: 0.2},
        texture: "#birdsTexture",
    }
};

export default class Rocks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: DISKS
        };
    }

    createRock(field) {
        return <Rock key={field.texture}
                     position={field.position}
                     texture={field.texture}
                     onMenuItemClicked={Rock.onMenuItemClicked}/>
    }

    createAllRocks(fields) {
        return Object.entries(fields).map((field) => {
            return this.createRock(field[1]);
        })
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
const scaleFactor = 2;

class Rock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            texture: this.props.texture,
            position: this.props.position
        }
    }

    static onMenuItemClicked(el, model) {
        //Pickup model
        console.log("Picking up: " + model);
        selectCurrentModel(el, model);
    }

    render() {
        return <Entity className="item intersectable"
                       hoverable hovered_menu_item
                       rotation={{x: 0, y: 0, z: 0}}
                       position={this.state.position}
                       shadow="cast: false; receive: false"
                       events={{
                           click: (evt) => {
                               let el = evt.target;
                               Rock.onMenuItemClicked(el, this.state.texture)
                           }
                       }}>
            <Entity scale={{x: scaleFactor, y: scaleFactor, z: scaleFactor}}
                    rotation={{x: 90, y: 0, z: 0}}
                    shadow="cast: false; receive: false"
                    collada-model="#rockDisk"
            />
            <a-image
                position="0 0 0.15"
                src={this.state.texture}/>
        </Entity>
    }
}
