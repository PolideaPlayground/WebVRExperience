import 'aframe';
import 'aframe-particle-system-component';
import 'aframe-physics-system';
import {Entity} from 'aframe-react';
import React from 'react';

export default class Obstacle extends React.Component {
  render() {
    let rot;
    let state = this.props.state
    if (state === 'left') {
      rot = {
        x: 0,
        y: 0,
        z: 45
      };

    } else if (state === 'right') {
      rot = {
        x: 0,
        y: 0,
        z: -45
      };
      
    } else {
      throw new Error(`Cannot create obstacle with state ${state}`);
    }

    return (<Entity
      geometry={{
      primitive: 'box',
      height: "4",
      width: "0.5"
    }}
    
      static-body
      material={{
      color: 'yellow'
    }}
      rotation={rot}
      position={this.props.pos}>
      <Animation rot={rot} state={state} />
      </Entity>)
  }
}

class Animation extends React.Component{
  // constructor(entity){
  //   changeEnityState(entity.props)
  // },
  render(){
    return (<Entity
    animation__rotate={{
      property: 'rotation',
      startEvent: 'click',
      from: this.props.rot,
      to: animate(this.props.state)
    }}/>)
  }
}

function animate(beginState){
  if (beginState === 'left') {
      return {
        x: 0,
        y: 0,
        z: -45
      };

    } else if (beginState === 'right') {
      return {
        x: 0,
        y: 0,
        z: 45
      };
    } else {
      throw new Error(`Cannot create obstacle with state ${beginState}`);
    }
}

