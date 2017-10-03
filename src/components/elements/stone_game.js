import React from 'react';
import {Entity} from "aframe-react";
import {
    deselectCurrentDisk,
    getCurrentlySelectedDisk,
    selectCurrentDisk
} from "../redux/game_state";
import {toggleBirds, toggleFog, toggleMushroom, toggleNight} from "../redux/environment_state";
import {SELECTED_STATE} from "../properties/stone_field";


export const ROCKS = {
    "#sun": {
        texture: '#sunTexture',
        position: {x: 0.02, y: 0.05, z: 0.05},
        placed: false,
    },
    "#sticks": {
        texture: '#sticksTexture',
        position: {x: 0.57, y: 0.05, z: 0.05},
        placed: false,
    },
    "#fog": {
        texture: '#fogTexture',
        position: {x: 1.12, y: 0.05, z: 0.05},
        placed: false,
    },
    "#mushroom": {
        texture: '#mushroomTexture',
        position: {x: 0.02, y: 0.05, z: 0.6},
        placed: false,
    },
    "#eye": {
        texture: '#eyeTexture',
        position: {x: 0.57, y: 0.05, z: 0.6},
        placed: false,
    },
    "#birds": {
        texture: '#birdsTexture',
        position: {x: 1.12, y: 0.05, z: 0.6},
        placed: false,
    }
};

export default class StoneGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: ROCKS
        };

        this.onDiskChange = this.onDiskChange.bind(this);
    }

    createAllRocks() {
        return Object.entries(this.state.fields).map((field) => {
            return this.createRock(field[0], field[1],);
        })
    }

    createRock(name, data) {
        return <Rock
            key={name}
            name={name}
            rock={data}
            onFieldClicked={this.onDiskChange}
        />
    }

    onDiskChange(el, name) {
        let fields = this.state.fields;
        let fieldModel = fields[name];

        //Check if model is selected in game state
        let selectedTexture = getCurrentlySelectedDisk(el);
        let isDirty = false;
        if (selectedTexture && fieldModel.texture === selectedTexture) {
            console.log("Placing: " + selectedTexture);
            fieldModel.placed = true;
            el.addState(SELECTED_STATE);
            deselectCurrentDisk(el);
            isDirty = true;
        } else if (!selectedTexture && fieldModel.placed) {
            let texture = fieldModel.texture;
            //Pickup model
            console.log("Picking up: " + texture);
            fieldModel.placed = false;
            el.removeState(SELECTED_STATE);
            selectCurrentDisk(el, texture);
            isDirty = true;
        } else {
            el.emit("run_fail");
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

        if (this.state.fields["#mushroom"].placed) {
            toggleMushroom(element, true);
        } else {
            toggleMushroom(element, false);
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
                        this.createAllRocks()
                    }
                </Entity>
            </Entity>
        )
    }
}
const scaleFactor = 0.8;

class Rock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            rock: this.props.rock,
            onFieldClicked: this.props.onFieldClicked
        }
    }

    entityCallback(el) {
        this.el = el;
    }

    render() {
        let rock = this.state.rock;
        let down_position, up_position, hovered_position;
        down_position = {x: rock.position.x, y: rock.position.y - 0.15, z: rock.position.z};
        hovered_position = {x: rock.position.x, y: rock.position.y - 0.05, z: rock.position.z};
        up_position = rock.placed ? down_position : {x: rock.position.x, y: rock.position.y, z: rock.position.z};

        return (
            <Entity
                _ref={(el) => this.entityCallback(el)}
                key={this.state.name}
                controller-clickable
                stone_field={{
                    position_down: down_position,
                    position_hovered: hovered_position,
                    position_up: up_position
                }}
                position={up_position}
                sound="src: #rockSound; on: run_down"
                sound__hover="src: #hoverSound; on: run_hovered"
                sound__fail="src: #failSound; on: run_fail"
                className="intersectable"
                shadow="receive: false"
                events={{
                    click: (evt) => {
                        let el = evt.target;
                        this.state.onFieldClicked(this.el, this.state.name);
                    }
                }}
            >
                <SquareStone
                    stone_texture={rock.texture}/>
                <RoundStone
                    visible={rock.placed}
                    stone_texture={rock.texture}
                />
            </Entity>
        )
    }

}

class SquareStone extends React.Component {
    render() {
        return <Entity>
            <Entity
                collada-model="#rockButton"
            />
            <a-image
                position="0 0.115 0"
                rotation="270 0 0"
                scale="0.4 0.4 1"
                src={this.props.stone_texture}/>
        </Entity>
    }
}

class RoundStone extends React.Component {
    render() {
        return <Entity
            {...this.props}
            rotation="0 180 0"
            position={{x: 0.0, y: 0.2, z: 0}}>
            <Entity id="model"
                    scale={{x: scaleFactor, y: scaleFactor, z: scaleFactor}}
                    collada-model="#rockDisk"/>
            <a-image
                position="0 0.055 0"
                rotation="270 180 0"
                scale="0.33 0.33 1"
                src={this.props.stone_texture}/>
        </Entity>
    }
}