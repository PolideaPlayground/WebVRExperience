import * as AFRAME from "aframe";

AFRAME.registerComponent('hovered_menu_item', {
    schema: {
        position_down: {default: {x: 0, y: 0, z: 0}},
        position_up: {default: {x: 0, y: 0, z: 0.1}},
        color_down: {default: "#b4d1ff"},
        color_up: {default: "#FFFFFF"},
    },
    init: function () {
        let el = this.el;

        this.el.addEventListener('raycaster-intersected', function () {
            el.emit("run_down");
        });
        this.el.addEventListener('raycaster-intersected-cleared', function () {
            el.emit("run_up");
        });

        el.setAttribute("animation__position_down", {
            property: "position",
            dur: 400,
            easing: "easeInSine",
            to: this.data.position_down,
            startEvents: "run_down",
            restartEvents: "run_down",
            pauseEvents: "run_up"
        });

        el.setAttribute("animation__position_up", {
            property: "position",
            dur: 400,
            easing: "easeInSine",
            to: this.data.position_up,
            startEvents: "run_up",
            restartEvents: "run_up",
            pauseEvents: "run_down"
        });
    },
    play: function () {
        let el = this.el;

        // FIXME Bug color animation only works when binded on play
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