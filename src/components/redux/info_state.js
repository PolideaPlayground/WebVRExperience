import "aframe-state-component";
import * as AFRAME from "aframe";

AFRAME.registerReducer('info', {
    initialState: {
       visible: false
    },
    handlers: {
        POLIDEA_ENABLED: function (state, action) {
            state = state || this.initialState;
            return plainEnable(state, action.enabled);
        },
        DIALOG_ENABLED: function (state, action) {
            state = state || this.initialState;
            return plainEnable(state, action.visible);
        },
    }
});

function plainEnable(state, visible){
    let newState = Object.assign({}, state);
    if(visible){
        newState.visible = false;
    }else{
        newState.visible = true;
    }
    return newState;
}