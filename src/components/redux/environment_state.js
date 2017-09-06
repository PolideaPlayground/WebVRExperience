import "aframe-redux-component";
import * as AFRAME from "aframe";

AFRAME.registerReducer('backgroundSelected', {
    actions: {
        FOG_NIGHT: 'FOG_NIGHT',
        FOG_DAY: 'FOG_DAY',
        NO_FOG_NIGHT: 'NO_FOG_NIGHT',
        NO_FOG_DAY: 'NO_FOG_DAY',
    },
    initialState: {
        color: '#000000',
        sound: 'src: #nightSound',
        fog: 'far: 40; color: #ababab; density: 0; near: 0',
        backgroundCurrentState: 'FOG_NIGHT'
    },

    reducer: function (state, action) {
        state = state || this.initialState;

        console.log("reducer");
        switch (action.changeState) {
            case "fog_on": {
                return turnOnFog(state, action.type)
            }
            case "fog_off": {
                return turnOffFog(state, action.type)
            }
            case "night_on": {
                return turnOnNight(state, action.type)
            }
            case "night_off": {
                return turnOffNight(state, action.type)
            }
            default: {
                return state
            }
        }
    }
});

function turnOnFog(state, currentState) {
    switch (currentState) {
        case "FOG_NIGHT": {
            console.log(`Fog is already on.`);
            return state;
        }
        case "FOG_DAY": {
            console.log(`Fog is already on.`);
            return state;
        }
        case "NO_FOG_NIGHT": {
            return getFogNight(state, "FOG_NIGHT")
        }
        case "NO_FOG_DAY": {
            return getFogDay(state, "FOG_DAY")
        }
        default: {
            console.log(`Fog problem.`);
            return state;
        }
    }
}

function turnOffFog(state, currentState) {
    switch (currentState) {
        case "FOG_NIGHT": {
            return getNoFogNight(state, "NO_FOG_NIGHT")
        }
        case "FOG_DAY": {
            return getNoFogDay(state, "NO_FOG_DAY")
        }
        case "NO_FOG_NIGHT": {
            console.log(`Fog is already off.`);
            return state;
        }
        case "NO_FOG_DAY": {
            console.log(`Fog is already off.`);
            return state;
        }
        default: {
            console.log(`Fog problem.`);
            return state;
        }
    }
}

function turnOnNight(state, currentState) {
    switch (currentState) {
        case "FOG_NIGHT": {
            console.log(`Night is already on.`);
            return state;
        }
        case "FOG_DAY": {
            return getFogNight(state, "FOG_NIGHT");
        }
        case "NO_FOG_NIGHT": {
            console.log(`Night is already on.`);
            return state;
        }
        case "NO_FOG_DAY": {
            return getNoFogNight(state, "NO_FOG_NIGHT");
        }
        default: {
            console.log(`Night problem.`);
            return state;
        }
    }
}

function turnOffNight(state, currentState) {
    switch (currentState) {
        case "FOG_NIGHT": {
            return getFogDay(state, "FOG_DAY");
        }
        case "FOG_DAY": {
            console.log(`Night is already off.`);
            return state;
        }
        case "NO_FOG_NIGHT": {
            return getNoFogDay(state, "NO_FOG_DAY");
        }
        case "NO_FOG_DAY": {
            console.log(`Night is already off.`);
            return state;
        }
        default: {
            return state;
        }
    }
}

function getFogNight(state, newCurrentState) {
    let newState;
    newState = Object.assign({}, state);
    console.log(state);
    console.log("get fog night!");
    newState.color = '#000';
    newState.fog = 'far: 40; color: #ababab; density: 0; near: 0';
    newState.backgroundCurrentState = newCurrentState;
    newState.sound = 'src: #nightSound';

    return newState;
}

function getFogDay(state, newCurrentState) {
    let newState;
    console.log(state);
    console.log("get fog day!");
    newState = Object.assign({}, state);
    newState.color = '#FFB';
    newState.fog = 'far: 40; color: #ababab; density: 0; near: 0';
    newState.backgroundCurrentState = newCurrentState;
    newState.sound = 'src: #nightSound';

    return newState;
}

function getNoFogNight(state, newCurrentState) {
    let newState;
    console.log(state);
    console.log("get No fog night!");
    newState = Object.assign({}, state);
    newState.color = '#000';
    newState.fog = 'far: 400; color: #ababab; density: 0; near: 0';
    newState.sound = 'src: #nightSound';
    newState.backgroundCurrentState = newCurrentState;

    return newState;
}

function getNoFogDay(state, newCurrentState) {
    let newState;
    console.log(state);
    console.log("get No fog day!");
    newState = Object.assign({}, state);
    newState.color = '#FFB';
    newState.fog = 'far: 400; color: #ababab; density: 0; near: 0';
    newState.sound = 'src: #nightSound';
    newState.backgroundCurrentState = newCurrentState;

    return newState;
}

export function getCurrentBackgroundColor(element) {
    return element.sceneEl.systems.redux.store.getState().backgroundSelected.backgroundCurrentState;
}

export function toggleBackground(element, state) {
    let currentState = getCurrentBackgroundColor(element);
    console.log(state);

    let action = {
        type: currentState,
        changeState: state
    };
    element.sceneEl.systems.redux.store.dispatch(action);
}