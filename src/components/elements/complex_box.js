import {Entity} from 'aframe-react';
import React from 'react';

class ComplexBox extends React.Component {
    render() {
        return (
            <Entity {...this.props}>
                <Entity geometry={{primitive: 'box', height: '0.1', width: '0.5', depth: '4.5'}}
                        mixin="cube"
                        material={{color: 'red'}}
                        position={{x: 0, y: 0.5, z: -5}}
                        rotation="45 0 0"/>
                <Entity geometry={{primitive: 'box'}} material={{color: 'green'}} position={{x: 0, y: 0, z: -3}}/>
            </Entity>
        )

    }
}

export default ComplexBox;