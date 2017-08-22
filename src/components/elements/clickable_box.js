import {Entity} from "aframe-react";
import * as React from "react";

export default class ClickableBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            c: props.color,
            p: props.position,
            hovered: false,
        };
    }

    stateUpdated = (evt) => {
        let stateName = evt.detail.state;
        let stateValue = evt.target.is(evt.detail.state);

        if (stateName === "hovered") {
            this.setState({
                state_hovered: stateValue,
            });
        }
    };

    scream = () => {
        console.log("lol!");
        this.setState({
            c: "yellow"
        });
    }

    render() {
        return (
            <Entity
                name="test"
                className="intersectable"
                mixin="cube"
                hoverable
                material={{color: this.state.state_hovered ? "white" : "yellow"}}
                position={this.state.p}
                events={{
                    click: this.scream,
                    stateadded: this.stateUpdated,
                    stateremoved: this.stateUpdated
                }}
            >
                {this.state.state_hovered ? <a-animation attribute="rotation"
                                                         dur="1000"
                                                         fill="forwards"
                                                         from="0 0 0"
                                                         to="0 360 0"
                                                         repeat="indefinite"/> : <div/>}
            </Entity>
        );
    }
}