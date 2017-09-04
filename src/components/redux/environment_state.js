import "aframe-redux-component";
import * as AFRAME from "aframe";

AFRAME.registerReducer('windmillSelected', {
    actions: {
        WINDMILL_SELECTED: 'WINDMILL_SELECTED',
        WINDMILL_DESELECTED: 'WINDMILL_DESELECTED'
    },
    initialState: {
        color: 'black',
        sound: 'src: #nightSound',
        visible: false,
        stateName: 'WINDMILL_DESELECTED'
    },
    reducer: function (state, action) {
        state = state || this.initialState;
        let newState;
        console.log("reducer");
        switch (action.type) {
            case this.actions.WINDMILL_SELECTED: {
                console.log("WINDMILL_SELECTED");
                newState = Object.assign({}, state);
                newState.color = '#031128';
                newState.visible = true;
                return newState;
            }
            case this.actions.WINDMILL_DESELECTED: {
                console.log("WINDMILL_DESELECTED");
                newState = Object.assign({}, state);
                newState.color = this.initialState.color;
                newState.visible = false;
                return newState;
            }
            default: {
                return state;
            }
        }
    }


});

export function getCurrentBackgroundColor(element) {
    return element.sceneEl.systems.redux.store.getState().windmillSelected.stateName;
}

export function selectCurrentBackground(element, value) {
    let action = {
        type: "WINDMILL_SELECTED",
        color: "#031128"
    };
    element.sceneEl.systems.redux.store.dispatch(action);
}

export function deselectCurrentBackground(element) {
    let action = {
        type: "WINDMILL_DESELECTED",
        color: "black"
    };
    element.sceneEl.systems.redux.store.dispatch(action);
}

export function toggleBackground(element) {
    let action = {
        type: getCurrentBackgroundColor(element)
    };
    element.sceneEl.systems.redux.store.dispatch(action);
}