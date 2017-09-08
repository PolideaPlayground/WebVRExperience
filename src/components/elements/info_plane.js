import {Entity} from "aframe-react";
import React from 'react';


export default class Info extends React.Component {
    render() {
        return <Entity {...this.props}
                       id="info"
                       shadow="receive: false; cast: true">
            <Instructions/>
            <About/>
        </Entity>
    }
}

class Instructions extends React.Component {
    render() {
        return <Entity
            geometry={{primitive: 'plane', width: 4, height: 2}}
            material={{color: 'brown', opacity: 0.8}}
            position={{x: 0, y: 1.5, z: 0}}
            text="width: 7; height: auto; align: center; color: #595959; value: INSTRUCTIONS"
        />
    }
}

class About extends React.Component {
    onPolideaClicked(evt) {
        let el = evt.target;
        let parent = el.parentEl;
        el.setAttribute('scale', {x: 0.7, y: 0.7, z: 0.7});
        el.setAttribute('position', {x: 0, y: 0.7, z: 0.1});
        parent.querySelector("#text").setAttribute("visible", true);
    }

    onXClicked(evt) {
        let el = evt.target;
        let parent = el.parentEl;

        parent.setAttribute("visible", false);
        parent.parentEl.querySelector("#polidea").setAttribute('scale', {x: 1, y: 1, z: 1});
        parent.parentEl.querySelector("#polidea").setAttribute('position', {x: 0, y: 0, z: 0.1})git
    }

    render() {
        return <Entity
            geometry={{primitive: 'plane', width: 4, height: 2}}
            material={{color: 'white', opacity: 0.8}}
            position={{x: 0, y: -2, z: 0}}
        >
            <Entity
                visible={true}
                id="polidea"
                className={"intersectable"}
                position={{x: 0, y: 0, z: 0.1}}
                geometry={{primitive: 'plane', width: 1.5, height: 0.6}}
                material={{src: "#polideaImage"}}

                events={{
                    click: (evt) => {
                        this.onPolideaClicked(evt)
                    }
                }}
            />
            <Entity
                id="text"
                visible={false}
                position={{x: 0, y: 0, z: 0.1}}
                scale={{x: 1, y: 1}}
            >
                <Entity
                    position={{x: 1.8, y: 1.2, z: 0}}
                    scale={{x: 1, y: 1}}
                    className={"intersectable x"}
                    geometry={{primitive: 'plane', width: 0.3, height: 0.3}}
                    material={{color: 'white', opacity: 0.8}}
                    text="align: center; width: 6; height: auto; color: #595959; value: X"
                    events={{
                        click: (evt) => {
                            this.onXClicked(evt)
                        }
                    }}
                />
                <Entity
                    position={{x: 0, y: 0.2, z: 0}}
                    text="align: center; width: 6; height: auto; color: #595959; value: Lorem ipsum"
                />
                <Entity
                    position={{x: 0, y: -0.5, z: 0}}
                    className={"intersectable link"}
                    text="align: center; width: 6; height: auto; color: #1da0db; value: www.polidea.com"
                />
            </Entity>

        </Entity>
    }
}