import React from "react";
import propellerUrl from "./../assets/models/propeller.dae";
import windmillUrl from "./../assets/models/windmill.dae";
import wireForkUrl from "./../assets/models/wire_fork.dae";
import wireHorizontalUrl from "./../assets/models/wire_horizontal.dae";
import wireTurnUrl from "./../assets/models/wire_turn.dae";
import wireVerticalUrl from "./../assets/models/wire_vertical.dae";
import environmentUrl from "./../assets/models/environment.dae";
import blockUrl from "./../assets/models/block.dae";
import rockSoundUrl from "./../assets/sounds/rock_scraping.mp3";
import nightSoundUrl from "./../assets/sounds/Jungle_Atmosphere_Late_Night.mp3";
import birdSoundUrl from "./../assets/sounds/Chirping-birds.mp3";

export default class Assets extends React.Component {
    render() {
        return (
            <a-assets>
                {/*3D models */}
                <a-asset-item id="wireFork" src={wireForkUrl}/>
                <a-asset-item id="wireHorizontal" src={wireHorizontalUrl}/>
                <a-asset-item id="wireTurn" src={wireTurnUrl}/>
                <a-asset-item id="wireVertical" src={wireVerticalUrl}/>
                <a-asset-item id="environment" src={environmentUrl}/>
                <a-asset-item id="block" src={blockUrl}/>

                <a-asset-item id="propeller" src={propellerUrl}/>
                <a-asset-item id="windmill" src={windmillUrl}/>

                <audio id="rockSound" src={rockSoundUrl}/>
                <audio id="nightSound" src={nightSoundUrl}/>
                <audio id="birdSound" src={birdSoundUrl}/>
            </a-assets>
        );
    }
}
