import * as State from "./../../utils/state_component";

const FOGDAY = 'density: 0.06; far: 40; color: #ababab; near: 0; type: exponential';
const FOGNIGHT = 'density: 0.03; far: 40; color: #302D48; near: 0; type: exponential';
const NOFOG = 'density: 0; far: 40; type: exponential; color: #ababab; near: 0';

const DAYBACKGROUND = 'shader: gradient; topColor: 196 189 255; bottomColor: 255 255 255';
const NIGHTBACKGROUND = 'shader: gradient; topColor: 29 27 39; bottomColor: 98 111 168';

const NIGHTSOUND = 'src: #nightSound; autoplay: true; loop: true';
const DAYSOUND = 'src: #daySound; autoplay: true; loop: true';
const NOBIRDS = 'attach: false';
const WITHBIRDS = 'attach: true';

const DAYLIGHT = "intensity: 1.6; color: #FFDA59; castShadow: true";
const DAYAMBIENT = "type: ambient; intensity: 1.8; color: #9C90ff";

const NIGHTLIGHT = "intensity: 0.4; color: #CAFF59; castShadow: false";
const NIGHTAMBIENT = "type: ambient; intensity: 1.0; color: #9C90ff";

State.registerReducer('environment', {
    initialState: {
        skyMaterial: NIGHTBACKGROUND,
        skyGradient: false,
        fogState: true,
        nightState: true,
        light: NIGHTLIGHT,
        ambient: NIGHTAMBIENT,
        mushroomState: false,
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
        MUSHROOM_ENABLED: function (state, action) {
            state = state || this.initialState;
            let newState = Object.assign({}, state);
            newState.mushroomState = action.enabled;
            return newState;
        },
    }
});


function changeFog(state, enabled) {
    let newState = Object.assign({}, state);
    if (enabled) {
        console.log("Turn off fog");
        newState.fogState = false;
        newState.skyGradient = true;
        newState.skyMaterial = (state.nightState && NIGHTBACKGROUND) || DAYBACKGROUND;
        newState.fog = NOFOG;
        newState.sound = (state.nightState && NIGHTSOUND) || DAYSOUND;
    } else {
        console.log("Turn on fog");
        newState.fogState = true;
        newState.skyGradient = false;
        newState.skyMaterial = (state.nightState && NIGHTBACKGROUND) || DAYBACKGROUND;
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
        newState.light = DAYLIGHT;
        newState.ambient = DAYAMBIENT;
        newState.skyMaterial = DAYBACKGROUND;
        newState.fog = (state.fogState && FOGDAY) || NOFOG;
        newState.sound = DAYSOUND;

    } else {
        console.log("Turn on night");
        newState.nightState = true;
        newState.lightIntensity = 0.4;
        newState.light = NIGHTLIGHT;
        newState.ambient = NIGHTAMBIENT;
        newState.skyMaterial = NIGHTBACKGROUND;
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

export function toggleMushroom(element, enabled) {

    let action = {
        type: "MUSHROOM_ENABLED",
        enabled: enabled
    };
    element.sceneEl.systems.state.store.dispatch(action);
}