import { Entity } from "aframe-react";
import React from "react";
import ComplexBox from "./complex_box";

export default class Controlers extends React.Component {
  render() {
    return (
      <Entity>
        <GearVRCOntroller />
        <ComplexBox
          position="4 2 -4"
          rotation="0 0 180"
          color="#F55"
          animation__click={{
            startEvents: "click",
            property: "rotation",
            dur: 2000,
            loop: true,
            to: "360 360 360"
          }}
        />

        <Collider />
        <Entity
          class="collidable"
          primitive="a-box"
          position="-1 2 -4"
          color="blue"
        />

        <Entity primitive="a-camera" look-controls wasd-controls>
          <Entity
            primitive="a-cursor"
            cursor="fuse: true"
            raycaster="far: 30; objects: .intersectable"
            position="0 0 -0.75"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: yellow; shader: flat"
            animation__fusing={{
              startEvents: "fusing",
              fill: "forwards",
              property: "scale",
              easing: "easeInSine",
              dur: 2000,
              from: "1 1 1",
              to: "0.1 0.1 0.1"
            }}
            animation__click={{
              startEvents: "click",
              fill: "backwards",
              property: "scale",
              easing: "easeInSine",
              dur: 200,

              from: "0.1 0.1 0.1",
              to: "1 1 1"
            }}
          />
        </Entity>
      </Entity>
    );
  }
}

class GearVRCOntroller extends React.Component {
  render() {
    return (
      <Entity>
        <Entity gearvr-controls daydream-controls>
          <ComplexBox position="4 2 -4" rotation="0 0 45" />
        </Entity>
      </Entity>
    );
  }
}

class Collider extends React.Component {
  render() {
    return (
      <Entity id="player" collider-check>
        <Entity
          raycaster="objects: .collidable"
          position="0 -0.9 0"
          rotation="90 0 0"
        />
      </Entity>
    );
  }
}
