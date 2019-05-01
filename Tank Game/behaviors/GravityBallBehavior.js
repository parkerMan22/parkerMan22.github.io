class GravityBallBehavior extends Behavior {
  constructor() {
    super("Ball Behavior"); //Component name
    
    this.hits = 0;
  }
  update(gameObject) {
    //gameObject.transform.position.x += Math.cos(this.direction) * this.speed * Time.deltaTime;
    //gameObject.transform.position.y += Math.sin(this.direction) * this.speed * Time.deltaTime;
  }
  onCollision(collider, gameObject, otherCollider, otherGameObject) {




    //console.log(this.hits++);

    //How to figure out the new direction of the ball?

    var x = Math.cos(gameObject.rigidBody.direction);
    var y = Math.sin(gameObject.rigidBody.direction);

    if (otherCollider.Geometry instanceof Circle) {
      var circleNormal = gameObject.transform.position.copy().subtract(otherGameObject.transform.position);
      circleNormal.normalize();
      var velocityVector = new Vector2(x, y);
      var scalar = 2 * velocityVector.dot(circleNormal);
      var reflectionVector = velocityVector.subtract(circleNormal.multiply(scalar));
      gameObject.rigidBody.direction = Math.atan2(reflectionVector.y, reflectionVector.x);




      //console.log(circleNormal);
    }
    else if (otherCollider.Geometry instanceof AxisAlignedRectangle) {

      let newTransform1 = gameObject.transform.copy();
      newTransform1.position.x -= Math.cos(gameObject.rigidBody.direction) * gameObject.rigidBody.velocity * Time.deltaTime;
      newTransform1.position.y -= Math.sin(gameObject.rigidBody.direction) * gameObject.rigidBody.velocity * Time.deltaTime;
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
      gameObject.rigidBody.direction = Math.atan2(reflectionVector.y, reflectionVector.x);

      //Dampen the velocity
      gameObject.rigidBody.velocity *=.95;

      gameObject.rigidBody.direction += tempRotation;

      gameObject.transform.position.x += Math.cos(gameObject.rigidBody.direction) * gameObject.rigidBody.velocity * Time.deltaTime;
      gameObject.transform.position.y += Math.sin(gameObject.rigidBody.direction) * gameObject.rigidBody.velocity * Time.deltaTime;




      
    }

  }
}