import { Entity } from "aframe-react";
import React from "react";
import ComplexBox from "./elements/complex_box";

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
          id="cursor"
            primitive="a-cursor"
            cursor="fuse: true"
            raycaster="far: 20; objects: .intersectable; showLine: true"
            line="color: black; opacity: 2"
            rotation="0 0 0"
            position="0 0 -0.75"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: yellow; shader: flat"
          >
            {/*TODO React-ify*/}
            <a-animation
              begin="click"
              easing="ease-in"
              attribute="scale"
              fill="backwards"
              from="0.1 0.1 0.1"
              to="1 1 1"
            />
            <a-animation
              begin="cursor-fusing"
              easing="ease-in"
              attribute="scale"
              fill="backwards"
              from="1 1 1"
              to="0.1 0.1 0.1"
            />
          </Entity>
        </Entity>
      </Entity>
    );
  }
}

class GearVRCOntroller extends React.Component {
  render() {
    return (
        <Entity gearvr-controls={{hand:'right'}} daydream-controls>
          
        </Entity>
    
    );
  }
}

class Collider extends React.Component {
  render() {
    return <Entity id="player" collider-check />;
  }
}
