// anonyme
class Light {

    constructor(scene_width, scene_height) {
        this._scene_width = scene_width;
        this._scene_height = scene_height;

        // this.clock = new THREE.Clock();
        this._element = null;
    }

    get element(){
        return this._element;
    }

    animate(){
        // var delta = this.clock.getDelta();
        var  time = Date.now() * 0.0005;

        this.bounce();

        this._element.position.x += this._element.velocity.x;
        this._element.position.y += this._element.velocity.y;
        this._element.position.z += this._element.velocity.z;

        // this._element.position.x = Math.sin( time * 0.7 ) * this._element.velocity.x;
        // this._element.position.y = Math.cos( time * 0.5 ) * this._element.velocity.y;
        // this._element.position.z = Math.cos( time * 0.3 ) * this._element.velocity.z;

    }

    create(){
        var color = Math.random() * 0x808080 + 0x808080;
        var geometry = new THREE.DodecahedronGeometry( 50 );

        var sphere = new THREE.SphereGeometry( 20, 16, 8 );
        this._element = new THREE.PointLight( color, 10, 400 );
        this._element.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: '#000' } ) ) );

        this._element.position.x = Math.random() * 800 - 400;
        this._element.position.y = Math.random() * 800 - 400;
        this._element.position.z = Math.random() * 800 - 400;

        // Set velocity of particule
        this._element.velocity = new THREE.Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10);

        // this._element.velocity = new THREE.Vector3(
        //     Math.random() * 1200 - 400,
        //     Math.random() * 1200 - 400,
        //     Math.random() * 1200 - 400
        // );

        return this._element;
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


};
