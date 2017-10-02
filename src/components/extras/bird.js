import * as THREE from "three";

let Bird = function () {

    let scope = this;

    THREE.Geometry.call(this);

    v(5, 0, 0);
    v(-5, -2, 1);
    v(-5, 0, 0);
    v(-5, -2, -1);

    v(0, 2, -3);
    v(0, 2, 3);
    v(2, 0, 0);
    v(-3, 0, 0);

    f3(0, 2, 1);
    f3(0, 3, 2);

    f3(4, 7, 6);
    f3(5, 6, 7);

    this.computeFaceNormals();

    function v(x, y, z) {
        let scaleFactor = 0.1;
        scope.vertices.push(new THREE.Vector3(x * scaleFactor, y * scaleFactor, z * scaleFactor));

    }

    function f3(a, b, c) {
        scope.faces.push(new THREE.Face3(a, b, c));

    }
};

Bird.prototype = Object.create( THREE.Geometry.prototype );
Bird.prototype.constructor = Bird;

export default Bird;