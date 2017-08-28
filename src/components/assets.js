import React from "react";
import propellerUrl from "./../assets/models/propeller.dae";
import windmillUrl from "./../assets/models/windmill.dae";
import mtl from "./../assets/models/neon_plane.mtl";
import obj from "./../assets/models/neon_plane.obj";
import ply from "./../assets/models/neon_plane.ply";


export default class Assets extends React.Component {
    render() {
        return (
            <a-assets>
                <a-asset-item id="neon-obj" src={obj}></a-asset-item>
                <a-asset-item id="neon-mtl" src={mtl}></a-asset-item>
                <a-asset-item id="neon-ply" src={ply}></a-asset-item>

                {/*3D models */}
                <a-asset-item id="propeller" src={propellerUrl}/>
                <a-asset-item id="windmill" src={windmillUrl}/>
            </a-assets>
        );
    }
}
