import * as AFRAME from "aframe";

AFRAME.registerReducer('diskSelected', {
    initialState: {
        texture: "",
        visible: false,
    },
    handlers: {
        MODEL_SELECTED: function (state, action) {
            state = state || this.initialState;
            let newState = Object.assign({}, state);
            newState.texture = action.texture;
            newState.visible = true;
            return newState;
        },
        MODEL_DESELECTED: function (state, action) {
            state = state || this.initialState;
            let newState = Object.assign({}, state);
            newState.texture = "";
            newState.visible = false;
            return newState;
        },
    }


});

export function getCurrentlySelectedTexture(element) {
    return element.sceneEl.systems.state.store.getState().diskSelected.texture;
}

export function selectCurrentModel(element, value) {
    element.sceneEl.emit("MODEL_SELECTED", {texture: value});
}

export function deselectCurrentModel(element) {
    let action = {
        texture: ""
    };
    element.sceneEl.emit("MODEL_DESELECTED", action);
}