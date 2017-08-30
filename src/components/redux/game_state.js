import "aframe-redux-component";
import * as AFRAME from "aframe";

AFRAME.registerReducer('modelSelected', {
    actions: {
        MODE_SELECTED: 'MODEL_SELECTED',
        MODE_DESELECTED: 'MODEL_DESELECTED'
    },
    initialState: {
        model: "",
        visible: false,
    },
    reducer: function (state, action) {
        state = state || this.initialState;
        let newState;
        switch (action.type) {
            case this.actions.MODE_SELECTED: {
                newState = Object.assign({}, state);
                newState.model = `src: ${action.model}`;
                newState.visible = true;
                return newState;
            }
            case this.actions.MODE_DESELECTED: {
                newState = Object.assign({}, state);
                newState.model = "";
                newState.visible = false;
                return newState;
            }
            default: {
                return state;
            }
        }
    }


});

export function getCurrentlySelectedModel(element) {
    return element.sceneEl.systems.redux.store.getState().modelSelected.model;
}

export function selectCurrentModel(element, value) {
    let action = {
        type: "MODEL_SELECTED",
        model: value
    };
    element.sceneEl.systems.redux.store.dispatch(action);
}

export function deselectCurrentMode(element) {
    let action = {
        type: "MODEL_DESELECTED",
        model: ""
    };
    element.sceneEl.systems.redux.store.dispatch(action);
}