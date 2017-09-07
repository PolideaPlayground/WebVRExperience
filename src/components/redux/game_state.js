import "aframe-redux-component";
import * as AFRAME from "aframe";

AFRAME.registerReducer('diskSelected', {
    actions: {
        MODE_SELECTED: 'MODEL_SELECTED',
        MODE_DESELECTED: 'MODEL_DESELECTED'
    },
    initialState: {
        texture: "",
        visible: false,
    },
    reducer: function (state, action) {
        state = state || this.initialState;
        let newState;
        switch (action.type) {
            case this.actions.MODE_SELECTED: {
                newState = Object.assign({}, state);
                newState.texture = action.texture;
                newState.visible = true;
                return newState;
            }
            case this.actions.MODE_DESELECTED: {
                newState = Object.assign({}, state);
                newState.texture = "";
                newState.visible = false;
                return newState;
            }
            default: {
                return state;
            }
        }
    }


});

export function getCurrentlySelectedTexture(element) {
    return element.sceneEl.systems.redux.store.getState().diskSelected.texture;
}

export function selectCurrentModel(element, value) {
    let action = {
        type: "MODEL_SELECTED",
        texture: value
    };
    element.sceneEl.systems.redux.store.dispatch(action);
}

export function deselectCurrentMode(element) {
    let action = {
        type: "MODEL_DESELECTED",
        texture: ""
    };
    element.sceneEl.systems.redux.store.dispatch(action);
}