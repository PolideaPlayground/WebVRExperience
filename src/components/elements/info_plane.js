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
                    geometry={{primitive: 'plane', width: 2, height: 0.8}}
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
                    material={{color: 'white', opacity: 0.9}}
                    position={{x: 0, y: 0, z: 0.1}}
                    scale={{x: 1, y: 1}}
                >
                    <Entity
                        position={{x: 1.8, y: 2.2, z: 0}}
                        scale={{x: 1, y: 1}}
                        className={"intersectable"}
                        geometry={{primitive: 'plane', width: 0.3, height: 0.3}}
                        material={{color: 'white', opacity: 0.9}}
                        text="align: center; width: 6; height: auto; color: #595959; value: X"
                        events={{
                            click: (evt) => {
                                this.onXClicked();
                            }
                        }}
                    />
                    <Entity
                        position={{x: 0, y: 0.85, z: 0}}
                        text="align: center; width: 2.8; wrapCount: 20; height: auto; color: #595959; value: This demo was developed by VR team at Polidea. Special thanks goes to:\n-Katarzyna Kucharczyk\n-Przemysław Pomaski\n-Chris Wrobel"
                    />
                    <Entity
                        position={{x: 0, y: -0.5, z: 0}}
                        className={"intersectable link"}
                        text="align: center; width: 6; height: auto; color: #1da0db; value: www.polidea.com"
                    />
                </Entity>
            </Entity>
        );
    }
}