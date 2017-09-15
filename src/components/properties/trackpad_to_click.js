import * as AFRAME from "aframe";

AFRAME.registerComponent('trackpad-to-click', {
    init: function () {
        var self = this;
        this.onButtonDown = function (evt) {
            let raycasterEl = self.el.querySelector('[raycaster]');
            let elements = raycasterEl.components.raycaster.intersectedEls;
            for (let i = 0; elements.length; i++) {
                let element = elements[i];
                element.emit("click");
                return;
            }
        };
    },

    addEventListeners: function () {
        var el = this.el;
        el.addEventListener('trackpaddown', this.onButtonDown);
        el.addEventListener('triggerdown', this.onButtonDown);
    },

    removeEventListeners: function () {
        var el = this.el;
        el.removeEventListener('trackpaddown', this.onButtonDown);
        el.removeEventListener('triggerdown', this.onButtonDown);
    },

    play: function () {
        this.addEventListeners();
    },

    pause: function () {
        this.removeEventListeners();
    },
});
