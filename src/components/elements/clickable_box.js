import {Entity} from "aframe-react";
import * as React from "react";

export default class ClickableBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            c: props.color,
            p: props.position,
            state_hovered: false,
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
                {this.state.state_hovered ? <a-animation attribute="scale" repeat="indefinite" to="1.1 1.1 1.1" direction="alternateReverse" fill="both"></a-animation> : <div/>}
            </Entity>
        );
    }
}