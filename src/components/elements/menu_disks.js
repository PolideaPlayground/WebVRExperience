import {Entity} from "aframe-react";
import React from 'react';
import {deselectCurrentDisk, selectCurrentDisk} from "../redux/game_state";
import ReactGA from 'react-ga';

export const DISKS = {
    "#sun": {
        position_down: {x: -0.5, y: 0.5, z: 0.0},
        position_up: {x: -0.5, y: 0.5, z: 0.1},
        texture: "#sunTexture",
        textureId: "#menuSunTexture",
    },
    "#fog": {
        position_down: {x: 0.5, y: -0.5, z: 0.0},
        position_up: {x: 0.5, y: -0.5, z: 0.1},
        texture: "#fogTexture",
        textureId: "#menuFogTexture",
    },
    "#mushroom": {
        position_down: {x: -0.5, y: -0.5, z: 0.0},
        position_up: {x: -0.5, y: -0.5, z: 0.1},
        texture: "#mushroomTexture",
        textureId: "#menuMushroomTexture",
    },
    "#birds": {
        position_down: {x: 0.5, y: 0.5, z: 0.0},
        position_up: {x: 0.5, y: 0.5, z: 0.1},
        texture: "#birdsTexture",
        textureId: "#menuBirdsTexture",
    }
};

class MenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            field: this.props.field,
        }
    }

    onMenuItemClicked(el, model) {
        //Pickup model
        console.log("Picking up: " + model);
        ReactGA.event({
            category: 'Menu Action',
            action: "Picking up: " + model,
        });

        selectCurrentDisk(el, model);
    }

    render() {
        return (
            <Entity
                className="item intersectable"
                controller-clickable
                hovered_menu_item={{
                    position_down: this.state.field.position_down,
                    position_up: this.state.field.position_up
                }}
                geometry={{primitive: 'plane', width: 1.0, height: 1.0}}
                material={{shader: "flat", color: 'white', opacity: 1.0}}
                rotation={{x: 0, y: 0, z: 0}}
                position={this.state.field.position_up}
                shadow="cast: false; receive: false"
                events={{
                    click: (evt) => {
                        let el = evt.target;
                        this.onMenuItemClicked(el, this.state.field.texture)
                    }
                }}>
                <a-image
                    position="0.0 -0.05 0.005"
                    scale="0.8 0.8 0.8"
                    src={this.state.field.textureId}/>
            </Entity>
        );
    }
}

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: DISKS
        };
    }

    createRock(field) {
        return <MenuItem key={field.texture}
                         field={field}
        />
    }

    onTrashClicked(el) {
        ReactGA.event({
            category: 'Menu Action',
            action: 'Remove Disk',
        });

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
                    shadow="receive: false">
                    {this.createAllRocks(this.state.fields)}
                </Entity>
                <Entity
                    className="item intersectable"
                    hovered_menu_item={{
                        position_down: {x: 0, y: -1.5, z: 0},
                        position_up: {x: 0, y: -1.5, z: 0.1}
                    }}
                    geometry={{primitive: 'plane', width: 0.7, height: 0.7}}
                    material={{shader: "flat", color: 'white', opacity: 1.0}}
                    position={{x: 0, y: -1.5, z: 0.1}}
                    shadow="cast: false; receive: false"
                    events={{
                        click: (evt) => {
                            let el = evt.target;
                            this.onTrashClicked(el)
                        }
                    }}>
                    <a-image
                        position="0.02 -0.0 0.005"
                        scale="0.55 0.55 0.55"
                        src="#menuBinTexture"/>
                </Entity>
            </Entity>
        );
    }
}
