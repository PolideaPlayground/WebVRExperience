import React from "react";
import propellerUrl from "./../assets/models/propeller.dae";
import windmillUrl from "./../assets/models/windmill.dae";
import neonPlaneUrl from "./../assets/models/neon_plane.dae";
import neonOutlineUrl from "./../assets/models/neon_outline.dae";
import neonTextUrl from "./../assets/models/neon_text.dae";
import wireForkUrl from "./../assets/models/wire_fork.dae";
import wireHorizontalUrl from "./../assets/models/wire_horizontal.dae";
import wireTurnUrl from "./../assets/models/wire_turn.dae";
import wireVerticalUrl from "./../assets/models/wire_vertical.dae";
import environmentUrl from "./../assets/models/environment.dae";

export default class Assets extends React.Component {
    render() {
        return (
            <a-assets>
                {/*3D models */}
                <a-asset-item id="neonPlane" src={neonPlaneUrl}/>
                <a-asset-item id="neonOutline" src={neonOutlineUrl}/>
                <a-asset-item id="neonText" src={neonTextUrl}/>
                <a-asset-item id="wireFork" src={wireForkUrl}/>
                <a-asset-item id="wireHorizontal" src={wireHorizontalUrl}/>
                <a-asset-item id="wireTurn" src={wireTurnUrl}/>
                <a-asset-item id="wireVertical" src={wireVerticalUrl}/>
                <a-asset-item id="environment" src={environmentUrl}/>

                <a-asset-item id="propeller" src={propellerUrl}/>
                <a-asset-item id="windmill" src={windmillUrl}/>

                <audio id="sound" src="./../assets/sounds/down.mp3"/>
                <audio id="sound2" src="./../assets/sounds/down-2.wav"/>
            </a-assets>
        );
    }
}
