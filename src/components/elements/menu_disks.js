import {Entity} from "aframe-react";
import React from 'react';
import {deselectCurrentDisk, selectCurrentDisk} from "../redux/game_state";

export const DISKS = {
    "#sun": {
        position: {x: -0.6, y: 0.6, z: 0.2},
        texture: "#sunTexture",
        textureId: "#menuSunTexture",
    },
    "#fog": {
        position: {x: 0.6, y: -0.6, z: 0.2},
        texture: "#fogTexture",
        textureId: "#menuFogTexture",
    },
    "#eye": {
        position: {x: -0.6, y: -0.6, z: 0.2},
        texture: "#fenceTexture",
        textureId: "#menuFenceTexture",
    },
    "#birds": {
        position: {x: 0.6, y: 0.6, z: 0.2},
        texture: "#birdsTexture",
        textureId: "#menuBirdsTexture",
    }
};

class Rock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            field: this.props.field,
        }
    }

    static onMenuItemClicked(el, model) {
        //Pickup model
        console.log("Picking up: " + model);
        selectCurrentDisk(el, model);
    }

    render() {
        return (
            <Entity
                className="item intersectable"
                hoverable
                hovered_menu_item
                geometry={{primitive: 'plane', width: 1.0, height: 1.0}}
                material={{color: 'white', opacity: 1.0}}
                rotation={{x: 0, y: 0, z: 0}}
                position={this.state.field.position}
                shadow="cast: false; receive: false"
                events={{
                    click: (evt) => {
                        let el = evt.target;
                        Rock.onMenuItemClicked(el, this.state.field.texture)
                    }
                }}>
                <a-image
                    position="0.05 -0.05 0.15"
                    src={this.state.field.textureId}/>
            </Entity>
        );
    }
}

export default class Rocks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: DISKS
        };
    }

    createRock(field) {
        return <Rock key={field.texture}
                     field={field}
        />
    }

    onTrashClicked(el) {
        deselectCurrentDisk(el);
    }

    createAllRocks(fields) {
        return Object.entries(fields).map((field) => {
            return this.createRock(field[1]);
        })
    }

    render() {
        return (
            <Entity {...this.props}
                    className="menu">
                <Entity
                    geometry={{primitive: 'plane', width: 2.4, height: 2.4}}
                    material={{color: 'white', opacity: 1.0}}
                    shadow="receive: false; cast: true">
                    {this.createAllRocks(this.state.fields)}
                </Entity>
                <Entity
                    className="item intersectable"
                    hoverable
                    hovered_menu_item
                    geometry={{primitive: 'plane', width: 1.0, height: 1.0}}
                    material={{color: 'white', opacity: 1.0}}
                    position={{x: 0, y: -2.0, z: 0}}
                    shadow="cast: false; receive: false"
                    events={{
                        click: (evt) => {
                            let el = evt.target;
                            this.onTrashClicked(el)
                        }
                    }}>
                    <a-image
                        position="0.05 -0.05 0.15"
                        src="#menuBinTexture"/>
                </Entity>
            </Entity>
        );
    }
}
