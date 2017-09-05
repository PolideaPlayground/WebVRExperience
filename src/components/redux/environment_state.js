import "aframe-redux-component";
import * as AFRAME from "aframe";

AFRAME.registerReducer('windmillSelected', {
    actions: {
        WINDMILL_SELECTED: 'WINDMILL_SELECTED',
        WINDMILL_DESELECTED: 'WINDMILL_DESELECTED'
    },
    initialState: {
        color: '#000000',
        sound: 'src: #nightSound',

        stateName: 'WINDMILL_SELECTED'
    },
    reducer: function (state, action) {
        state = state || this.initialState;
        let newState;
        console.log("reducer");
        switch (action.type) {
            case this.actions.WINDMILL_SELECTED: {
                console.log("WINDMILL_SELECTED");
                newState = Object.assign({}, state);
                newState.color = '#fffaf0';
                newState.stateName = "WINDMILL_DESELECTED";
                console.log('Change to day')
                return newState;
            }
            case this.actions.WINDMILL_DESELECTED: {
                console.log("WINDMILL_DESELECTED");
                newState = Object.assign({}, state);
                newState.color = '#000000';
                newState.stateName = "WINDMILL_SELECTED";
                console.log('Change to night')
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