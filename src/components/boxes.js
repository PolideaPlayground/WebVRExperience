import { Entity } from "aframe-react";
import React from "react";

let chosenBox;

export default class Boxes extends React.Component {
  render() {
    return (
      <Entity>
        <ClickableBox color="green" position="2 4 -4" />
      </Entity>
    );
  }
}

class ClickableBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      c: props.color,
      p: props.position,
      selected: false
    };
  }
  interYey() {
    console.log("InterYey!");
  }
  scream() {
    console.log("lol!");
    console.log(this);
    chosenBox = this;
    this.setState({
      c: "yellow",
      selected: true
    });
  }
  render() {
      let xml = <Entity
          className="intersectable"
          mixin="cube red"
          material={{ color: this.state.c }}
          position={this.state.p}
          events={{
              click: this.scream.bind(this),
              "raycaster-intersected": this.interYey.bind(this)
          }}
      >
          {this.state.selected ? <a-animation attribute="scale" repeat="indefinite" to="1.1 1.1 1.1" direction="alternateReverse" fill="both"></a-animation> : <div />}
      </Entity>;
      return (
      xml
    );
  }
}
