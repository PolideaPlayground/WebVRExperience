import 'aframe';
import 'aframe-particle-system-component';
import 'aframe-animation-component';
import 'aframe-physics-system';
import {Entity} from 'aframe-react';
import React from 'react';

export default class Obstacle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionLabel: props.state,
      position: props.position,
      rotation: this.checkRotation(props.state)
    };
  }

  checkRotation(state) {
    if (state === 'left') {
      return {x: 0, y: 0, z: 45};

    } else if (state === 'right') {
      return {x: 0, y: 0, z: -45};
    } else {
      throw new Error(`Cannot create obstacle with state ${state}`);
    }
  }

  rotate() {
    if (this.state.positionLabel === 'left') {
      this.setState({
        positionLabel: 'right',
        rotation: {
          x: 0,
          y: 0,
          z: -45
        }
      })
    } else if (this.state.positionLabel === 'right') {
      this.setState({
        positionLabel: 'left',
        rotation: {
          x: 0,
          y: 0,
          z: 45
        }
      })
    } else {
      throw new Error(`Cannot rotate obstacle with begin state ${this.state.positionLabel}`);
    }
  }

  getRotateParams() {
    if (this.state.positionLabel === 'left') {
      return {x: 0, y: 0, z: -45}
    } else if (this.state.positionLabel === 'right') {
      return {x: 0, y: 0, z: 45}
    } else {
      throw new Error(`Cannot rotate obstacle with state ${this.state.positionLabel}`);
    }
  }

  render() {
    return (
      <Entity
        geometry={{
        primitive: 'box',
        height: "4",
        width: "0.5"
      }}
        material={{
        color: 'yellow'
      }}
        static-body
        rotation={this.state.rotation}
        position={this.state.position}
        events={{
        click: this
          .rotate
          .bind(this)
      }}></Entity>
    )
  }
}

class Rotation extends React.Component {
  render() {
    return (<Entity
      animation={{
      property: 'rotation',
      from: this.props.currentRotation,
      to: this.props.targetRotation
    }}/>)
  }
}
