import React from 'react';
import {Entity} from "aframe-react";
import {deselectCurrentMode, getCurrentlySelectedModel, selectCurrentModel} from "./redux/game_state";
import {ROCKS} from "./elements/rocks";
import {connectExit, disconnectExits} from "./redux/neon_state";


export const DISKS = {
    "#sun": {
        texture: '#sunTexture',
        position: {x:0, y:0, z:0},
        visibla: true
    },
    "#sticks": {
        texture: '#sticksTexture',
        position: {x:1, y:0, z:0},
        visibla: true
    },
    "mist": {
        texture: '#mistTexture',
        position: {x:2, y:0, z:0},
        visibla: true
    },
    "fence": {
        texture: '#fenceTexture',
        position: {x:0, y:1, z:0},
        visibla: true
    },
    "eye": {
        texture: '#eyeTexture',
        position: {x:1, y:1, z:0},
        visibla: true
    },
    "birds": {
        texture: '#birdsTexture',
        position: {x:2, y:1, z:0},
        visibla: true
    }
};

export default class Playground extends React.Component {
    constructor(props) {
        super(props);


        // let p = {x: 1.0, y: 1.0, z: 0};
        // let fields = [];
        // let dimensionX = this.props.dimX;
        // let dimensionY = this.props.dimY;
        // for (let x = 0; x < dimensionX; x++) {
        //     let column = [];
        //     for (let y = 0; y < dimensionY; y++) {
        //         let fieldModel = {
        //             id_x: x,
        //             id_y: y,
        //             position: {x: p.x + x, y: p.y + y, z: p.z},
        //             model: "",
        //             visible: false,
        //             selectable: true
        //         };
        //         column.push(fieldModel);
        //     }
        //     fields.push(column);
        // }

        this.state = {
            fields: DISKS
        };

        this.onDiskChange = this.onDiskChange.bind(this);
    }

    createAllDisks() {
        return Object.entries(this.state.fields).map((field) => {
            return this.createDisk(field[0], field[1]);
        })
    }

    createDisk(name, data, callback) {
        return <Disk key={name}
                     src={data.texture}
                     hovered_field={
                         {
                             position_down: {x: data.position.x, y: data.position.y, z: data.position.z - 0.15},
                             position_up: {x: data.position.x, y: data.position.y, z: data.position.z}
                         }
                     }
                     visible={data.visible}
                     onFieldClicked={callback}
        />
    }

    onDiskChange(el, id_x, id_y) {
        let fields = this.state.fields;
        var fieldModel = fields[id_x][id_y];
        //Check if model is selected in game state
        let selectedModel = getCurrentlySelectedModel(el);
        let isDirty = false;
        if (fieldModel.selectable) {
            if (selectedModel) {
                console.log("Placing: " + selectedModel);
                fieldModel.model = selectedModel;
                fieldModel.visible = true;
                deselectCurrentMode(el);
                isDirty = true;
            } else if (fieldModel.model) {
                let model = fieldModel.model;
                //Pickup model
                console.log("Picking up: " + model);
                fieldModel.model = "";
                fieldModel.visible = false;
                selectCurrentModel(el, model);
                isDirty = true;
            }

            if (isDirty) {
                fields[id_x][id_y] = fieldModel;
                this.setState({
                    fields: fields
                });

                this.checkExitsConnect(el);
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

    renderDisk(field, clickCallback) {
        return <Disk key={`${field.id_x}${field.id_y}`}
                     id_x={field.id_x}
                     id_y={field.id_y}
                     position={field.position}
                     hovered_field={
                         {
                             position_down: {x: field.position.x, y: field.position.y, z: field.position.z - 0.15},
                             position_up: {x: field.position.x, y: field.position.y, z: field.position.z}
                         }
                     }
                     model={field.model}
                     visible={field.visible}
                     onFieldClicked={clickCallback}
        />;
    }

    render() {
        return (
            <Entity {...this.props}
                    className="fields"
                    shadow="receive: false">
                <Desktop/>
                {
                    this.createAllDisks()
                    // this.state.fields.map(
                    //     (columns) => columns.map((field) => this.renderDisk(field, this.onDiskChange)))
                }
            </Entity>
        )
    }
}

const scaleFactor = 0.04;

class Disk extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id_x: this.props.id_x,
            id_y: this.props.id_y,
        }
    }

    render() {
        let {visible, ...other} = this.props;

        return (
            <Entity {...other}
                    mixin='cube'
                    hoverable
                    geometry={{width: 1, height: 1, depth: 0.4}}
                    sound="src: #rockSound; on: fusing"
                    collada-model="#rockButton"
                    className="field intersectable"
                    shadow="receive: false"
                    events={{
                        click: (evt) => {
                            let el = evt.target;
                            this.props.onFieldClicked(el, this.state.id_x, this.state.id_y);
                        }
                    }}
            >
                {<Entity id="model"
                         visible={visible}
                         scale={{x: scaleFactor, y: scaleFactor, z: scaleFactor}}
                         rotation={{x: 0.0, y: 0.0, z: -90.0}}
                         position={{x: 0.0, y: 0.0, z: -0.25}}
                         collada-model={this.props.model}/>}
            </Entity>
        )
    }

}

class Desktop extends React.Component {
    render() {
        return <Entity
            {...this.props}
            id="Desktop"
            // rotation={{x: 90, y: 0, z: 0}}
            // position={this.props.pos}

            collada-model="#rockDesktop"/>
    }
}