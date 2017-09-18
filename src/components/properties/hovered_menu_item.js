import * as AFRAME from "aframe";
import {HOVERED_STATE} from "./hoverable";

AFRAME.registerComponent('hovered_menu_item', {
    schema: {
        position_down: {default: {x: 0, y: 0, z: 0}},
        position_up: {default: {x: 0, y: 0, z: 0.1}},
        color_down: {default: "#d3e4ff"},
        color_up: {default: "#FFFFFF"},
    },
    init: function () {
        let el = this.el;
        el.setAttribute("animation__position_down", {
            property: "position",
            dur: 400,
            easing: "easeInSine",
            to: this.data.position_down,
            startEvents: "run_down",
            restartEvents: "run_down"
        });

        el.setAttribute("animation__position_up", {
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
    },
    play: function () {
        let el = this.el;
        el.setAttribute("animation__color_down", {
            property: "material.color",
            dur: 400,
            easing: "easeInSine",
            from: this.data.color_up,
            to: this.data.color_down,
            startEvents: "run_down",
            restartEvents: "run_down"
        });

        el.setAttribute("animation__color_up", {
            property: "material.color",
            dur: 400,
            easing: "easeInSine",
            from: this.data.color_down,
            to: this.data.color_up,
            startEvents: "run_up",
            restartEvents: "run_up"
        });
    }
})