import {Entity} from "aframe-react";
import "aframe-gradient-sky";
import React from "react";

export default class Sky extends React.Component {
    render() {
        return <Entity>
            <Entity {...this.props}
                    primitive="a-gradient-sky"
                    bind__material="environment.skyMaterial"
                    bind__visibile="visible: environment.skyGradient"
            />
            <Entity primitive="a-sky"
                    color="#000000"
                    bind__visibile="visible: environment.fogState"
            />
        </Entity>

    }
}
