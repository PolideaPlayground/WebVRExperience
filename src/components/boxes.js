import { Entity } from "aframe-react";
import React from "react";

let chosenBox;

export default class Boxes extends React.Component {
  render() {
    return (
      <Entity>
        <ClickableBox color="green" position="2 4 -4" />
        <ClickableBox color="blue" position="0 2 -4" id="test" />

        <ClickableBox position="-2 2 -4" color="violet" />
      </Entity>
    );
  }
}

class ClickableBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      c: props.color,
      p: props.position
    };
  }
interYey(){
    console.log('InterYey!')
}
  scream() {
    console.log("lol!");
    console.log(this);
    chosenBox = this;
    this.setState({
      c: "yellow"
    });
  }
  render() {
    return (
      <Entity

        className="intersectable"
        name="test"
        mixin="cube"
        material={{ color: this.state.c }}
        position={this.state.p}
         events={{
          click: this.scream.bind(this),
          'raycaster-intersected': this.interYey.bind(this)
        }}
      >
          {this.state.selected ? <a-animation/> : <div/>

          }
      </Entity>
    );
  }
}
