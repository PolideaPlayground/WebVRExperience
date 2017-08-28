import "aframe-redux-component";
import * as AFRAME from "aframe";

AFRAME.registerReducer('modelSelected', {
    actions: {
        MODE_SELECTED: 'MODEL_SELECTED',
        MODE_DESELECTED: 'MODEL_DESELECTED'
    },
    initialState: {
        model: "",
        visible: false
    },
    reducer: function (state, action) {
        state = state || this.initialState;
        switch (action.type) {
            case this.actions.MODE_SELECTED: {
                var newState = Object.assign({}, state);

                newState.model = action.model;
                newState.visible = true;
                return newState;
            }
            case this.actions.MODE_DESELECTED: {
                var newState1 = Object.assign({}, state);
                newState1.model = "";
                newState1.visible = false;
                return newState1;
            }
            default: {
                return state;
            }
        }
    }


});

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