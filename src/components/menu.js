import React from 'react';
import {Entity} from "aframe-react";

export default class Menu extends React.Component {
    render() {
        return (
            <Entity {...this.props}
                    className="menu">
                <Entity
                    geometry={{primitive: 'plane', width: 4, height: 4}}
                    material={{color: '#bfd7ff'}}
                >

                </Entity>
            </Entity>
        )
    }
}

class Item extends React.Component {
    render() {
        return (
            <Entity {...this.props}
                    mixin='cube'
                    hoverable
                    hovered_menu_item
                    geometry={{width: 0.8, height: 0.8, depth: 0.4}}
                    material={{color: "#7207ff"}}
                    className="item intersectable"
            />

        )
    }
}