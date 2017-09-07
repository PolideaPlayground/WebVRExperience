import React from 'react';
import {Entity} from "aframe-react";
import {
    deselectCurrentModel,
    getCurrentlySelectedTexture,
    selectCurrentModel
} from "./redux/game_state";
import {toggleBirds, toggleFog, toggleNight} from "./redux/environment_state";


export const ROCKS = {
    "#sun": {
        texture: '#sunTexture',
        position: {x: 0, y: 0, z: 0},
        placed: false,
    },
    "#sticks": {
        texture: '#sticksTexture',
        position: {x: 0.55, y: 0, z: 0},
        placed: false,
    },
    "#fog": {
        texture: '#fogTexture',
        position: {x: 1.1, y: 0, z: 0},
        placed: true,
    },
    "#fence": {
        texture: '#fenceTexture',
        position: {x: 0, y: 0, z: 0.6},
        placed: false,
    },
    "#eye": {
        texture: '#eyeTexture',
        position: {x: 0.55, y: 0, z: 0.6},
        placed: false,
    },
    "#birds": {
        texture: '#birdsTexture',
        position: {x: 1.1, y: 0, z: 0.6},
        placed: false,
    }
};

export default class Playground extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: ROCKS
        };

        this.onDiskChange = this.onDiskChange.bind(this);
    }

    createAllRocks(callback) {
        return Object.entries(this.state.fields).map((field) => {
            return this.createRock(field[0], field[1], callback);
        })
    }

    createRock(name, data, callback) {
        return <Rock
            key={name}
            name={name}
            src={data.texture}
            hovered_field={
                {
                    position_down: {x: data.position.x, y: data.position.y - 0.15, z: data.position.z},
                    position_up: {x: data.position.x, y: data.position.y, z: data.position.z}
                }
            }
            placed={data.placed}
            onFieldClicked={callback}
            position={data.position}
        />
    }

    onDiskChange(el, name) {
        let fields = this.state.fields;
        let fieldModel = fields[name];

        //Check if model is selected in game state
        let selectedTexture = getCurrentlySelectedTexture(el);
        let isDirty = false;
        if (selectedTexture && fieldModel.texture === selectedTexture) {
            console.log("Placing: " + selectedTexture);
            fieldModel.placed = true;
            deselectCurrentModel(el);
            isDirty = true;
        } else if (fieldModel.placed) {
            let texture = fieldModel.texture;
            //Pickup model
            console.log("Picking up: " + texture);
            fieldModel.placed = false;
            selectCurrentModel(el, texture);
            isDirty = true;
        }

        if (isDirty) {
            fields[name] = fieldModel;
            this.setState({
                fields: fields
            });

            this.enableDisableEffects(el);
        }
    }


    enableDisableEffects(element) {
        if (this.state.fields["#fog"].placed) {
            toggleFog(element, true);
        } else {
            toggleFog(element, false);
        }

        if (this.state.fields["#sun"].placed) {
            toggleNight(element, false);
        } else {
            toggleNight(element, true);
        }

        if (this.state.fields["#birds"].placed) {
            toggleBirds(element, true);
        } else {
            toggleBirds(element, false);
        }
    }

    render() {
        return (
            <Entity {...this.props}
                    id="stonePlayground"
                    className="fields"
                    shadow="receive: false">
                <Entity
                    collada-model="#rockDesktop"/>

                <Entity position={{x: -0.55, y: 0.5, z: -0.2}}>
                    {
                        this.createAllRocks(this.onDiskChange)
                    }
                </Entity>
            </Entity>
        )
    }
}
const scaleFactor = 1;

class Rock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
        }
    }

    render() {
        return (
            <Entity
                {...this.props}
                id={this.props.src}
                hoverable
                sound="src: #rockSound; on: fusing"
                className="field intersectable"
                shadow="receive: false"
                events={{
                    click: (evt) => {
                        let el = evt.target;
                        this.props.onFieldClicked(el, this.state.name);
                    }
                }}
            >

                <Entity
                    id={this.props.src}
                    collada-model="#rockButton"
                />
                <a-image
                    position="0 0.15 0"
                    rotation="90 0 0"
                    scale="0.4 0.4 1"
                    src={this.props.src}/>

                <Entity
                    visible={this.props.placed}
                    position={{x: 0.0, y: 0.2, z: 0.}}>
                    <Entity id="model"
                            scale={{x: scaleFactor, y: scaleFactor, z: scaleFactor}}
                            collada-model="#rockDisk"/>
                    <a-image
                        position="0 0.15 0"
                        rotation="90 0 0"
                        scale="0.4 0.4 1"
                        src={this.props.src}/>
                </Entity>
            </Entity>
        )
    }

}