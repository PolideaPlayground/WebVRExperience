import * as THREE from "three";
import * as AFRAME from "aframe";
import Bird from "./bird";

function Boid() {
    let vector = new THREE.Vector3(),
        _acceleration, _width = 60, _height = 40, _depth = 60, _goal, _neighborhoodRadius = 1.5,
        _maxSpeed = 0.2, _maxSteerForce = 0.2, _avoidWalls = true;
    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    _acceleration = new THREE.Vector3();
    this.setGoal = function (target) {
        _goal = target;
    };

    this.run = function (boids) {
        if (_avoidWalls) {
            vector.set(-_width, this.position.y, this.position.z);
            vector = this.avoid(vector);
            let scalar = 5;
            vector.multiplyScalar(scalar);
            _acceleration.add(vector);
            vector.set(_width, this.position.y, this.position.z);
            vector = this.avoid(vector);
            vector.multiplyScalar(scalar);
            _acceleration.add(vector);
            vector.set(this.position.x, -5, this.position.z);
            vector = this.avoid(vector);
            vector.multiplyScalar(scalar);
            _acceleration.add(vector);
            vector.set(this.position.x, _height, this.position.z);
            vector = this.avoid(vector);
            vector.multiplyScalar(scalar);
            _acceleration.add(vector);
            vector.set(this.position.x, this.position.y, -_depth);
            vector = this.avoid(vector);
            vector.multiplyScalar(scalar);
            _acceleration.add(vector);
            vector.set(this.position.x, this.position.y, -0);
            vector = this.avoid(vector);
            vector.multiplyScalar(scalar);
            _acceleration.add(vector);
        }

        if (Math.random() > 0.5) {
            this.flock(boids);
        }
        this.move();
    };
    this.flock = function (boids) {
        if (_goal) {
            _acceleration.add(this.reach(_goal, 0.005));
        }
        _acceleration.add(this.alignment(boids));
        _acceleration.add(this.cohesion(boids));
        _acceleration.add(this.separation(boids));
    };
    this.move = function () {
        this.velocity.add(_acceleration.multiplyScalar(0.05));
        let l = this.velocity.length();
        if (l > _maxSpeed) {
            this.velocity.divideScalar(l / _maxSpeed);
        }
        this.position.add(this.velocity);
        _acceleration.set(0, 0, 0);
    };

    this.avoid = function (target) {
        let steer = new THREE.Vector3();
        steer.copy(this.position);
        steer.sub(target);
        steer.multiplyScalar(1 / this.position.distanceToSquared(target));
        return steer;
    };
    //This can be used to make bird avoid a cursor
    this.repulse = function (target) {
        let distance = this.position.distanceTo(target);
        if (distance < 150) {
            let steer = new THREE.Vector3();
            steer.subVectors(this.position, target);
            steer.multiplyScalar(0.5 / distance);
            _acceleration.add(steer);
        }
    };
    this.reach = function (target, amount) {
        let steer = new THREE.Vector3();
        steer.subVectors(target, this.position);
        steer.multiplyScalar(amount);
        return steer;
    };
    this.alignment = function (boids) {
        let count = 0;
        let velSum = new THREE.Vector3();
        for (let i = 0, il = boids.length; i < il; i++) {
            if (Math.random() > 0.6) continue;
            let boid = boids[i];
            let distance = boid.position.distanceTo(this.position);
            if (distance > 0 && distance <= _neighborhoodRadius) {
                velSum.add(boid.velocity);
                count++;
            }
        }
        if (count > 0) {
            velSum.divideScalar(count);
            let l = velSum.length();
            if (l > _maxSteerForce) {
                velSum.divideScalar(l / _maxSteerForce);
            }
        }
        return velSum;
    };
    this.cohesion = function (boids) {
        let count = 0;
        let posSum = new THREE.Vector3();
        let steer = new THREE.Vector3();
        for (let i = 0, il = boids.length; i < il; i++) {
            if (Math.random() > 0.6) continue;
            let boid = boids[i];
            let distance = boid.position.distanceTo(this.position);
            if (distance > 0 && distance <= _neighborhoodRadius) {
                posSum.add(boid.position);
                count++;
            }
        }
        if (count > 0) {
            posSum.divideScalar(count);
        }
        steer.subVectors(posSum, this.position);
        let l = steer.length();
        if (l > _maxSteerForce) {
            steer.divideScalar(l / _maxSteerForce);
        }
        return steer;
    };
    this.separation = function (boids) {
        let posSum = new THREE.Vector3();
        let repulse = new THREE.Vector3();
        for (let i = 0, il = boids.length; i < il; i++) {
            if (Math.random() > 0.6) continue;
            let boid = boids[i];
            let distance = boid.position.distanceTo(this.position);
            if (distance > 0 && distance <= _neighborhoodRadius) {
                repulse.subVectors(this.position, boid.position);
                repulse.normalize();
                repulse.divideScalar(distance);
                posSum.add(repulse);
            }
        }
        return posSum;
    }
}

const birds = [];
const boids = [];

AFRAME.registerComponent('birds', {
    schema: {
        attach: {default: true},
        count: {default: 6},
        visible: {default: false}
    },
    init: function () {
        let sceneEl = this.el.sceneEl;
        this.birds = birds;
        this.boids = boids;
        let boid, bird;

        let colors = ['#eeeeee', '#bebebe', '#838383', '#505050'];


        for (let i = 0; i < this.data.count; i++) {
            boid = this.boids[i] = new Boid();
            boid.position.x = Math.random() * 40 - 20;
            boid.position.y = 5 + Math.random() * 10 - 5;
            boid.position.z = -15 + Math.random() * 10 - 5;
            boid.velocity.x = Math.random() * 2 - 1;
            boid.velocity.y = Math.random() * 2 - 1;
            boid.velocity.z = Math.random() * 2 - 1;
            boid.setGoal(0, 8, -15);

            bird = this.birds[i] = new THREE.Mesh(new Bird(), new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                side: THREE.DoubleSide
            }));

            bird.phase = Math.floor(Math.random() * Math.PI);
            bird.geometry.verticesNeedUpdate = true;

            bird.visible = false;
            sceneEl.object3D.add(bird);
        }
    },
    update: function () {
        let sceneEl = this.el.sceneEl;

        for (let i = 0; i < this.birds.length; i++) {
            let bird = this.birds[i];
            if (this.data.attach) {
                sceneEl.object3D.add(bird);
                console.log(this.birds);
            } else {
                sceneEl.object3D.remove(bird);
            }
        }
    },
    tick: function () {
        if (this.data.attach) {
            for (var i = 0, il = this.birds.length; i < il; i++) {
                let boid = this.boids[i];
                boid.run(this.boids);
                let bird = this.birds[i];
                bird.position.copy(boid.position);

                bird.rotation.y = Math.atan2(-boid.velocity.z, boid.velocity.x);
                bird.rotation.z = Math.asin(boid.velocity.y / boid.velocity.length());

                bird.phase = ( bird.phase + ( Math.max(0, bird.rotation.z) + 0.1 )  ) % 62.83;
                bird.geometry.vertices[5].y = bird.geometry.vertices[4].y = Math.sin(bird.phase) * 0.4;
                bird.geometry.verticesNeedUpdate = true;
            }
        }


        for (var i = 0, il = this.birds.length; i < il; i++) {
            let boid = this.boids[i];
            boid.visible = this.data.visible
        }
    }
});