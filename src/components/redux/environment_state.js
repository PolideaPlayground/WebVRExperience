import "aframe-redux-component";
import * as AFRAME from "aframe";

AFRAME.registerReducer('backgroundSelected', {
    actions: {
        DAY_SELECTED: 'DAY_SELECTED',
        NIGHT_DESELECTED: 'NIGHT_DESELECTED'
    },
    initialState: {
        color: '#000000',
        sound: 'src: #nightSound',

        nextStateName: 'DAY_SELECTED'
    },
    reducer: function (state, action) {
        state = state || this.initialState;
        let newState;
        console.log("reducer");
        switch (action.type) {
            case this.actions.DAY_SELECTED: {
                console.log("DAY_SELECTED");
                newState = Object.assign({}, state);
                newState.color = '#fffaf0';
                newState.nextStateName = "NIGHT_DESELECTED";
                console.log('Change to day');
                return newState;
            }
            case this.actions.NIGHT_DESELECTED: {
                console.log("NIGHT_DESELECTED");
                newState = Object.assign({}, state);
                newState.color = '#000000';
                newState.nextStateName = "DAY_SELECTED";
                console.log('Change to night');
                return newState;
            }
            default: {
                return state;
            }
        }
    }


});

export function getCurrentBackgroundColor(element) {
    return element.sceneEl.systems.redux.store.getState().backgroundSelected.nextStateName;
}

export function toggleBackground(element) {
    let action = {
        type: getCurrentBackgroundColor(element)
    };
    element.sceneEl.systems.redux.store.dispatch(action);
}