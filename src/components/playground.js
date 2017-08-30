import React from 'react';
import {Entity} from "aframe-react";
import {selectCurrentModel, deselectCurrentMode, getCurrentlySelectedModel} from "./redux/game_state";

export default class Playground extends React.Component {
    constructor(props) {
        super(props);

        let p = {x: 1.0, y: 1.0, z: 0};
        let fields = [];
        for (let x = 0; x < this.props.dim; x++) {
            let column = [];
            for (let y = 0; y < this.props.dim; y++) {
                let fieldModel = {
                    id_x: x,
                    id_y: y,
                    position: {x: p.x + x, y: p.y + y, z: p.z},
                    model: "", //TODO remove
                    visible: false
                };
                column.push(fieldModel);
            }
            fields.push(column);
        }
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

const scaleFactor = 0.05;

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
                    sound="src: #sound2; on: click"
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
                         rotation={{x: 90.0, y: 0.0, z: 0.0}}
                         position={{x: 0.0, y: 0.5, z: 0.0}}
                         collada-model={this.props.model}/>}
            </Entity>
        )
    }

}