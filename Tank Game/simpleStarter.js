
//The behavior script for our main character
//var Time = {}                                     //Stores information about time that is available to our game
var msBetweenFrames = 1000 / 60;                //Time in milliseconds between frames
Time.deltaTime = msBetweenFrames / 1000;        //Time in seconds between frames.
var p1score = 0;
var p2score = 0;
//Setup the canvas variables
var canvas = document.getElementById("canv");
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

var width = canvas.width;
var height = canvas.height;


var globalCtx = canvas.getContext("2d");


var allScenes = [];

class SceneManager {
  static currentScene = {};

  static getSceneByName(name) {
    for (let i = 0; i < allScenes.length; i++) {
      if (allScenes[i].name == name)
        return allScenes[i];
    }
    return null;
  }
  static loadScene(scene) {
    SceneManager.currentScene = scene;
    console.log("Changing scene to " + scene.name);

    scene.hierarchy = [];
    updateListeners = [];
    scene.start(); //Start the main scene
    updateListeners.push(scene); //Have the scene listen to events

    //Tell the debugger about us if we are in debugging mode
    if (typeof app != "undefined") {
      app.loadScenes();
      app.changeSceneEvent(scene);
    }
  }
}



//Code to start the game
function main() {

  titleScene = new TitleScene();
  rectangleScene = new RectangleScene();
  circleScene = new CircleScene();
  endScene = new EndScene();

  titleScene.next = rectangleScene;
  rectangleScene.next = circleScene;
  endScene.next = titleScene;

  allScenes.push(titleScene);
   allScenes.push(rectangleScene);
   allScenes.push(circleScene);
  allScenes.push(endScene);

  //Setup our prefabs
  var ball = new GameObject("Ball");
  var ballGeometry = new Circle(1);
  ball.components.push(new GeometryComponent(ballGeometry));
  var renderer = new GeometryRendererComponent("red", ballGeometry);
  ball.components.push(renderer);
  ball.renderer = renderer;
  ball.components.push(new BallBehavior(this.hierarchy));
  ball.components.push(new Collider(ballGeometry));
  Prefabs.addPrefab(ball);

  ball = new GameObject("Bullet");
  ballGeometry = new Circle(.2);
  ball.components.push(new GeometryComponent(ballGeometry));
  renderer = new GeometryRendererComponent("yellow", ballGeometry);
  ball.components.push(renderer);
  ball.renderer = renderer;
  ball.components.push(new BulletBehavior(this.hierarchy));
  ball.components.push(new Collider(ballGeometry));
  Prefabs.addPrefab(ball);

  ball = new GameObject("BadBullet");
  ballGeometry = new Circle(.1);
  ball.components.push(new GeometryComponent(ballGeometry));
  renderer = new GeometryRendererComponent("azure", ballGeometry);
  ball.components.push(renderer);
  ball.renderer = renderer;
  ball.components.push(new BadBulletBehavior(this.hierarchy));
  ball.components.push(new Collider(ballGeometry));
  Prefabs.addPrefab(ball);

  var ball = new GameObject("Baddie");
  var ballGeometry = new Circle(.5);
  ball.components.push(new GeometryComponent(ballGeometry));
  renderer = new GeometryRendererComponent("red", ballGeometry);
  ball.components.push(renderer);
  ball.renderer = renderer;
  ball.components.push(new BaddieBehavior(this.hierarchy));
  ball.components.push(new Collider(ballGeometry));
  Prefabs.addPrefab(ball);

  var Tank = new GameObject("Tank1", "tank");
  Tank.transform.position = new Vector2(-7, 7);
  Tank.transform.rotation = 0;
  var TankGeometry = new AxisAlignedRectangle(1, 1);
  Tank.components.push(new GeometryComponent(TankGeometry));
  var TankRenderer = new GeometryRendererComponent("blue", TankGeometry);
  Tank.components.push(TankRenderer);
  Tank.renderer = TankRenderer;
  Tank.components.push(new Collider(TankGeometry));
  Tank.components.push(new MainPlayer());
  Prefabs.addPrefab(Tank);

  var Tank = new GameObject("Tank2", "tank");
  Tank.transform.position = new Vector2(7, -7);
  Tank.transform.rotation = 0;
  var TankGeometry = new AxisAlignedRectangle(1, 1);
  Tank.components.push(new GeometryComponent(TankGeometry));
  var TankRenderer = new GeometryRendererComponent("red", TankGeometry);
  Tank.components.push(TankRenderer);
  Tank.renderer = TankRenderer;
  Tank.components.push(new Collider(TankGeometry));
  Tank.components.push(new SecondPlayer());
  Prefabs.addPrefab(Tank);

  //
    this.color = "red";
    this.addOn = 0;

  var wall = new GameObject("WallT", "wall");
    wall.transform.position = new Vector2(0, 9.5 + this.addOn);
    var wallGeometry = new AxisAlignedRectangle(20, 1);
    wall.components.push(new GeometryComponent(wallGeometry));
    var wallRenderer = new GeometryRendererComponent(this.color, wallGeometry);
    wall.components.push(wallRenderer);
    wall.renderer = wallRenderer;
    wall.components.push(new Collider(wallGeometry));
    Prefabs.addPrefab(wall);                                                 //Replace this. with scene.

    var wall = new GameObject("WallB", "wall");
    wall.transform.position = new Vector2(0, -9.5 - this.addOn);
    var wallGeometry = new AxisAlignedRectangle(20, 1);
    wall.components.push(new GeometryComponent(wallGeometry));
    var wallRenderer = new GeometryRendererComponent(this.color, wallGeometry);
    wall.components.push(wallRenderer);
    wall.renderer = wallRenderer;
    wall.components.push(new Collider(wallGeometry));
    Prefabs.addPrefab(wall); 

    var wall = new GameObject("WallL", "wall");
    wall.transform.position = new Vector2(10 + this.addOn, 0);
    var wallGeometry = new AxisAlignedRectangle(1, 20);
    wall.components.push(new GeometryComponent(wallGeometry));
    var wallRenderer = new GeometryRendererComponent(this.color, wallGeometry);
    wall.components.push(wallRenderer);
    wall.renderer = wallRenderer;
    wall.components.push(new Collider(wallGeometry));
    Prefabs.addPrefab(wall); 

    var wall = new GameObject("WallR", "wall");
    wall.transform.position = new Vector2(-10 - this.addOn, 0);
    var wallGeometry = new AxisAlignedRectangle(1, 20);
    wall.components.push(new GeometryComponent(wallGeometry));
    var wallRenderer = new GeometryRendererComponent(this.color, wallGeometry);
    wall.components.push(wallRenderer);
    wall.renderer = wallRenderer;
    wall.components.push(new Collider(wallGeometry));
    Prefabs.addPrefab(wall); 
  //

  var particleSystem = new GameObject("ParticleSystem");
  var particleSystemComponent = new ParticleSystemComponent();
  particleSystem.components.push(particleSystemComponent);
  Prefabs.addPrefab(particleSystem);



  SceneManager.loadScene(titleScene);

  setInterval(timer, msBetweenFrames);  //Start the main timer to be called 30 times a second (every 33.3ms)


}
