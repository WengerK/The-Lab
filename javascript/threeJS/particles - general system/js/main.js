const BALLS = 60;
const LIGHTS = 25;

var container;
var camera, scene, renderer, particles, lines;
var lights;
var count = 0;

var MoveX = 0, MoveY = 0, MoveZ = 0;

var scene_width = window.innerWidth;
var scene_height = window.innerHeight;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function () {
        ondDeviceOrientation(event.alpha, event.beta, event.gamma);
    }, true);
} else if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function () {
        ondDeviceOrientation([event.acceleration.x * 2, event.acceleration.y * 2, event.acceleration.z * 2]);
    }, true);
} else {
    window.addEventListener("MozOrientation", function () {
        ondDeviceOrientation([orientation.x * 50, orientation.y * 50, orientation.z * 50]);
    }, true);
}


init();
animate();

function init() {
    container = document.getElementById('scene');
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.z = 1500;

    scene     = new THREE.Scene();
    particles = new Array();
    // lines     = new Array();
    lights     = new Array();

    for ( var i = 0; i < BALLS; i ++ ) {
        var particle  = new Particle(scene_width, scene_height);
        var element = particle.create();
		scene.add( element );
        particles.push( particle );
	}

    for ( var i = 0; i < LIGHTS; i ++ ) {
        var light  = new Light(scene_width, scene_height);
        var element = light.create();
        scene.add( element );
        lights.push( light );
	}

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( '#000' );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( scene_width, scene_height );
    container.appendChild( renderer.domElement );

    //
    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    // windowHalfX = window.innerWidth / 2;
    // windowHalfY = window.innerHeight / 2;
    // camera.aspect = window.innerWidth / window.innerHeight;
    // camera.updateProjectionMatrix();
    renderer.setSize( scene_width, scene_height );
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {

    // Move camera corresponding of mouse mouvment
    camera.position.x += ( MoveX - camera.position.x ) * .05;
    camera.position.y += ( -MoveY - camera.position.y ) * .05;
    if( MoveZ != 0 ){
        camera.position.z += ( -MoveZ - camera.position.z ) * .05;
    }
    camera.lookAt( scene.position );

    // Clean old connecotrs - used with particles[i].connector(particles, lines, scene); on the bottom
    // for (var i = 0; i < lines.length; i++) {
    //     scene.remove(lines[i]);
    // }

    for (var i = 0; i < particles.length; i++) {
        particles[i].animate();
        // Create connector between particles, too much lag
        // particles[i].connector(particles, lines, scene);
    }

    for (var i = 0; i < lights.length; i++) {
        lights[i].animate();
    }

    count++;

    // TWEEN.update();
    renderer.render( scene, camera );
}

function ondDeviceOrientation(beta, gamma, alpha){
    MoveX = (!beta ? 0 : beta) * Math.PI / 180 * 2000;
    MoveY = (!gamma  ? 0 : gamma) * Math.PI / 180 * 2000;
    MoveZ = (!alpha  ? 0 : alpha) * Math.PI / 180 * 500;
}

function onDocumentMouseMove(event) {
    MoveX = ( event.clientX - scene_width / 2 ) * 10;
    MoveY = ( event.clientY - scene_height / 2 ) * 10;
}
