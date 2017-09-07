import "aframe-redux-component";
import * as AFRAME from "aframe";

const fogDay = 'density: 0.06; far: 40; color: #ababab; near: 0; type: exponential';
const fogNight = 'density: 0.06; far: 40; color: #4e4b55; near: 0; type: exponential';
const noFog = 'density: 0; far: 40; type: exponential; color: #ababab; near: 0';
const nightBackground = '#000';
const dayBackground = '#FFB';
const nightSound = 'src: #nightSound; autoplay: true';
const daySound = 'src: #birdSound; autoplay: true';
AFRAME.registerReducer('backgroundSelected', {
    actions: {
        FOG_ENABLED: 'FOG_ENABLED',
        NIGHT_ENABLED: 'NIGHT_ENABLED'
    },
    initialState: {
        color: nightBackground,
        fogState: true,
        nightState: true,
        sound: nightSound,
        fog: fogNight,
        backgroundCurrentState: 'FOG_ENABLED'
    },
    reducer: function (state, action) {
        state = state || this.initialState;

        console.log("reducer");
        switch (action.type) {
            case this.actions.FOG_ENABLED: {
                return toggleFog(state)
            }
            case this.actions.NIGHT_ENABLED: {
                return toggleNight(state)
            }
            default: {
                return state
            }
        }
    }
});


function toggleFog(state) {
    let newState;
    newState = Object.assign({}, state);
    console.log(state);
    if (state.fogState === true) {
        console.log("Turn off fog");
        newState.fogState = false;
        newState.color = (state.nightState && nightBackground) || dayBackground;
        newState.fog = noFog;
        newState.sound = (state.nightState && nightSound) || daySound;
    } else {
        console.log("Turn on fog");
        newState.fogState = true;
        newState.color = (state.nightState && nightBackground) || dayBackground;
        newState.fog = (state.nightState && fogNight) || fogDay;
        newState.sound = (state.nightState && nightSound) || daySound;
    }
    return newState;
}

function toggleNight(state) {
    let newState = Object.assign({}, state);
    console.log(state);
    if (state.nightState === true) {
        console.log("Turn off night");
        newState.nightState = false;
        newState.color = dayBackground;
        newState.fog = (state.fogState && fogDay) || noFog;
        newState.sound = daySound;

    } else {
        console.log("Turn on night");
        newState.nightState = true;
        newState.color = nightBackground;
        newState.fog = (state.fogState && fogNight) || noFog;
        newState.sound = nightSound;
    }
    return newState;
}

export function toggleBackground(element, mode) {

    let action = {
        type: mode
    };
    element.sceneEl.systems.redux.store.dispatch(action);
}