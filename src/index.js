import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import ComplexBox from "./components/complex_box";

class VRScene extends React.Component {
    render() {
        return (
            <Scene material={{color: 'black'}}>
                <Entity primitive='a-sky' color="#112211"/>

                <Entity particle-system={{preset: 'snow'}}/>
                <Entity light={{type: 'point'}}/>
                <Entity light={{type: 'ambient'}}/>
                <Entity text={{value: 'Hello, WebVR!'}}/>
                <Entity gearvr-controls daydream-controls>
                    <ComplexBox rotation="0 0 45"/>
                </Entity>
                <ComplexBox position="4 0 -4" rotation="0 0 180"/>

            </Scene>
        );
    }
}

ReactDOM.render(<VRScene/>, document.querySelector('#sceneContainer'));