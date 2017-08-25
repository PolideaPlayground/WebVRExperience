import React from 'react';
import {Entity} from "aframe-react";

export default class Playground extends React.Component {

    render() {
        var plane_width = this.props.dim + 1;
        var plane_height = this.props.dim + 1;
        let p = {x: 1.0, y: 1.0, z: 0};
        console.log(plane_width);
        let rows = [];
        for (let j = 0; j < this.props.dim; j++) {
            for (let i = 0; i < this.props.dim; i++) {

                rows.push(<Field key={`${i}${j}`}
                                 position={{x: p.x + i, y: p.y + j, z: p.z}}/>)
            }
        }
        return (
            <Entity {...this.props}
                    className="fields">
                <Entity
                    geometry={{primitive: 'plane', width: plane_width, height: plane_height}}
                    position={{x: plane_width / 2, y: plane_height / 2, z: 0}}
                    material={{color: '#99d9ff'}}

                />
                {rows}
            </Entity>
        )
    }
}

class Field extends React.Component {
    //TODO animations not working, because React is substituting the child
    render() {
        return (
            <Entity {...this.props}
                    mixin='cube'
                    hoverable
                    hovered_field
                    geometry={{width: 1, height: 1, depth: 0.4}}
                    material={{color: "#222"}}
                    className="field intersectable"
            >

            </Entity>
        )
    }

}