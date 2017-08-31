import React from 'react';
import {Entity} from "aframe-react";
import {selectCurrentModel, deselectCurrentMode, getCurrentlySelectedModel} from "./redux/game_state";
import {WIRES} from "./elements/wires";
import {connectExit, disconnectExits} from "./redux/neon_state";

export default class Playground extends React.Component {
    constructor(props) {
        super(props);

        let p = {x: 1.0, y: 1.0, z: 0};
        let fields = [];
        let dimension = this.props.dim;
        for (let x = 0; x < dimension; x++) {
            let column = [];
            for (let y = 0; y < dimension; y++) {
                let fieldModel = {
                    id_x: x,
                    id_y: y,
                    position: {x: p.x + x, y: p.y + y, z: p.z},
                    model: "",
                    visible: false,
                    selectable: true
                };
                column.push(fieldModel);
            }
            fields.push(column);
        }

        //Init and lock entry field
        fields[0][0].selectable = false;
        fields[0][0].model = "#wireFork";
        fields[0][0].visible = true;

        //Init and lock exit field 1
        let exitIdx = dimension - 1;
        fields[0][exitIdx].selectable = false;
        fields[0][exitIdx].model = "#wireVertical";
        fields[0][exitIdx].visible = true;

        //Init and lock exit field 2
        fields[exitIdx][exitIdx].selectable = false;
        fields[exitIdx][exitIdx].model = "#wireVertical";
        fields[exitIdx][exitIdx].visible = true;

        this.state = {
            fields: fields
        };

        this.onFieldChange = this.onFieldChange.bind(this);
    }

    onFieldChange(el, id_x, id_y) {
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
                if (WIRES[currentField.model].exit_up) {
                    let nextField = fields[startIdx][startIdy + 1];
                    if (nextField.model) {
                        if (WIRES[nextField.model].start_down) {
                            connected = this.checkConnection(el, startIdx, startIdy + 1);
                        }
                    }
                }
                if (WIRES[currentField.model].exit_right) {
                    let nextField = fields[startIdx + 1][startIdy];
                    if (nextField.model) {
                        if (WIRES[nextField.model].start_left) {
                            connected = connected || this.checkConnection(el, startIdx + 1, startIdy);
                        }
                    }
                }
            }

            return connected;
        }
    }

    renderField(field, clickCallback) {
        return <Field key={`${field.id_x}${field.id_y}`}
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
        var plane_width = this.props.dim + 1;
        var plane_height = this.props.dim + 1;

        return (
            <Entity {...this.props}
                    className="fields">
                <Entity
                    geometry={{primitive: 'plane', width: plane_width, height: plane_height}}
                    position={{x: plane_width / 2, y: plane_height / 2, z: 0}}
                    material={{color: '#99d9ff'}}
                />
                {
                    this.state.fields.map(
                        (columns) => columns.map((field) => this.renderField(field, this.onFieldChange)))
                }
            </Entity>
        )
    }
}

const scaleFactor = 0.04;

class Field extends React.Component {
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
                    material={{color: "#222"}}
                    className="field intersectable"
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