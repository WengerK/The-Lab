// anonyme
class Particle {

    constructor(scene_width, scene_height) {
        this._scene_width = scene_width;
        this._scene_height = scene_height;

        this._element = null;
        this.max_connectors = 2;
    }

    get element(){
        return this.create();
    }

    animate(){
        // console.log(particle.position.y + particle.velocity.y);
        // console.log(window.innerHeight*-1 / 2);

        this.bounce();

        this._element.position.x += this._element.velocity.x;
        this._element.position.y += this._element.velocity.y;
        this._element.position.z += this._element.velocity.z;

        this._element.rotation.x += 0.01;
        this._element.rotation.y += 0.01;


    }

    bounce(){
        // Bounce off the Bottom or Top
        if( (this._element.position.y + this._element.velocity.y) < -this._scene_height || (this._element.position.y + this._element.velocity.y) > this._scene_height ) {
          this._element.velocity.y *= -1;
        }

        // Bounce off the left or Right
        if( (this._element.position.x + this._element.velocity.x) < -this._scene_width || (this._element.position.x + this._element.velocity.x) > this._scene_width ) {
          this._element.velocity.x *= -1;
        }

        // Bounce off the deepth or roof
        if( (this._element.position.z + this._element.velocity.z) < -500 || (this._element.position.z + this._element.velocity.z) > 500 ) {
          this._element.velocity.z *= -1;
        }
    }

    connector(particles, lines, scene){
        var connected_to = 0;

        // Draw lines
        for (var y = 0; y < particles.length; y++) {
            if( connected_to >= this.max_connectors ) return '';

            var particle2 = particles[y]._element;
            var distance = this.distance_vector(this._element, particle2);

            if( distance > 50 && distance < 250){
                connected_to++;

                // material
                var material = new THREE.LineBasicMaterial( { color: '#c3c3c3', linewidth: 2, opacity: distance * 100 / 250 } );

                var geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3( this._element.position.x, this._element.position.y, this._element.position.z ));
                geometry.vertices.push(new THREE.Vector3( particle2.position.x, particle2.position.y, particle2.position.z ));

                // line
                var line = new THREE.Line( geometry,  material );
                lines.push(line);
                scene.add(line);
            }
        }
    }

    create(){
        var color = Math.random() * 0x808080 + 0x808080;
        var geometry = new THREE.DodecahedronGeometry( 50 );

        // for ( var i = 0; i < geometry.faces.length; i += 2 ) {
        //     var hex = Math.random() * 0xffffff;
        //     geometry.faces[ i ].color.setHex( hex );
        //     geometry.faces[ i + 1 ].color.setHex( hex );
        // }
        var material = new THREE.MeshLambertMaterial( { color: color } );
        // var material = new THREE.MeshBasicMaterial( {color: color} );
        this._element = new THREE.Mesh( geometry, material );

        this._element.position.x = Math.random() * 800 - 400;
        this._element.position.y = Math.random() * 800 - 400;
        this._element.position.z = Math.random() * 800 - 400;

        this._element.rotation.x = Math.random() * 2 * Math.PI;
        this._element.rotation.y = Math.random() * 2 * Math.PI;

        // Set velocity of particule
        this._element.velocity = new THREE.Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10);

        return this._element;
    }

    collide(){

    }

    distance_vector( v1, v2 ){
        var dx = v1.position.x - v2.position.x;
        var dy = v1.position.y - v2.position.y;
        var dz = v1.position.z - v2.position.z;

        return Math.sqrt( dx * dx + dy * dy + dz * dz );
    }
};
