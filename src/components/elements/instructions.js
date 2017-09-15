import {Entity} from "aframe-react";
import React from 'react';

export default class Instructions extends React.Component {
    render() {
        return <Entity {...this.props}
            geometry={{primitive: 'plane', width: 1.2, height: 0.5}}
            material={{color: 'black', opacity: 0.8}}
            text="width: 1.0; height: auto; wrapCount:24; align: center; color: white; value: Select symbols from the menu on the left and place them on a matching stones"
        />
    }
}