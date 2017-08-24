import React from 'react';
import {Entity} from "aframe-react";

export default class Playground extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dim: this.props.dim}
    }

    render() {
        return (
            <BasicPlane id="plane" dim={3} pos={{x: 0, y: 3, z: -6}}/>
        )
    }
};

class BasicPlane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: this.props.dim + 2,
            y: this.props.dim + 2,
            rot: this.props.rot,
            pos: this.props.pos
        }
    }

    render() {
        let p = {x: -this.props.dim + 1, y: this.props.dim - 1, z: 0};
        let rows = [];
        let rot = {x: 0, y: 0, z: 0};
        for (let j = 1; j <= this.props.dim; j++) {
            for (let i = 1; i <= this.props.dim; i++) {

                rows.push(<Field class='fields' key={`${i}${j}`}
                                 position={{x: p.x + i, y: p.y - j, z: p.z + 1}}/>)
            }
        }
        return (
            <Entity geometry={{primitive: 'plane', width: this.state.x, height: this.state.y}}
                    material={{color: '#99d9ff'}} rotation={rot}
                    position={this.state.pos}
            >
                {rows}
            </Entity>
        )
    }
}

class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state_hovered: false,
        }
    }

    stateUpdated = (evt) => {
        let stateName = evt.detail.state;
        let stateValue = evt.target.is(evt.detail.state);

        if (stateName === "hovered") {
            console.log("hovered: " + stateValue)
            this.setState({
                state_hovered: stateValue,
            });
        }
    }

    //TODO animations not working
    render() {
        return (
            <Entity {...this.props}
                    mixin='cube'
                    hoverable
                    geometry={{width: 1, height: 1, depth: this.state.state_hovered ? 0.2 : 0.1}}
                    scale="1 1 1"
                    material={{color: this.state.state_hovered ? "yellow" : "#222"}}
                    className="intersectable"
                    events={{
                        stateadded: this.stateUpdated,
                        stateremoved: this.stateUpdated
                    }}
            >
                {/*{this.state.state_hovered ?*/}
                {/*<a-animation*/}
                {/*attribute="scale"*/}
                {/*from="1.0 1.0 2.0"*/}
                {/*to="1.0 1.0 0.5"*/}
                {/*/> : <a-animation*/}
                {/*attribute="scale"*/}
                {/*from="1.0 1.0 0.5"*/}
                {/*to="1.0 1.0 2.0"*/}
                {/*/>*/}
                {/*}*/}
            </Entity>
        )
    }

}