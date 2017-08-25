import React from "react";
import propellerUrl from "./../assets/models/propeller.dae";
import windmillUrl from "./../assets/models/windmill.dae";
import model from "./../assets/models/unityexport.obj";
import mtl from "./../assets/models/neon_plane.mtl";
import obj from "./../assets/models/neon_plane.obj";
import ply from "./../assets/models/neon_plane.ply";


export default class Assets extends React.Component {
    render() {
        return (
            <a-assets>

                <a-asset-item id="object" src={model}></a-asset-item>
                <a-asset-item id="obj-plane" src={obj}></a-asset-item>
                <a-asset-item id="mtl-plane" src={mtl}></a-asset-item>
                <a-asset-item id="ply-plane" src={ply}></a-asset-item>
                <a-asset-item id="t-rex" src="./../assets/models/T-Rex.bake.ply" ></a-asset-item>

                {/*3D models */}
                <a-asset-item id="propeller" src={propellerUrl}/>
                <a-asset-item id="windmill" src={windmillUrl}/>
            </a-assets>
        );
    }
}
