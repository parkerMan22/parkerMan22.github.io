class GravityScene extends Scene {
  constructor() {
    super("Gravity Scene");
  }
  start() {
    this.camera = new Camera(20, "azure");// Add a camera game object
    this.camera.transform.position = new Vector2(1 / 2, 1 / 2); //Set its position
    this.hierarchy.push(this.camera);

    WallPrefab(this);

    var ball = new GameObject("Ball");
    ball.transform.position = new Vector2(0,0);
    var ballGeometry = new Circle(1);
    ball.components.push(new GeometryComponent(ballGeometry));
    let renderer = new GeometryRendererComponent("red", ballGeometry);
    ball.components.push(renderer);
    ball.renderer = renderer;
    ball.components.push(new GravityBallBehavior(this.hierarchy));
    let rigidBody = new RigidBodyComponent();
    ball.components.push(rigidBody);
    ball.rigidBody = rigidBody;
    ball.components.push(new Collider(ballGeometry));
    this.hierarchy.push(ball);


    NextPrefab(this);
  }

}