class BulletBehavior extends Behavior{
  constructor(){
    super();
    this.speed = 10;
    this.hits = 0;
    this.counter = 0;
    this.lifeSpan = 225;
  }
  start(){

  }
  update(gameObject){
    this.counter++;
    if (this.counter >= this.lifeSpan)
    {
      SceneManager.currentScene.destroy(gameObject);
      this.counter = 0;
    }
    gameObject.transform.position.x += Math.cos(gameObject.transform.rotation) * this.speed * Time.deltaTime;
    gameObject.transform.position.y += Math.sin(gameObject.transform.rotation) * this.speed * Time.deltaTime;
    //gameObject.transform.position.y += this.speed * Time.deltaTime;
  }
  
  onCollision(collider, gameObject, otherCollider, otherGameObject) {
    this.hits++;
    if (this.hits >= 3) {
      SceneManager.currentScene.destroy(gameObject);
      this.counter = 0;
      this.hits = 0;
    }

    if(otherGameObject.name == "Tank1")
    {
      SceneManager.currentScene.getGameObjectByName("GameController").getComponent(GameControllerBehavior).destroyMainCharacter(otherGameObject);
    }
    if(otherGameObject.name == "Tank2")
    {
      SceneManager.currentScene.getGameObjectByName("GameController").getComponent(GameControllerBehavior).destroyOtherCharacter(otherGameObject);
    }

    if(otherGameObject.name == "Baddie")
    {
      SceneManager.currentScene.instantiate(Prefabs.getPrefabByName("ParticleSystem"), otherGameObject.transform.position)
      SceneManager.currentScene.destroy(otherGameObject);
      SceneManager.currentScene.getGameObjectByName("GameController").getComponent(GameControllerBehavior).score++;
    }
    var x = Math.cos(gameObject.transform.rotation);
    var y = Math.sin(gameObject.transform.rotation);

    if (otherCollider.Geometry instanceof Circle) {
      var circleNormal = gameObject.transform.position.copy().subtract(otherGameObject.transform.position);
      circleNormal.normalize();
      var velocityVector = new Vector2(x, y);
      var scalar = 2 * velocityVector.dot(circleNormal);
      var reflectionVector = velocityVector.subtract(circleNormal.multiply(scalar));
      gameObject.transform.rotation = Math.atan2(reflectionVector.y, reflectionVector.x);

      //console.log(circleNormal);
    }
    else if (otherCollider.Geometry instanceof AxisAlignedRectangle) {

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
  }
}