import {Entity} from "aframe-react";
import React from "react";
import ClickableBox from "./elements/clickable_box";

export default class Boxes extends React.Component {
    render() {
        return (
            <Entity>
                <ClickableBox color="green" position="2 4 -4"
                              className="intersectable"
                />
                <ClickableBox color="blue" position="0 2 -4" id="test"/>

                <ClickableBox position="-2 2 -4" color="violet"/>
                <a-entity position="-2 4 -4">
                    <a-entity mixin="cube red" class="intersectable">
                        <a-animation
                            begin="click"
                            attribute="position"
                            from="0 0 0"
                            to="0 0 -10"
                            dur="2000"
                            fill="both"
                        />
                    </a-entity>
                </a-entity>
            </Entity>
        );
    }
}
