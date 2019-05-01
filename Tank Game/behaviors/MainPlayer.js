class MainPlayer extends Behavior{
  constructor(){
    super();
    this.speed = 10;
    this.turnSpeed = 3;
    this.score = 0;
    this.direction = 0;

    this.coolDown = 0;
    this.canShoot = 50;
  }
  start(){

  }
  update(gameObject){
    this.coolDown++;
    gameObject.transform.rotation = this.direction;//
    if (keys["a"]) {
      this.direction += this.turnSpeed * Time.deltaTime;
    }
    if (keys["d"]) {
      //gameObject.transform.rotation += this.turnSpeed * Time.deltaTime;
      this.direction -= this.turnSpeed * Time.deltaTime;
    }

    if (keys["w"]) {
      gameObject.transform.position.x += Math.cos(this.direction) * this.speed / 2 * Time.deltaTime;
      gameObject.transform.position.y += Math.sin(this.direction) * this.speed / 2 * Time.deltaTime;
     
    }
    if (keys["s"]) {
      gameObject.transform.position.x -= Math.cos(this.direction) * this.speed / 3 * Time.deltaTime;
      gameObject.transform.position.y -= Math.sin(this.direction) * this.speed / 3 * Time.deltaTime;
    }
    gameObject.transform.rotation = this.direction;

  }
  OnKeyDown(gameObject, key){
    if(key == "f")
    {
      if(this.coolDown >= this.canShoot)
      {
        this.x = Math.cos(this.direction) * 1.5;
        this.y = Math.sin(this.direction) * 1.5; 
        //Cooldowned enough, can now shoot
        SceneManager.currentScene.instantiate(Prefabs.getPrefabByName("Bullet"), new Vector2(gameObject.transform.position.copy().x + this.x, gameObject.transform.position.copy().y + this.y), this.direction);
        //BallPrefab(this.scene, this.direction, gameObject.transform.position.copy().x + this.x, gameObject.transform.position.copy().y + this.y);
        //Can't shoot yet?
        this.coolDown = 0;
        }
      
    }

  }
  onCollision(collider, gameObject, otherCollider, otherGameObject) {
    this.x = Math.cos(this.direction);
    this.y = Math.sin(this.direction);
    this.bumpAmount = .25;
    if(otherGameObject.name == "WallT" || gameObject.name == "WallT")
      {
        console.log(otherGameObject.name + " hit " + gameObject.name);
        gameObject.transform.position.y -= this.bumpAmount;
      }
      if(otherGameObject.name == "WallB")
      {
        gameObject.transform.position.y += this.bumpAmount;
      }
      if(otherGameObject.name == "WallL")
      {
        gameObject.transform.position.x -= this.bumpAmount;
      }
      if(otherGameObject.name == "WallR")
      {
        gameObject.transform.position.x += this.bumpAmount;
      }

    if (otherCollider.Geometry instanceof Circle) {
      /*var circleNormal = gameObject.transform.position.copy().subtract(otherGameObject.transform.position); //Our location minus center of circle position
      circleNormal.normalize();
      var velocityVector = new Vector2(this.x, this.y);
      var scalar = 2 * velocityVector.dot(circleNormal);
      var reflectionVector = velocityVector.subtract(circleNormal.multiply(scalar));;
      this.direction = Math.atan2(reflectionVector.y, reflectionVector.x);*/
      if (keys["w"])
      {
        gameObject.transform.position.x += -Math.cos(this.direction) * this.speed * Time.deltaTime;
        gameObject.transform.position.y += -Math.sin(this.direction) * this.speed * Time.deltaTime;
      } 
      if (keys["s"]){
        //this.speed *= -1;
        gameObject.transform.position.x += Math.cos(this.direction) * this.speed * Time.deltaTime;
        gameObject.transform.position.y += Math.sin(this.direction) * this.speed * Time.deltaTime;
      }

    } else if (otherCollider.Geometry instanceof AxisAlignedRectangle) {


      this.x = Math.cos(this.direction);
      this.y = Math.sin(this.direction);

        let newTransform1 = gameObject.transform.copy();
        newTransform1.position.x -= Math.cos(gameObject.transform.rotation) * this.speed * Time.deltaTime;
        newTransform1.position.y -= Math.sin(gameObject.transform.rotation) * this.speed * Time.deltaTime;
        newTransform1.position.subtract(otherGameObject.transform.position);
        let newTransform2 = otherGameObject.transform.copy();
        newTransform2.position.subtract(otherGameObject.transform.position);
  
  
  
  
        var tempRotation = newTransform2.rotation;
        newTransform1.position.rotate(-newTransform2.rotation);
        newTransform2.rotation = 0;
  
        //My axis aligned rectangle is now centered about the origin and is not rotated at all.
        var x = Math.cos(gameObject.transform.rotation);
        var y = Math.sin(gameObject.transform.rotation);
        var newX = newTransform1.position.x / otherCollider.Geometry.width;
        var newY = newTransform1.position.y / otherCollider.Geometry.height;
        var normal = new Vector2(newX, newY);
        if (Math.abs(normal.x) < Math.abs(normal.y)) {
          normal.x = 0;
        }
        else {
          normal.y = 0;
        }
        normal.normalize();
  
        var velocityVector = new Vector2(x, y);
        velocityVector.rotate(-tempRotation);
        var scalar = 2 * velocityVector.dot(normal);
        var reflectionVector = velocityVector.subtract(normal.multiply(scalar));
        gameObject.transform.rotation = Math.atan2(reflectionVector.y, reflectionVector.x);
  
        gameObject.transform.rotation += tempRotation;
  
        gameObject.transform.position.x += Math.cos(gameObject.transform.rotation) * this.speed * Time.deltaTime;
        gameObject.transform.position.y += Math.sin(gameObject.transform.rotation) * this.speed * Time.deltaTime;
      }

      /*if (rectangle.width > rectangle.height) {
        gameObject.transform.position.y *= Math.sin(this.direction) * this.speed * Time.deltaTime;
      }
      else {
        gameObject.transform.position.x *= Math.cos(this.direction) * this.speed * Time.deltaTime;
      }*/

     else if (otherCollider.Geometry instanceof Vector2) {
      console.log("In a collision with Vector");
      this.x = Math.cos(this.direction);
      this.y = Math.sin(this.direction);

    }
    else { console.log("Nope");}

    //var object = otherCollider.Geometry;

    /*let x = gameObject.transform.position.x + -otherGameObject.transform.position.x;
    let y = gameObject.transform.position.y + -otherGameObject.transform.position.y;

    let triangle = gameObject.getComponent(GeometryComponent).Geometry;
    let line1 = new Line(triangle.points[0], triangle.points[1]);
    let line2 = new Line(triangle.points[1], triangle.points[2]);
    let line3 = new Line(triangle.points[2], triangle.points[0]);
    let result1 = line1.a * x + line1.b * y + line1.c;
    let result2 = line2.a * x + line2.b * y + line2.c;
    let result3 = line3.a * x + line3.b * y + line3.c;
    if(result1 > 0 && result2 > 0 && result3 >0){
      console.log("BOOM");
      this.x = 0;
      this.y = 0;
    }*/
    
    //this.direction = Math.atan2(this.y,this.x);

  }
}