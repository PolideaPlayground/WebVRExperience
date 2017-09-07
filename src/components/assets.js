import React from "react";
import propellerUrl from "./../assets/models/propeller.dae";
import windmillUrl from "./../assets/models/windmill.dae";
import environmentUrl from "./../assets/models/environment.dae";
import blockUrl from "./../assets/models/block.dae";
import rockButtonUrl from "./../assets/models/rock_button.dae";
import rockDiskUrl from "./../assets/models/rock_disk.dae";
import rockDesktopUrl from "./../assets/models/rock_desktop.dae";
import rockSoundUrl from "./../assets/sounds/rock_scraping.mp3";
import nightSoundUrl from "./../assets/sounds/Jungle_Atmosphere_Late_Night.mp3";
import birdSoundUrl from "./../assets/sounds/Chirping-birds.mp3";
import sunImageUrl from "./../assets/textures/sun.png";
import birdsImageUrl from "./../assets/textures/birds.png";
import fenceImageUrl from "./../assets/textures/fence.png";
import mistImageUrl from "./../assets/textures/mist.png";
import sticksImageUrl from "./../assets/textures/sticks.png";
import eyeImageUrl from "./../assets/textures/eye.png";

export default class Assets extends React.Component {
    render() {
        return (
            <a-assets>
                {/*3D models */}
                <a-asset-item id="environment" src={environmentUrl}/>
                <a-asset-item id="block" src={blockUrl}/>

                <a-asset-item id="rockButton" src={rockButtonUrl}/>
                <a-asset-item id="rockDesktop" src={rockDesktopUrl}/>
                <a-asset-item id="rockDisk" src={rockDiskUrl}/>

                <a-asset-item id="propeller" src={propellerUrl}/>
                <a-asset-item id="windmill" src={windmillUrl}/>

                {/* sounds */}
                <audio id="rockSound" src={rockSoundUrl}/>
                <audio id="nightSound" src={nightSoundUrl}/>
                <audio id="birdSound" src={birdSoundUrl}/>

                {/* textures */}
                <img id="birdsTexture" src={birdsImageUrl}/>
                <img id="sunTexture" src={sunImageUrl}/>
                <img id="fenceTexture" src={fenceImageUrl}/>
                <img id="sticksTexture" src={sticksImageUrl}/>
                <img id="fogTexture" src={mistImageUrl}/>
                <img id="eyeTexture" src={eyeImageUrl}/>
            </a-assets>
        );
    }
}
