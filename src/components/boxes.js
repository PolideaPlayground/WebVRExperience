import {Entity} from "aframe-react";
import React from "react";
import ClickableBox from "./elements/clickable_box";

export default class Boxes extends React.Component {
  render() {
    return (
      <Entity>
        <ClickableBox color="green" position="2 4 -4" />
      </Entity>
    );
  }
}
