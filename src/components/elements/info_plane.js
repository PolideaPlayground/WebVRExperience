import {Entity} from "aframe-react";
import React from 'react';


export default class Info extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonVisible: true,
            infoVisible: false
        }
    }

    onPolideaClicked() {
        this.setState({
            buttonVisible: false,
            infoVisible: true
        });
    }

    onXClicked() {
        this.setState({
            buttonVisible: true,
            infoVisible: false
        });
    }

    render() {
        return (
            <Entity {...this.props}
                    id="info"
                    shadow="receive: false; cast: true">
                <Entity
                    visible={this.state.buttonVisible}
                    id="polidea"
                    className={"intersectable"}
                    position={{x: 0, y: 0, z: 0.1}}
                    geometry={{primitive: 'plane', width: 1.1, height: 0.45}}
                    material={{src: "#polideaImage"}}
                    events={{
                        click: (evt) => {
                            this.onPolideaClicked();
                        }
                    }}
                />
                <Entity
                    id="text"
                    visible={this.state.infoVisible}
                    geometry={{primitive: 'plane', width: 3, height: 4}}
                    material={{color: 'white', opacity: 1.0}}
                    position={{x: 0, y: 0, z: 0.1}}
                    scale={{x: 1, y: 1}}
                >
                    <Entity
                        position={{x: 1.35, y: 2.2, z: 0}}
                        scale={{x: 1, y: 1}}
                        className={"intersectable"}
                        geometry={{primitive: 'plane', width: 0.3, height: 0.3}}
                        material={{color: 'white', opacity: 1.0}}
                        text="align: center; width: 6; height: auto; color: #595959; value: X"
                        events={{
                            click: (evt) => {
                                this.onXClicked();
                            }
                        }}
                    />
                    <Entity
                        position={{x: 0, y: 0.85, z: 0.05}}
                        text="align: center; width: 2.8; wrapCount: 20; height: auto; color: #595959; value: This WebVR demo was designed and developed by VR team at Polidea. Credits go to:\n-Katarzyna Kucharczyk\n-Przemyslaw Pomaski\n-Chris Wrobel"
                    />
                    <Entity
                        position={{x: 0, y: -0.5, z: 0.05}}
                        className={"intersectable link"}
                        text="align: center; width: 6; height: auto; color: #1da0db; value: www.polidea.com"
                    />
                </Entity>
            </Entity>
        );
    }
}