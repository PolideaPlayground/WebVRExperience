import {Entity} from "aframe-react";
import React from 'react';

export default class Instructions extends React.Component {
    render() {
        return <Entity
            {...this.props}
            geometry={{primitive: 'plane', width: 1.0, height: 0.4}}
            material={{color: 'black', opacity: 0.4}}
            text={{
                width: 0.8,
                height: "auto",
                wrapCount: 24,
                lineHeight: 60,
                align: "center",
                color: "white",
                value: "Select symbols from the menu on the left and place them on the matching stones"
            }}
        />
    }
}