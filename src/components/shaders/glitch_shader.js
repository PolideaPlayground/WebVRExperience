import * as AFRAME from "aframe";

const vertexShader = `
    varying vec2 vUv;
    
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;
const fragmentShader = `
    varying vec2 vUv;
    uniform vec3 color;
    uniform float time;
    
    void main() {
      // Use sin(time), which curves between 0 and 1 over time,
      // to determine the mix of two colors:
      //    (a) Dynamic color where 'R' and 'B' channels come
      //        from a modulus of the UV coordinates.
      //    (b) Base color.
      //
      // The color itself is a vec4 containing RGBA values 0-1.
      gl_FragColor = mix(
        vec4(mod(vUv , 0.05) * 20.0, 1.0, 1.0),
        vec4(color, 1.0),
        sin(time)
      );
}
`;
AFRAME.registerShader('shader-glitch', {
    schema: {color: {type: 'color', default: "#ffff00"}},

    vertexShader: vertexShader,

    fragmentShader: fragmentShader,

});