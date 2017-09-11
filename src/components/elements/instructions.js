import {Entity} from "aframe-react";
import React from 'react';

export default class Instructions extends React.Component {
    render() {
        return <Entity {...this.props}
            geometry={{primitive: 'plane', width: 2.0, height: 0.8}}
            material={{color: 'black', opacity: 0.8}}
            text="width: 1.8; height: auto; wrapCount:28; align: center; color: white; value: Choose stones from menu and place them on matching symbols to turn on different environmental effects"
        />
    }
}