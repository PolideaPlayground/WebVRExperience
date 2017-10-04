import * as AFRAME from "aframe";

AFRAME.registerComponent('camera-height-vr-fix', {
    init: function () {
        var self = this;

        self.el.sceneEl.addEventListener('enter-vr', (evt) => {
            console.log("Entering VR");
            if (AFRAME.utils.isMobile()) {
                console.log("Mobile headset detected - applying camera fix");
                let camera = self.el.components['camera'];
                let currentPosition = camera.el.getAttribute('position') || {x: 0, y: 0, z: 0};
                camera.el.setAttribute('position', {
                    x: currentPosition.x,
                    y: 0,
                    z: currentPosition.z
                });
            }
        })
    }
});