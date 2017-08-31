import "aframe-redux-component";
import * as AFRAME from "aframe";

AFRAME.registerReducer('neonConnected', {
    actions: {
        EXIT_CONNECTED: 'EXIT_CONNECTED',
        EXIT_DISCONNECTED: 'EXIT_DISCONNECTED'
    },
    initialState: {
        exit1: false,
        exit2: false,
    },
    reducer: function (state, action) {
        state = state || this.initialState;
        let newState;
        switch (action.type) {
            case this.actions.EXIT_CONNECTED: {
                newState = Object.assign({}, state);
                newState[action.exit] = true;
                return newState;
            }
            case this.actions.EXIT_DISCONNECTED: {
                newState = Object.assign({}, state);
                newState.exit1 = false;
                newState.exit2 = false;
                return newState;
            }
            default: {
                return state;
            }
        }
    }


});

export function connectExit(element, value) {
    let action = {
        type: "EXIT_CONNECTED",
        exit: value
    };
    element.sceneEl.systems.redux.store.dispatch(action);
}

export function disconnectExits(element) {
    let action = {
        type: "EXIT_DISCONNECTED",

    };
    element.sceneEl.systems.redux.store.dispatch(action);
}