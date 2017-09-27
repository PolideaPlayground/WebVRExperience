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

import "./components/extras/birds";
import "./components/redux/environment_state";
import "./components/redux/game_state";

import {Loader} from 'react-loaders';

import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

class SplashScene extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            aboutEnabled: false,
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

    enterGame(vrMode) {
        this.props.callback(vrMode);

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
                    <Loader type="square-spin"/>
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
                    <div id="vr-group" className="center-content optional">
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
                <div id="no-vr-group" className="center-content">
                    <div
                        id="enter-360"
                        className="white-box clickable"
                        onTouchTap={() => {
                            this.enterGame(false);
                        }}>
                        Enter 360 mode
                    </div>
                    <div className="enter-info clickable">
                        or learn how to enter VR
                    </div>
                </div>
        }

        return (
            <div id="splash">
                {/*<a className="github-fork-ribbon right-bottom fixed"*/}
                {/*href="https://github.com/PolideaPlayground/WebVRExperience" title="Fork me on GitHub">Fork me on*/}
                {/*GitHub</a>*/}
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
                     hidden={this.state.aboutEnabled}
                     onTouchTap={
                         () => {
                             this.enableAbout(true);
                         }}>
                    <div className="image-container">
                        <img src="static/img/question.svg"/>
                    </div>
                </div>
                <div id="main-container" hidden={this.state.aboutEnabled}>
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

                </div>
                <div id="enter-container" className="center-content">
                    {this.state.loading ? loaderGroup : gameGroup}
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
