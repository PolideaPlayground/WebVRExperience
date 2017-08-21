import React from "react";

export default class Assets extends React.Component {
  render() {
    return (
      <a-assets>
        <a-mixin id="cube" geometry="primitive: box" />
        <a-mixin id="cube-cursor-hovered" material="color: magenta" />
        <a-mixin id="red" material="color: red" />
        <a-mixin id="green" material="color: green" />
        <a-mixin id="blue" material="color: blue" />
        <a-mixin id="yellow" material="color: yellow" />
        <a-mixin id="sphere" geometry="primitive: sphere" />
      </a-assets>
    );
  }
}
