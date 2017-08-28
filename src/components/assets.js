import React from "react";
import propellerUrl from "./../assets/models/propeller.dae";
import windmillUrl from "./../assets/models/windmill.dae";
import neonPlaneUrl from "./../assets/models/neon_plane.ply";
import neonOutlineUrl from "./../assets/models/neon_outline.ply";
import neonTextUrl from "./../assets/models/neon_text.ply";
import wireForkUrl from "./../assets/models/wire_fork.ply";
import wireHorizontalUrl from "./../assets/models/wire_horizontal.ply";
import wireTurnUrl from "./../assets/models/wire_turn.ply";
import wireVerticalUrl from "./../assets/models/wire_vertical.ply";


export default class Assets extends React.Component {
    render() {
        return (
            <a-assets>
                <a-asset-item id="neonPlane" src={neonPlaneUrl}/>
                <a-asset-item id="neonOutline" src={neonOutlineUrl}/>
                <a-asset-item id="neonText" src={neonTextUrl}/>
                <a-asset-item id="wireFork" src={wireForkUrl}/>
                <a-asset-item id="wireHorizontal" src={wireHorizontalUrl}/>
                <a-asset-item id="wireTurn"  src={wireTurnUrl}/>
                <a-asset-item id="wireVertical" src={wireVerticalUrl}/>

                {/*3D models */}
                <a-asset-item id="propeller" src={propellerUrl}/>
                <a-asset-item id="windmill" src={windmillUrl}/>
            </a-assets>
        );
    }
}
