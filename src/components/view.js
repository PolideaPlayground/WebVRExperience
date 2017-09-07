import {Entity} from "aframe-react";
import React from "react";

import Playground from "./playground";
import Windmill from "./elements/windmill";
import Rocks from "./elements/rocks";
import Sound from "./elements/sound";
import Background from "./elements/background";
import Sky from "./elements/sky";
import Button from "./elements/button";

export default class View extends React.Component {
    render() {
        return (
            <Entity>
                <Sky id={"Sky"} ref={"Sky"} color="#4e4b55"/>

                <Entity
                    light={{
                        type: "directional",
                        intensity: 1.4,
                        castShadow: true,
                        shadowCameraTop: 35,
                        shadowCameraRight: 35,
                        shadowCameraBotton: -35,
                        shadowCameraLeft: -35,
                        shadowMapWidth: 1024,
                        shadowMapHeight: 1024,
                    }}
                    position={{x: 0, y: 40, z: 50}}

                />
                <Entity
                    light={{
                        type: "ambient",
                        intensity: 0.5
                    }}
                />



                <Sound id="NightSound" sound={{src:"#nightSound", autoplay:"true"}}/>
                <Sound id="NightSound" sound="src: #nightSound; autoplay: false"/>
                <Sound id="BirdSound" sound="src: #birdSound; autoplay: false"/>
                <Windmill
                    className="intersectable"
                    position={{x: -15, y: -4, z: -15}}
                    scale={{x: 4, y: 4, z: 4}}
                    rotation={{x: 0, y: 40, z: 0}}
                    shadow="cast: true; receive: false"/>

                <Button id={"fogOn"} position="-1 1 -2" className="intersectable" color={"blue"} reqState={'fog_on'}/>
                <Button id={"fogOff"} position="0 1 -2" className="intersectable" color={"green"} reqState={'fog_off'}/>
                <Button id={"nightOn"} position="1 1 -2" className="intersectable" color={"yellow"} reqState={'night_on'}/>
                <Button id={"nightOff"} position="2 1 -2" className="intersectable" color={"pink"} reqState={'night_off'}/>

                <Playground dim={3}
                            position={{x: 0, y: 1, z: -4}}
                            rotation={{x: 27.5, y: 0, z: 0}}
                            shadow="cast: true"
                />

                <Rocks id='menu'
                       position={{x: 3.5, y: 4, z: -4.5}}
                       rotation={{x: -0, y: -30, z: 0}}
                />

                <Background/>

            </Entity>
        );
    }
}


