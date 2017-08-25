
// Registering component in hoverable-component.js
import * as AFRAME from "aframe";
export const HOVERED_STATE = 'hovered';

AFRAME.registerComponent('hoverable', {
    schema: {},
    init: function () {
        var el = this.el;

        this.el.addEventListener('raycaster-intersected', function () {
            el.addState(HOVERED_STATE);
        });
        this.el.addEventListener('raycaster-intersected-cleared', function () {
            el.removeState(HOVERED_STATE);
        });
    },
});