import * as AFRAME from "aframe";
import {HOVERED_STATE} from "./hoverable";

AFRAME.registerComponent('hovered_menu_item', {
    schema: {
        color_down: {default: '#555'},
        color_up: {default: '#222'},
        scale_down: {default: {x: 1, y: 1, z: 1}},
        scale_up: {default: {x: 1.1, y: 1.1, z: 1.1}}
    },
    init: function () {
        let el = this.el;
        el.setAttribute("animation__scale_down", {
            property: "scale",
            dur: 400,
            easing: "easeInSine",
            to: this.data.scale_down,
            startEvents: "run_down",
            restartEvents: "run_down"
        });

        el.setAttribute("animation__scale_up", {
            property: "scale",
            dur: 400,
            easing: "easeInSine",
            to: this.data.scale_up,
            startEvents: "run_up",
            restartEvents: "run_up"
        });


        this.el.addEventListener('stateadded', function (evt) {
            let stateName = evt.detail.state;
            let el = evt.target;

            if (stateName === HOVERED_STATE) {
                console.log("Set attribute");
                el.emit("run_down");
            }
        });
        this.el.addEventListener('stateremoved', function (evt) {
            let stateName = evt.detail.state;
            let element = evt.target;

            if (stateName === HOVERED_STATE) {
                element.emit("run_up");
            }
        });
    }
})