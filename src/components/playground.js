import React from 'react';
import {Entity} from "aframe-react";

export default class Playground extends React.Component {
    constructor(props){
        super(props);
        this.setState = {
            width: this.props.x,
            height: this.props.y
        }
    }
    render(){
        return(
            <BasicBlock id='plane' x='3' y='3' position={{x: 2, y: 6, z: -4}} color='pink'/>
        )
    }
};

class BasicBlock extends React.Component {
    constructor(props){
        super(props);
        this.setState = {
            width: this.props.x,
            height: this.props.y
        }
    }
    render(){
        return (
            <Entity mixin='cube' geometry={{width:this.props.width, height: this.props.height}}/>
        )
    }
        
}