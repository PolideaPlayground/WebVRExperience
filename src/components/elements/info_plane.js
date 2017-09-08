import {Entity} from "aframe-react";
import React from 'react';


export default class Info extends React.Component {
    render() {
        return <Entity {...this.props}
                       id="info"
                       geometry={{primitive: 'plane', width: 4, height: 4}}
                       material={{color: '#eeeeee', opacity: 0.8}}
                       shadow="receive: false; cast: true">
            <Instructions />
            <About />
        </Entity>
    }
}

class Instructions extends React.Component {
    render() {
        return <Entity
            geometry={{primitive: 'plane', width: 4, height: 2}}
            material={{color: 'brown', opacity: 0.8}}
            position={{x:0, y:1.5, z:0}}
            text="width: 7; height: auto; align: center; color: #595959; value: INSTRUCTIONS"
        />
    }
}

class About extends React.Component {
    onPolideaClicked(){

    }
    render() {
        return <Entity
            position={{x:0, y:-1, z:0}}
            text="align: center;  width: 6; height: auto; color: #1da0db; value: About POLIDEA"
            events={{
                click: (evt) => {
                    let el = evt.target;
                    this.onPolideaClicked(el, this.state.texture)
                }
            }}
        />
    }
}