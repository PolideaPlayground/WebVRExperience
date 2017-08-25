import React from 'react';
import {Entity} from "aframe-react";

export default class Menu extends React.Component {
    render() {
        return (
            <Entity {...this.props}
                    className="fields">
                <Entity
                    geometry={{primitive: 'plane'}}
                    position={{x: menuWidth / 2, y: menuHeight / 2, z: 0}}
                    material={{color: '#99d9ff'}}

                />
            </Entity>
        )
    }
}

class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state_hovered: false,
        }
    }

    stateUpdated = (evt) => {
        let stateName = evt.detail.state;
        let stateValue = evt.target.is(evt.detail.state);

        if (stateName === "hovered") {
            console.log("hovered: " + stateValue)
            this.setState({
                state_hovered: stateValue,
            });
        }
    }

    //TODO animations not working, because React is substituting the child
    render() {
        return (
            <Entity {...this.props}
                    mixin='cube'
                    hoverable
                    geometry={{width: 1, height: 1, depth: this.state.state_hovered ? 0.1 : 0.4}}
                    material={{color: this.state.state_hovered ? "#555" : "#222"}}
                    className="field intersectable"
                    events={{
                        stateadded: this.stateUpdated,
                        stateremoved: this.stateUpdated
                    }}
            >
                {/*{this.state.state_hovered ?*/}
                {/*<a-animation*/}
                {/*attribute="scale"*/}
                {/*from="1.0 1.0 2.0"*/}
                {/*to="1.0 1.0 0.5"*/}
                {/*/> : <a-animation*/}
                {/*attribute="scale"*/}
                {/*from="1.0 1.0 0.5"*/}
                {/*to="1.0 1.0 2.0"*/}
                {/*/>*/}
                {/*}*/}
            </Entity>
        )
    }

}