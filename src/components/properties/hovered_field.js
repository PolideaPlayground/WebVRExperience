import * as AFRAME from "aframe";
import {HOVERED_STATE} from "./hoverable";

AFRAME.registerComponent('hovered_field', {
    schema: {
        position_down: {default: {x: 1, y: 1, z: -0.25}},
        position_up: {default: {x: 1, y: 1, z: 0.0}}
    },
    init: function () {
        let el = this.el;

        el.setAttribute("animation__scale_down", {
            property: "position",
            dur: 400,
            easing: "easeInSine",
            to: this.data.position_down,
            startEvents: "run_down",
            restartEvents: "run_down"
        });

        el.setAttribute("animation__scale_up", {
            property: "position",
            dur: 400,
            easing: "easeInSine",
            to: this.data.position_up,
            startEvents: "run_up",
            restartEvents: "run_up"
        });


        this.el.addEventListener('stateadded', function (evt) {
            let stateName = evt.detail.state;
            let el = evt.target;

            if (stateName === HOVERED_STATE) {
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
});