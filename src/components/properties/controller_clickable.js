import * as AFRAME from "aframe";




AFRAME.registerComponent('clickable-controller', {

    init: function () {
        var self = this;
        this.onButtonChanged = AFRAME.utils.bind(this.onButtonChanged, this);
        this.onButtonDown = function (evt) { self.onButtonEvent(evt.detail.id, 'down'); };
        this.onButtonUp = function (evt) { self.onButtonEvent(evt.detail.id, 'up'); };
        this.onButtonTouchStart = function (evt) { self.onButtonEvent(evt.detail.id, 'touchstart'); };
        this.onButtonTouchEnd = function (evt) { self.onButtonEvent(evt.detail.id, 'touchend'); };
        this.onAxisMoved = AFRAME.utils.bind(this.onAxisMoved, this);
    },


    addEventListeners: function () {
        var el = this.el;

        console.log("Init");
        el.addEventListener('buttonchanged', this.onButtonChanged);
        el.addEventListener('buttondown', this.onButtonDown);
        el.addEventListener('buttonup', this.onButtonUp);
        el.addEventListener('touchstart', this.onButtonTouchStart);
        el.addEventListener('touchend', this.onButtonTouchEnd);
        el.addEventListener('axismove', this.onAxisMoved);
    },

    removeEventListeners: function () {
        var el = this.el;
        el.removeEventListener('buttonchanged', this.onButtonChanged);
        el.removeEventListener('buttondown', this.onButtonDown);
        el.removeEventListener('buttonup', this.onButtonUp);
        el.removeEventListener('touchstart', this.onButtonTouchStart);
        el.removeEventListener('touchend', this.onButtonTouchEnd);
        el.removeEventListener('axismove', this.onAxisMoved);
    },
    play: function () {
        this.addEventListeners();
    },

    pause: function () {
        this.removeEventListeners();
    },

    onButtonChanged: function (evt) {
        var button = this.mapping.buttons[evt.detail.id];
        if (!button) return;
        // Pass along changed event with button state, using button mapping for convenience.
        this.el.emit(button + 'changed', evt.detail.state);
    },

    onButtonEvent: function (id, evtName) {
        var buttonName = this.mapping.buttons[id];
        var i;
        if (Array.isArray(buttonName)) {
            for (i = 0; i < buttonName.length; i++) {
                this.el.emit(buttonName[i] + evtName);
            }
        } else {
            this.el.emit(buttonName + evtName);
        }
        this.updateModel(buttonName, evtName);
    },

    onAxisMoved: function (evt) { this.emitIfAxesChanged(this, this.mapping.axes, evt); },

    updateModel: function (buttonName, evtName) {
        var i;
        if (!this.data.model) { return; }
        if (Array.isArray(buttonName)) {
            for (i = 0; i < buttonName.length; i++) {
                this.updateButtonModel(buttonName[i], evtName);
            }
        } else {
            this.updateButtonModel(buttonName, evtName);
        }
    },

    updateButtonModel: function (buttonName, state) {
        var buttonMeshes = this.buttonMeshes;
        if (!buttonMeshes || !buttonMeshes[buttonName]) { return; }
        var color;
        switch (state) {
            case 'down':
                color = this.data.buttonHighlightColor;
                break;
            case 'touchstart':
                color = this.data.buttonTouchedColor;
                break;
            default:
                color = this.data.buttonColor;
        }
        buttonMeshes[buttonName].material.color.set(color);
    }
});
