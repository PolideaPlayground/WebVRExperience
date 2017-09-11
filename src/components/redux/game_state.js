import * as State from  "./../../utils/state_component";

State.registerReducer('gameState', {
    initialState: {
        selected_texture: "",
        disk_visible: false,
    },
    handlers: {
        DISK_SELECTED: function (state, action) {
            state = state || this.initialState;
            let newState = Object.assign({}, state);
            newState.selected_texture = action.texture;
            newState.disk_visible = true;
            return newState;
        },
        DISK_DESELECTED: function (state, action) {
            state = state || this.initialState;
            let newState = Object.assign({}, state);
            newState.selected_texture = "";
            newState.disk_visible = false;
            return newState;
        },
    }


});

export function getCurrentlySelectedDisk(element) {
    return element.sceneEl.systems.state.store.getState().gameState.selected_texture;
}

export function selectCurrentDisk(element, value) {
    element.sceneEl.emit("DISK_SELECTED", {texture: value});
}

export function deselectCurrentDisk(element) {
    let action = {
        texture: ""
    };
    element.sceneEl.emit("DISK_DESELECTED", action);
}