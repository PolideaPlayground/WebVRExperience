import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

class VRScene extends React.Component {
  render () {
    return (
      <Scene material={{color: 'black'}}>
        <Entity primitive='a-sky' color="black"/>
        <Entity geometry={{primitive: 'box'}} material={{color: 'red'}} position={{x: 0, y: 0, z: -5}}/>
        <Entity particle-system={{preset: 'snow'}}/>
        <Entity light={{type: 'point'}}/>
        <Entity text={{value: 'Hello, WebVR!'}}/>
      </Scene>
    );
  }
}

ReactDOM.render(<VRScene/>, document.querySelector('#sceneContainer'));