import * as AFRAME from "aframe";
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
import "./components/properties/camera-height-vr-fix";

import "./components/extras/birds";
import "./components/redux/environment_state";
import "./components/redux/game_state";

import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

class SplashScene extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            aboutEnabled: false,
            howtoEnabled: false,
            loading: true,
            vrEnabled: false
        };

        let component = this;
        navigator.getVRDisplays()
            .then(function (displays) {
                if (displays.length > 0 && displays[0].isPresenting) {
                    if (displays[0].stageParameters === null) {
                        console.log('3dof');
                        component.enableVR(true);
                    } else {
                        console.log('6dof');
                        component.enableVR(true);
                    }
                } else {
                    component.enableVR(AFRAME.utils.device.isMobile());
                }
            })
            .catch(function () {
                component.enableVR(false);
            });

    }

    enableVR(enable) {
        this.setState({
            loading: false,
            vrEnabled: enable
        })
    }

    enableAbout(visible) {
        this.setState({
            aboutEnabled: visible
        })
    }

    enableHowto(visible) {
        this.setState({
            howtoEnabled: visible
        })
    }

    enterGame(vrMode) {
        this.props.callback(vrMode);
        document.querySelector("#backgroundSound").components["sound"].playSound();

        if (vrMode) {
            //Fixme Bug - Only working option to enter vr mode
            document.querySelector("#scene > div.a-enter-vr > button").click();
            // let scene = document.querySelector("a-scene");
            // if (scene.hasLoaded) {
            //     console.log("Entering vrMode");
            //     scene.enterVR(true);
            // } else {
            //     scene.addEventListener('loaded', function () {
            //         console.log("Entering vrMode callback");
            //         scene.enterVR(true);
            //     });
            // }
        }
    }

    render() {
        let loaderGroup =
            <div id="loader-group">
                <div id="loader">
                    <div className="cssload-thecube">
                        <div className="cssload-cube cssload-c1"/>
                        <div className="cssload-cube cssload-c2"/>
                        <div className="cssload-cube cssload-c4"/>
                        <div className="cssload-cube cssload-c3"/>
                    </div>
                </div>
                <div className="description">
                    Checking for VR devices...
                </div>
            </div>;
        let gameGroup;
        if (this.state.vrEnabled) {
            gameGroup =
                <div>
                    <div id="vr-group" className="center-content button">
                        <div
                            id="enter-vr"
                            className="white-box clickable"
                            onTouchTap={() => {
                                this.enterGame(true);
                            }}>
                            Enter VR
                        </div>
                    </div>
                    <div id="vr-group" className="center-content-text optional">
                        <div
                            id="peak-360"
                            className="enter-info clickable"
                            onTouchTap={() => {
                                this.enterGame(false);
                            }}>
                            or take a sneak peek<br/>in 360 mode
                        </div>
                    </div>
                </div>
        } else {
            gameGroup =
                <div>
                    <div id="no-vr-group" className="center-content">
                        <div
                            id="enter-360"
                            className="white-box clickable"
                            onTouchTap={() => {
                                this.enterGame(false);
                            }}>
                            Enter 360 mode
                        </div>

                    </div>
                    <div id="no-vr-group" className="center-content-text">
                        <div className="enter-info clickable" onTouchTap={
                            () => {
                                this.enableHowto(true);
                            }}>
                            or learn how to enter VR
                        </div>
                    </div>
                </div>
        }

        return (
            <div id="splash">
                <div id="polidea-info-container"
                     hidden={this.state.aboutEnabled}>
                    <div className="content">
                        <a href="https://vrar.polidea.com/" target="_blank">
                            <img src="static/img/logo_polidea.svg"/>
                        </a>
                    </div>
                </div>
                <div id="about-button"
                     className="about-button clickable"
                     hidden={this.state.aboutEnabled || this.state.howtoEnabled}
                     onTouchTap={
                         () => {
                             this.enableAbout(true);
                         }}>
                    <div className="image-container">
                        <img src="static/img/question.svg"/>
                    </div>
                </div>
                <div id="main-container" hidden={this.state.aboutEnabled || this.state.howtoEnabled}>
                    <div id="title-group">
                        <div className="title_bold">
                            Have fun
                        </div>
                        <div className="title_regular">
                            with
                        </div>
                        <div className="title_bold">
                            nature
                        </div>
                    </div>
                    <div id="enter-container" className="center-content">
                        {this.state.loading ? loaderGroup : gameGroup}
                    </div>
                </div>

                <div id="about" className="dialog" hidden={!this.state.aboutEnabled}>
                    <div
                        id="about-xbutton"
                        className="close xbutton clickable"
                        onTouchTap={() => {
                            this.enableAbout(false);
                        }}/>
                    <div className="content">
                        <h1 className="about-head unselectable">Having fun with nature</h1>
                        <div className="description">
                            <p>
                                We think that sometimes small things can make your day. Enter our VR experiment where
                                you can influence your surrounding—change sounds, weather conditions and even day into
                                night.
                                Select a disc from the menu on the left and put it on a proper stone symbol. This
                                experiment can be run on any mobile and desktop device.
                            </p>
                            <p>
                                Technologies used: AFrame, Three.js, React
                            </p>
                            <p>
                                Created by Polidea VR/AR Team. And if you want to play with it yourself, feel free to
                                check out the <a
                                href="https://github.com/PolideaPlayground/WebVRExperience"
                                target="_blank">source code</a> on our Github.
                            </p>
                        </div>
                    </div>
                </div>

                <div id="howto" className="dialog" hidden={!this.state.howtoEnabled}>
                    <div
                        id="about-xbutton"
                        className="close xbutton clickable"
                        onTouchTap={() => {
                            this.enableHowto(false);
                        }}/>
                    <div className="content">
                        <div className="description">
                            <p>
                                To check out this demo in VR open it on your mobile and use it with a Google Cardboard
                                or a similar headset, like Google Daydream or Samsung Gear VR.
                            </p>
                            <p>
                                If you want to learn more about WebVR compatibility go to <a
                                href="https://webvr.info/"
                                target="_blank">the official manual.</a>
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
                material={{
                    color: "#031128"
                }}
                vr-mode-ui="enabled: true"
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
            gameEnabled: false,
            vrMode: false
        }
    }

    enterGame(vrMode) {
        this.setState({
            gameEnabled: true,
            vrMode: vrMode
        })
    }

    render() {
        let splash;
        if (!this.state.gameEnabled) {
            splash = <SplashScene callback={this.enterGame.bind(this)}/>;
        }
        return <div>
            <VRScene/>
            {splash}
        </div>;
    }
}

ReactDOM.render(
    <MainScene/>
    , document.querySelector("#sceneContainer"));
