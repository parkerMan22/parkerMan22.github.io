function BallPrefab(scene, location){
  var ball = new GameObject("Ball");
  ball.transform.position = location;
  var ballGeometry = new Circle(1);
  // var ballGeometry = new Vector2();
  ball.components.push(new GeometryComponent(ballGeometry));
  let renderer = new GeometryRendererComponent("red", ballGeometry);
  ball.components.push(renderer);
  ball.renderer = renderer;
  ball.components.push(new BallBehavior(this.hierarchy));
  ball.components.push(new Collider(ballGeometry));
  scene.hierarchy.push(ball);
}