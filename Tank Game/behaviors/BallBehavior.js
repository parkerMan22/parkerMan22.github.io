class BallBehavior extends Behavior {
  constructor() {
    super("Ball Behavior"); //Component name
    this.speed = 30;//Speed of the character
    this.direction = 1.5;
    this.hits = 0;
  }
  update(gameObject) {
    gameObject.transform.position.x += Math.cos(this.direction) * this.speed * Time.deltaTime;
    gameObject.transform.position.y += Math.sin(this.direction) * this.speed * Time.deltaTime;
  }
  onCollision(collider, gameObject, otherCollider, otherGameObject) {
    //console.log(this.hits++);

    //How to figure out the new direction of the ball?

    var x = Math.cos(this.direction);
    var y = Math.sin(this.direction);

    if (otherCollider.Geometry instanceof Circle) {
      var circleNormal = gameObject.transform.position.copy().subtract(otherGameObject.transform.position);
      circleNormal.normalize();
      var velocityVector = new Vector2(x, y);
      var scalar = 2 * velocityVector.dot(circleNormal);
      var reflectionVector = velocityVector.subtract(circleNormal.multiply(scalar));
      this.direction = Math.atan2(reflectionVector.y, reflectionVector.x);




      //console.log(circleNormal);
    }
    else if (otherCollider.Geometry instanceof AxisAlignedRectangle) {

      let newTransform1 = gameObject.transform.copy();
      newTransform1.position.x -= Math.cos(this.direction) * this.speed * Time.deltaTime;
      newTransform1.position.y -= Math.sin(this.direction) * this.speed * Time.deltaTime;
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
      this.direction = Math.atan2(reflectionVector.y, reflectionVector.x);

      this.direction += tempRotation;

      gameObject.transform.position.x += Math.cos(this.direction) * this.speed * Time.deltaTime;
      gameObject.transform.position.y += Math.sin(this.direction) * this.speed * Time.deltaTime;




      /*var rectangle = otherCollider.Geometry;

      if (rectangle.width > rectangle.height) {
        y *= -1;
      }
      else {
        x *= -1;
      }*/



      //this.direction = Math.atan2(y, x);

      //var rand = Math.random() * 2 - 1
      //rand *= .1;
      //this.direction += rand;
    }

  }
}