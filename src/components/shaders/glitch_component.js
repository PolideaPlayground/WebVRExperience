import * as AFRAME from "aframe";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;
const fragmentShader = `
  varying vec2 vUv;
uniform vec3 colorF;
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
    vec4(colorF, 1.0),
    sin(time)
  );
}
`;

AFRAME.registerComponent('material-grid-glitch', {
    schema: {color: {type: 'color', default: "#FFFF00"}},
    /**
     * Creates a new THREE.ShaderMaterial using the two shaders defined
     * in vertex.glsl and fragment.glsl.
     */
    init: function () {
        const data = this.data;
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                time: {value: 0.0},
                colorF: {value: new THREE.Color(data.color)}
            },
            vertexShader,
            fragmentShader,
            vertexColors: THREE.VertexColors
        });
        this.applyToMesh();
        this.el.addEventListener('model-loaded', () => this.applyToMesh());
    },
    /**
     * Update the ShaderMaterial when component data changes.
     */
    update: function () {
        console.log(this.data.color);
        this.material.uniforms.colorF.value.set(this.data.color);
    },
    /**
     * Apply the material to the current entity.
     */
    applyToMesh: function () {
        let context = this;
        let mesh = this.el.getObject3D('mesh');
        console.log(mesh);
        if (mesh) {
            console.log("Apllying shader.");
            mesh.material = context.material;
            mesh.material.needsUpdate = true;
            mesh.traverse((child) => {
                if (child.type === "Mesh") {
                    console.log("Apllying shader to child");
                    let materials = [];
                    if (child.material instanceof THREE.MultiMaterial) {
                        materials.push(child.material.materials);
                    } else {
                        materials.push(child.material);
                    }
                    materials.push(context.material);

                    let material = new THREE.MultiMaterial(materials);
                    child.material = context.material;
                    child.material.needsUpdate = true;
                }
            });
        }
    },
    /**
     * On each frame, update the 'time' uniform in the shaders.
     */
    tick: function (t) {
        this.material.uniforms.time.value = t / 1000;
    }
});