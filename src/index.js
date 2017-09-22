import "aframe";
import "aframe-particle-system-component";

import "aframe-animation-component";
import "./utils/state_component";

import React from "react";
import ReactDOM from "react-dom";
import View from "./components/view";
import Assets from "./components/assets";
import Controlers from "./components/controlers";

import "./components/properties/trackpad_to_click";
import "./components/properties/stone_field";
import "./components/properties/hovered_menu_item";

import "./components/extras/birds";
import "./components/redux/environment_state";
import "./components/redux/game_state";

class SplashScene extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            aboutEnabled: false,
            loading: true,
            vrEnabled: false
        }

        //TODO check for VR mode from Aframe code
    }

    enableAbout(visible) {
        this.setState({
            aboutEnabled: visible
        })
    }

    render() {
        return (
            <div id="splash">
                <div id="polidea-info-container">
                    <div className="content">
                        <a href="https://vrar.polidea.com/" target="_blank">
                            <img src="static/img/logo_polidea.svg"/>
                        </a>
                    </div>
                </div>
                <div id="about-button" className="about-button" onClick={() => {
                    this.enableAbout(true);
                }}>
                    <div className="image-container">
                        ?
                    </div>
                </div>
                <div id="main-container" hidden={this.state.aboutEnabled}>
                    <div id="title-group">
                        <div className="title_bold">
                            Having fun
                        </div>
                        <div className="title_regular">
                            with
                        </div>
                        <div className="title_bold">
                            nature
                        </div>
                    </div>
                    <div id="enter-container" className="center-content">
                        <div id="loader">LOADING<img src="static/img/loader.gif"/></div>

                        {this.state.vrEnabled ?
                            (<div id="vr-group" className="center-content">
                                <div id="enter-vr" className="white-box">
                                    Enter VR
                                </div>
                                <div id="peak-360" className="enter-info">
                                    or take a sneak peek<br/>in 360 mode
                                </div>
                            </div>)
                            :
                            (<div id="no-vr-group" className="center-content">
                                <div id="enter-360" className="white-box">
                                    Enter 360 mode
                                </div>
                                <div className="enter-info">
                                    or learn how to enter VR
                                </div>
                            </div>)
                        }

                    </div>
                </div>
                <div id="about" className="dialog" hidden={!this.state.aboutEnabled}>
                    <div className="close xbutton" id="about-xbutton" onClick={() => {
                        this.enableAbout(false);
                    }}/>
                    <div className="content">
                        <h1 className="about-head unselectable">Having fun with nature</h1>
                        <div className="description">
                            <p>
                                Enter Virtual Reality experiment where you can play with nature. Put a disc on a
                                proper stone button. You can take the discs from flat interface on your
                                left-hand.
                                This experiment allows anyone to join in, no matter what device they're using.
                            </p>
                            <p>
                                Technologies used: AFrame, Three.js, React
                            </p>
                            <p>
                                Created by Polidea VR/AR Team. Check out other WebVR Experiments <a
                                href="https://webvrexperiments.com/" target="_blank">here</a> and check out the
                                open-source code on <a
                                href="https://github.com/PolideaPlayground/WebVRExperience"
                                target="_blank">GitHub</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class VRScene extends React.Component {
    render() {
        return (
            //TODO when turn on/off antialias and other effects
            <a-scene
                id="scene"
                // antialias="false"
                material={{
                    color: "#031128"
                }}
                bind__fog="environment.fog"
                bind__birds="environment.birds"
                shadow="type: basic"
                light="defaultLightsEnabled: false"
            >
                <Assets/>
                <Controlers/>
                <View/>
            </a-scene>
        );
    }
}

class MainScene extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameEnabled: false
        }
    }

    render() {
        return this.state.gameEnabled ? <VRScene/> : <SplashScene/>;
    }
}

ReactDOM.render(<MainScene/>, document.querySelector("#sceneContainer"));
