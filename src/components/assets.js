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
import polideaImageUrl from "./../assets/images/logo_Polidea.png";

import menuBinImageUrl from "./../assets/textures/m_bin.png";
import menuSunImageUrl from "./../assets/textures/m_sun.png";
import menuFenceImageUrl from "./../assets/textures/m_crossout.png";
import menuBirdsImageUrl from "./../assets/textures/m_birds.png";
import menuFogImageUrl from "./../assets/textures/m_mist.png";

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
                <img id="birdsTexture" alt="birdsTexture" src={birdsImageUrl}/>
                <img id="sunTexture" alt="sunTexture" src={sunImageUrl}/>
                <img id="fenceTexture" alt="fenceTexture" src={fenceImageUrl}/>
                <img id="sticksTexture" alt="sticksTexture" src={sticksImageUrl}/>
                <img id="fogTexture" alt="fogTexture" src={mistImageUrl}/>
                <img id="eyeTexture" alt="eyeTexture" src={eyeImageUrl}/>

                <img id="menuBinTexture" alt="binTexture" src={menuBinImageUrl}/>
                <img id="menuSunTexture" alt="menuSunTexture" src={menuSunImageUrl}/>
                <img id="menuFenceTexture" alt="menuFenceTexture" src={menuFenceImageUrl}/>
                <img id="menuBirdsTexture" alt="menuBirdsTexture" src={menuBirdsImageUrl}/>
                <img id="menuFogTexture" alt="menuFogTexture" src={menuFogImageUrl}/>

                {/*images*/}
                <img id="polideaImage" alt="polideaImage" src={polideaImageUrl}/>

            </a-assets>
        );
    }
}
