import React from "react";
import propellerUrl from "./../assets/models/propeller.dae";
import windmillUrl from "./../assets/models/windmill.dae";

export default class Assets extends React.Component {
    render() {
        return (
            <a-assets>
                <a-mixin id="cube" geometry="primitive: box"/>
                <a-mixin id="red" material="color: red"/>
                <a-mixin id="green" material="color: green"/>
                <a-mixin id="blue" material="color: blue"/>
                <a-mixin id="yellow" material="color: yellow"/>
                <a-mixin id="sphere" geometry="primitive: sphere"/>

                {/*3D models */}
                <a-asset-item id="propeller" src={propellerUrl}/>
                <a-asset-item id="windmill" src={windmillUrl}/>
            </a-assets>
        );
    }
}
