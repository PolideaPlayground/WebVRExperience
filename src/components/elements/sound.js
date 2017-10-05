import {Entity} from "aframe-react";
import React from "react";

export default class EnvironmentSounds extends React.Component {
    render() {
        return <Entity>

            <Entity
                id="envSound"
                poolSize={2}
                bind__sound="environment.sound"/>
            <Entity
                id="birdSound"
                poolSize={2}
                bind__sound="environment.birdSound"/>
            <Entity id="backgroundSound"
                    poolSize={2}
                    sound={{src: '#waterSound', loop: true, autoplay: false, volume: 1.8}}/>
        </Entity>
    }
}