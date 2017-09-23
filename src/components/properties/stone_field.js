import * as AFRAME from "aframe";

export const HOVERED_STATE = 'hovered';
export const SELECTED_STATE = 'placed';

AFRAME.registerComponent('stone_field', {
    schema: {
        position_down: {default: {x: 1, y: 1, z: -0.25}},
        position_hovered: {default: {x: 1, y: 1, z: -0.25}},
        position_up: {default: {x: 1, y: 1, z: 0.0}}
    },
    init: function () {
        let el = this.el;
        this.el.addEventListener('raycaster-intersected', function (evt) {
            if(!el.is(HOVERED_STATE)){
                el.addState(HOVERED_STATE);
            }
        });
        this.el.addEventListener('raycaster-intersected-cleared', function (evt) {
            if(el.is(HOVERED_STATE)) {
                el.removeState(HOVERED_STATE);
            }
        });

        this.el.addEventListener('stateadded', function (evt) {
            let stateName = evt.detail.state;

            if(stateName === SELECTED_STATE || stateName === HOVERED_STATE){
                if (el.is(SELECTED_STATE)) {
                    el.emit("run_down");
                } else if (el.is(HOVERED_STATE)) {
                    el.emit("run_hovered");
                }
            }
        });
        this.el.addEventListener('stateremoved', function (evt) {
            let stateName = evt.detail.state;

            if(stateName === SELECTED_STATE || stateName === HOVERED_STATE) {
                if (!el.is(SELECTED_STATE)) {
                    if (el.is(HOVERED_STATE)) {
                        el.emit("run_hovered");
                    } else {
                        el.emit("run_up");
                    }
                } else {
                    el.emit("run_down")
                }
            }
        });

        this.el.setAttribute("animation__position_down", {
            property: "position",
            dur: 400,
            easing: "easeInSine",
            to: this.data.position_down,
            startEvents: "run_down",
            restartEvents: "run_down",
            pauseEvents: "run_up, run_hovered"
        });

        this.el.setAttribute("animation__position_hovered", {
            property: "position",
            dur: 400,
            easing: "easeInSine",
            to: this.data.position_hovered,
            startEvents: "run_hovered",
            restartEvents: "run_hovered",
            pauseEvents: "run_down, run_up"
        });

        this.el.setAttribute("animation__position_up", {
            property: "position",
            dur: 400,
            easing: "easeInSine",
            to: this.data.position_up,
            startEvents: "run_up",
            restartEvents: "run_up",
            pauseEvents: "run_down, run_hovered"
        });

    }
});