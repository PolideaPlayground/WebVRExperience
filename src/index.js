import 'aframe';
import 'aframe-particle-system-component';
import 'aframe-physics-system';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

class VRScene extends React.Component {
  render() {
    return (
      <Scene physics="debug: true">
        <Entity primitive='a-sky' color="black"/>

        <Entity
          primitive='a-plane'
          static-body
          rotation="-90 0 0"
          static-body
          color='pink'
          height="100"
          width="100"
          position={{
          x: 0,
          y: 0,
          z: 0
        }}/>

        <Box pos={{
          x: 0,
          y: 4,
          z: -5
        }}/>

        <Obstacle
          state='left'
          pos={{
          x: -1,
          y: 3,
          z: -5
        }}/>

        <Entity particle-system={{
          preset: 'snow'
        }}/>

        <Entity
          light={{
          type: 'point'
        }}
          intensity="2"
          position={{
          x: 2,
          y: 4,
          z: 4
        }}/>

        <Entity
          text={{
          value: 'Yeeeeeey!'
        }}
          color="yellow"
          position={{
          x: 0,
          y: 1,
          z: -1
        }}/>

        <Entity primitive='a-camera'>
          <Entity primitive="a-cursor"/>
        </Entity>

      </Scene>

    );
  }
}

class Box extends React.Component {
  render() {
    return (<Entity
      geometry={{
      primitive: 'box'
    }}
      dynamic-body="shape: box; mass: 2"
      depth="1"
      material={{
      color: 'red'
    }}
      rotation="0 0 43"
      position={this.props.pos}/>)
  }
}

class Obstacle extends React.Component {
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

ReactDOM.render(
  <VRScene/>, document.querySelector('#sceneContainer'));