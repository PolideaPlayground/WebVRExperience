import "aframe-state-component";
import * as AFRAME from "aframe";

const FOGDAY = 'density: 0.06; far: 40; color: #ababab; near: 0; type: exponential';
const FOGNIGHT = 'density: 0.06; far: 40; color: #4e4b55; near: 0; type: exponential';
const NOFOG = 'density: 0; far: 40; type: exponential; color: #ababab; near: 0';
const NIGHTBACKGROUND = '#000';
const DAYBACKGROUND = '#FFB';
const NIGHTSOUND = 'src: #nightSound; autoplay: true';
const DAYSOUND = 'src: #birdSound; autoplay: true';
const NOBIRDS = 'attach: false';
const WITHBIRDS = 'attach: true';

AFRAME.registerReducer('environment', {
    initialState: {
        color: NIGHTBACKGROUND,
        fogState: true,
        nightState: true,
        lightIntensity: 0.4,
        birds: NOBIRDS,
        sound: NIGHTSOUND,
        fog: FOGNIGHT,
    },
    handlers: {
        FOG_ENABLED: function (state, action) {
            state = state || this.initialState;
            return changeFog(state, action.enabled);
        },
        NIGHT_ENABLED: function (state, action) {
            state = state || this.initialState;
            return changeNight(state, action.enabled);
        },
        BIRDS_ENABLED: function (state, action) {
            state = state || this.initialState;
            let newState = Object.assign({}, state);
            newState.birds = action.enabled ? WITHBIRDS : NOBIRDS;
            return newState;
        },
    }
});


function changeFog(state, enabled) {
    let newState = Object.assign({}, state);
    if (!enabled) {
        console.log("Turn off fog");
        newState.fogState = false;
        newState.color = (state.nightState && NIGHTBACKGROUND) || DAYBACKGROUND;
        newState.fog = NOFOG;
        newState.sound = (state.nightState && NIGHTSOUND) || DAYSOUND;
    } else {
        console.log("Turn on fog");
        newState.fogState = true;
        newState.color = (state.nightState && NIGHTBACKGROUND) || DAYBACKGROUND;
        newState.fog = (state.nightState && FOGNIGHT) || FOGDAY;
        newState.sound = (state.nightState && NIGHTSOUND) || DAYSOUND;
    }
    return newState;
}

function changeNight(state, enabled) {
    let newState = Object.assign({}, state);
    if (!enabled) {
        console.log("Turn on day");
        newState.nightState = false;
        newState.lightIntensity = 1.4;
        newState.color = DAYBACKGROUND;
        newState.fog = (state.fogState && FOGDAY) || NOFOG;
        newState.sound = DAYSOUND;

    } else {
        console.log("Turn on night");
        newState.nightState = true;
        newState.lightIntensity = 0.4;
        newState.color = NIGHTBACKGROUND;
        newState.fog = (state.fogState && FOGNIGHT) || NOFOG;
        newState.sound = NIGHTSOUND;
    }
    return newState;
}

export function toggleNight(element, enabled) {

    let action = {
        type: "NIGHT_ENABLED",
        enabled: enabled
    };
    element.sceneEl.systems.state.store.dispatch(action);
}

export function toggleFog(element, enabled) {

    let action = {
        enabled: enabled
    };
    element.sceneEl.emit("FOG_ENABLED", action);
}

export function toggleBirds(element, enabled) {

    let action = {
        type: "BIRDS_ENABLED",
        enabled: enabled
    };
    element.sceneEl.systems.state.store.dispatch(action);
}