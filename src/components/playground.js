import React from 'react';
import {Entity} from "aframe-react";
import {deselectCurrentMode, getCurrentlySelectedTexture, getCurrentlySelectedModel, selectCurrentModel} from "./redux/game_state";
import {connectExit, disconnectExits} from "./redux/neon_state";


export const ROCKS = {
    "#sun": {
        texture: '#sunTexture',
        position: {x: 0, y: 0, z: 0},
        visible: false,
        selectable: true,
        model: "",
    },
    "#sticks": {
        texture: '#sticksTexture',
        position: {x: 0.55, y: 0, z: 0},
        visible: false,
        selectable: true,
        model: "",
    },
    "fog": {
        texture: '#fogTexture',
        position: {x: 1.1, y: 0, z: 0},
        visible: false,
        selectable: true,
        model: "",
    },
    "fence": {
        texture: '#fenceTexture',
        position: {x: 0, y: 0, z: 0.6},
        visible: false,
        selectable: true,
        model: "",
    },
    "eye": {
        texture: '#eyeTexture',
        position: {x: 0.55, y: 0, z: 0.6},
        visible: false,
        selectable: true,
        model: "",
    },
    "birds": {
        texture: '#birdsTexture',
        position: {x: 1.1, y: 0, z: 0.6},
        visible: false,
        selectable: true,
        model: "",
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
            visible={data.visible}
            onFieldClicked={callback}
            position={data.position}
        />
    }

    onDiskChange(el, name) {
        let fields = this.state.fields;
        var fieldModel = fields[name];
        //Check if model is selected in game state
        let selectedTexture = getCurrentlySelectedTexture(el);
        let isDirty = false;
        if (fieldModel.selectable) {
            if (selectedTexture) {
                console.log("Placing: " + selectedTexture);
                fieldModel.modelSrc = selectedTexture;
                fieldModel.visible = true;
                deselectCurrentMode(el);
                isDirty = true;
            } else if (fieldModel.model) {
                let model = fieldModel.model;
                //Pickup model
                console.log("Picking up: " + model);
                fieldModel.modelSrc = "";
                fieldModel.visible = false;
                selectCurrentModel(el, model);
                isDirty = true;
            }

            if (isDirty) {
                fields[name] = fieldModel;
                this.setState({
                    fields: fields
                });

               // this.checkExitsConnect(el);
            }
        }
    }

    checkExitsConnect(el) {
        disconnectExits(el);
        return this.checkConnection(el, 1, 0) || this.checkConnection(el, 0, 1);
    }

    checkConnection(el, startIdx, startIdy) {
        let exitIndex = this.props.dim - 1;
        if (startIdy === exitIndex) {
            console.log(`Connected ${startIdx}, ${startIdy}`);
            if (startIdx === 0) {
                connectExit(el, "exit1");
            } else if (startIdx === exitIndex) {
                connectExit(el, "exit2");
            }
            return true;
        } else {
            let fields = this.state.fields;
            console.log(`${startIdx}, ${startIdy}`);
            let currentField = fields[startIdx][startIdy];
            let connected = false;
            console.log(currentField.model);
            if (currentField.model) {
                if (ROCKS[currentField.model].exit_up) {
                    let nextField = fields[startIdx][startIdy + 1];
                    if (nextField.model) {
                        if (ROCKS[nextField.model].start_down) {
                            connected = this.checkConnection(el, startIdx, startIdy + 1);
                        }
                    }
                }
                if (ROCKS[currentField.model].exit_right) {
                    let nextField = fields[startIdx + 1][startIdy];
                    if (nextField.model) {
                        if (ROCKS[nextField.model].start_left) {
                            connected = connected || this.checkConnection(el, startIdx + 1, startIdy);
                        }
                    }
                }
            }

            return connected;
        }
    }


    render() {
        return (
            <Entity {...this.props}
                    className="fields"
                    shadow="receive: false">
                <Desktop/>
                <Entity position={{x: -0.55, y: 0.5, z: -0.2}}>
                    {
                        this.createAllRocks(this.onDiskChange)
                    }
                </Entity>
            </Entity>
        )
    }
}
const scaleFactor = 0.04;

class Rock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
        }
    }

    render() {
        let {visible, ...other} = this.props;
        return (
            <Entity
                {...other}

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

                {<Entity
                    visible={visible}>
                    <Entity id="model"
                        scale={{x: scaleFactor, y: scaleFactor, z: scaleFactor}}
                        rotation={{x: 0.0, y: 0.0, z: -90.0}}
                        position={{x: 0.0, y: 0.0, z: -0.25}}
                        collada-model="#rockDisk"    
                        />
                    <a-image
                        position="0 0.15 0"
                        rotation="90 0 0"
                        scale="0.4 0.4 1"
                        src={this.props.modelSrc}/>
                    </Entity>
                }
            </Entity>
        )
    }

}

class Desktop extends React.Component {
    render() {
        return <Entity
            {...this.props}
            id="Desktop"
            collada-model="#rockDesktop"/>
    }
}