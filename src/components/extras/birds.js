import * as THREE from "three";
import * as AFRAME from "aframe";
import Bird from "./bird";

function Boid() {
    var vector = new THREE.Vector3(),
        _acceleration, _width = 30, _height = 30, _depth = 40, _goal, _neighborhoodRadius = 1,
        _maxSpeed = 0.25, _maxSteerForce = 0.25, _avoidWalls = true;
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
            vector.set(this.position.x, -0, this.position.z);
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
        /* else {
                                this.checkBounds();
                            }
                            */
        // if (Math.random() > 0.5) {
        this.flock(boids);
        // }
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
        var l = this.velocity.length();
        if (l > _maxSpeed) {
            this.velocity.divideScalar(l / _maxSpeed);
        }
        this.position.add(this.velocity);
        _acceleration.set(0, 0, 0);
    };
    this.checkBounds = function () {
        if (this.position.x > _width) this.position.x = -_width;
        if (this.position.x < -_width) this.position.x = _width;
        if (this.position.y > _height) this.position.y = -_height;
        if (this.position.y < -_height) this.position.y = _height;
        if (this.position.z > _depth) this.position.z = -_depth;
        if (this.position.z < -_depth) this.position.z = _depth;
    };
    //
    this.avoid = function (target) {
        var steer = new THREE.Vector3();
        steer.copy(this.position);
        steer.sub(target);
        steer.multiplyScalar(1 / this.position.distanceToSquared(target));
        return steer;
    };
    this.repulse = function (target) {
        var distance = this.position.distanceTo(target);
        if (distance < 150) {
            var steer = new THREE.Vector3();
            steer.subVectors(this.position, target);
            steer.multiplyScalar(0.5 / distance);
            _acceleration.add(steer);
        }
    };
    this.reach = function (target, amount) {
        var steer = new THREE.Vector3();
        steer.subVectors(target, this.position);
        steer.multiplyScalar(amount);
        return steer;
    };
    this.alignment = function (boids) {
        var count = 0;
        var velSum = new THREE.Vector3();
        for (var i = 0, il = boids.length; i < il; i++) {
            if (Math.random() > 0.6) continue;
            var boid = boids[i];
            var distance = boid.position.distanceTo(this.position);
            if (distance > 0 && distance <= _neighborhoodRadius) {
                velSum.add(boid.velocity);
                count++;
            }
        }
        if (count > 0) {
            velSum.divideScalar(count);
            var l = velSum.length();
            if (l > _maxSteerForce) {
                velSum.divideScalar(l / _maxSteerForce);
            }
        }
        return velSum;
    };
    this.cohesion = function (boids) {
        var count = 0;
        var posSum = new THREE.Vector3();
        var steer = new THREE.Vector3();
        for (var i = 0, il = boids.length; i < il; i++) {
            if (Math.random() > 0.6) continue;
            var boid = boids[i];
            var distance = boid.position.distanceTo(this.position);
            if (distance > 0 && distance <= _neighborhoodRadius) {
                posSum.add(boid.position);
                count++;
            }
        }
        if (count > 0) {
            posSum.divideScalar(count);
        }
        steer.subVectors(posSum, this.position);
        var l = steer.length();
        if (l > _maxSteerForce) {
            steer.divideScalar(l / _maxSteerForce);
        }
        return steer;
    };
    this.separation = function (boids) {
        var posSum = new THREE.Vector3();
        var repulse = new THREE.Vector3();
        for (var i = 0, il = boids.length; i < il; i++) {
            if (Math.random() > 0.6) continue;
            var boid = boids[i];
            var distance = boid.position.distanceTo(this.position);
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

AFRAME.registerComponent('birds', {
    schema: {
        attach: {default: true},
        count: {default: 6}
    },
    init: function () {
        let sceneEl = this.el.sceneEl;
        this.birds = [];
        this.boids = [];
        let boid, bird;

        for (var i = 0; i < this.data.count; i++) {
            boid = this.boids[i] = new Boid();
            boid.position.x = Math.random() * 40 - 20;
            boid.position.y = 10 + Math.random() * 10 - 5;
            boid.position.z = -20 + Math.random() * 10 - 5;
            boid.velocity.x = Math.random() * 2 - 1;
            boid.velocity.y = Math.random() * 2 - 1;
            boid.velocity.z = Math.random() * 2 - 1;
            // boid.setAvoidWalls(true);
            boid.setGoal(0, 10, -20);
            bird = this.birds[i] = new THREE.Mesh(new Bird(), new THREE.MeshBasicMaterial({
                color: Math.random() * 0xffffff,
                side: THREE.DoubleSide
            }));
            bird.phase = Math.floor(Math.random() * Math.PI);
            sceneEl.object3D.add(bird);
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
                bird.phase = ( bird.phase + ( Math.max(0, bird.rotation.z * 200) + 0.1 )) / 360 * Math.PI;
                bird.geometry.vertices[5].y = bird.geometry.vertices[4].y = Math.sin(bird.phase) * 0.2;
            }
        }
    }
});