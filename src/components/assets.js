import React from "react";
import propellerUrl from "./../assets/models/propeller.dae";
import windmillUrl from "./../assets/models/windmill.dae";
import mushroomUrl from "./../assets/models/mushroom.dae";
import environmentUrl from "../assets/models/environment.dae";
import blockUrl from "./../assets/models/block.dae";
import rockButtonUrl from "./../assets/models/rock_button.dae";
import rockDiskUrl from "./../assets/models/rock_disk.dae";
import rockDesktopUrl from "./../assets/models/rock_desktop.dae";

import rockSoundUrl from "./../assets/sounds/rock_scraping.mp3";
import failSoundUrl from "./../assets/sounds/stone_fail_01.mp3";
import hoverSoundUrl from "./../assets/sounds/stone_hover.m4a";
import nightSoundUrl from "./../assets/sounds/night_looped.mp3";
import birdSoundUrl from "./../assets/sounds/birds_looped.mp3";
import waterSoundUrl from "./../assets/sounds/water_looped.mp3";

import sunImageUrl from "./../assets/textures/sun.png";
import birdsImageUrl from "./../assets/textures/birds.png";
import mushroomImageUrl from "./../assets/textures/mushroom.png";
import mistImageUrl from "./../assets/textures/mist.png";
import polideaImageUrl from "./../assets/images/logo_Polidea.png";
import closeImageUrl from "./../assets/images/close.png";

import menuBinImageUrl from "./../assets/textures/m_bin.png";
import menuSunImageUrl from "./../assets/textures/m_sun.png";
import menuMushroomImageUrl from "./../assets/textures/m_mashroom.png";
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

                <a-asset-item id="mushroom" src={mushroomUrl}/>

                {/* sounds */}
                <audio id="rockSound" src={rockSoundUrl}/>
                <audio id="hoverSound" src={hoverSoundUrl}/>
                <audio id="failSound" src={failSoundUrl}/>
                <audio id="nightSound" src={nightSoundUrl}/>
                <audio id="waterSound" src={waterSoundUrl}/>
                <audio id="birdSound" src={birdSoundUrl}/>

                {/* textures */}
                <img id="birdsTexture" alt="birdsTexture" src={birdsImageUrl}/>
                <img id="sunTexture" alt="sunTexture" src={sunImageUrl}/>
                <img id="mushroomTexture" alt="mushroomTexture" src={mushroomImageUrl}/>
                <img id="fogTexture" alt="fogTexture" src={mistImageUrl}/>

                <img id="menuBinTexture" alt="binTexture" src={menuBinImageUrl}/>
                <img id="menuSunTexture" alt="menuSunTexture" src={menuSunImageUrl}/>
                <img id="menuMushroomTexture" alt="menuMushroomTexture" src={menuMushroomImageUrl}/>
                <img id="menuBirdsTexture" alt="menuBirdsTexture" src={menuBirdsImageUrl}/>
                <img id="menuFogTexture" alt="menuFogTexture" src={menuFogImageUrl}/>

                {/*images*/}
                <img id="polideaImage" alt="polideaImage" src={polideaImageUrl}/>
                <img id="closeImage" alt="closeImage" src={closeImageUrl}/>

            </a-assets>
        );
    }
}
