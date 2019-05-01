//The main scene in our game
class RectangleScene extends Scene {
  constructor() {
    super("Arena 1"); //The name of our scene
  }
  start() {
    this.camera = new Camera(20, "olivedrab");// Add a camera game object
    this.camera.transform.position = new Vector2(1 / 2, 1 / 2); //Set its position
    this.hierarchy.push(this.camera);

    var guiText = new GameObject("GUI Text");
    var textComponent = new GUITextComponent("Physics Test Game.", "white", "30px Arial");
    textComponent.justify = "center";
    guiText.components.push(textComponent);
    guiText.rendererGUI = textComponent;
    guiText.transform.position = new Vector2(width / 2, 100);
    var textBehavior = new TextBehavior();
    guiText.components.push(textBehavior);
    this.hierarchy.push(guiText);

    
    this.instantiate(Prefabs.getPrefabByName("Tank1"));
    SceneManager.currentScene.getGameObjectByName("Tank1").getComponent(GeometryRendererComponent).changeColor("mediumblue");

    this.instantiate(Prefabs.getPrefabByName("Tank2"));
    SceneManager.currentScene.getGameObjectByName("Tank2").getComponent(GeometryRendererComponent).changeColor("firebrick");

    //this.instantiate(Prefabs.getPrefabByName("Baddie"), new Vector2(0, 4));

    {//Obstacles / inner walls
    var wall = new GameObject("VeritcalTopRight");
    wall.transform.position = new Vector2(5, 4);
    wall.transform.rotation = 0;
    var wallGeometry = new AxisAlignedRectangle(1, 4);
    wall.components.push(new GeometryComponent(wallGeometry));
    var wallRenderer = new GeometryRendererComponent("dimgray", wallGeometry);
    wall.components.push(wallRenderer);
    wall.renderer = wallRenderer;
    wall.components.push(new Collider(wallGeometry));
    wall.components.push(new RotatorBehavior());
    this.hierarchy.push(wall);

    var wall = new GameObject("HorizontlTop");
    wall.transform.position = new Vector2(-1, 6);
    wall.transform.rotation = 0;
    var wallGeometry = new AxisAlignedRectangle(5, 1);
    wall.components.push(new GeometryComponent(wallGeometry));
    var wallRenderer = new GeometryRendererComponent("dimgray", wallGeometry);
    wall.components.push(wallRenderer);
    wall.renderer = wallRenderer;
    wall.components.push(new Collider(wallGeometry));
    //wall.components.push(new RotatorBehavior());
    this.hierarchy.push(wall);

    var wall = new GameObject("VerticalBotLeft");
    wall.transform.position = new Vector2(-5, -4);
    wall.transform.rotation = 0;
    var wallGeometry = new AxisAlignedRectangle(1, 4);
    wall.components.push(new GeometryComponent(wallGeometry));
    var wallRenderer = new GeometryRendererComponent("dimgray", wallGeometry);
    wall.components.push(wallRenderer);
    wall.renderer = wallRenderer;
    wall.components.push(new Collider(wallGeometry));
    wall.components.push(new RotatorBehavior());
    this.hierarchy.push(wall);

    var wall = new GameObject("HorizontalBot");
    wall.transform.position = new Vector2(1, -6);
    wall.transform.rotation = 0;
    var wallGeometry = new AxisAlignedRectangle(5, 1);
    wall.components.push(new GeometryComponent(wallGeometry));
    var wallRenderer = new GeometryRendererComponent("dimgray", wallGeometry);
    wall.components.push(wallRenderer);
    wall.renderer = wallRenderer;
    wall.components.push(new Collider(wallGeometry));
    //wall.components.push(new RotatorBehavior());
    this.hierarchy.push(wall);

    var wall = new GameObject("MidSquare");
    wall.transform.position = new Vector2(0, 0);
    wall.transform.rotation = 0;
    var wallGeometry = new AxisAlignedRectangle(4, 4);
    wall.components.push(new GeometryComponent(wallGeometry));
    var wallRenderer = new GeometryRendererComponent("dimgray", wallGeometry);
    wall.components.push(wallRenderer);
    wall.renderer = wallRenderer;
    wall.components.push(new Collider(wallGeometry));
    //wall.components.push(new RotatorBehavior());
    this.hierarchy.push(wall);

    var circleGO = new GameObject("CircleTL");
    circleGO.transform.position = new Vector2(-6, 3);
    circleGO.transform.rotation = 0;
    var circleGeometry = new Circle(1.5);
    circleGO.components.push(new GeometryComponent(circleGeometry));
    var wallRenderer = new GeometryRendererComponent("dimgrey", circleGeometry);
    circleGO.components.push(wallRenderer);
    circleGO.renderer = wallRenderer;
    circleGO.components.push(new Collider(circleGeometry));
    //wall.components.push(new RotatorBehavior());
    this.hierarchy.push(circleGO);

    var circleGO = new GameObject("CircleTL");
    circleGO.transform.position = new Vector2(6, -3);
    circleGO.transform.rotation = 0;
    var circleGeometry = new Circle(1.5);
    circleGO.components.push(new GeometryComponent(circleGeometry));
    var wallRenderer = new GeometryRendererComponent("dimgrey", circleGeometry);
    circleGO.components.push(wallRenderer);
    circleGO.renderer = wallRenderer;
    circleGO.components.push(new Collider(circleGeometry));
    //wall.components.push(new RotatorBehavior());
    this.hierarchy.push(circleGO);
    }
    
    {//Wall Prefab, change colors
      this.wall1 = this.instantiate(Prefabs.getPrefabByName("WallT"));
      this.wall1 = this.instantiate(Prefabs.getPrefabByName("WallB"));
      this.wall1 = this.instantiate(Prefabs.getPrefabByName("WallL"));
      this.wall1 = this.instantiate(Prefabs.getPrefabByName("WallR"));

      let list = SceneManager.currentScene.findByTag("wall");
      for (var i = 0; i < list.length; i++) {
        var gameObject = list[i];
        console.log(gameObject.name + " colored: " + gameObject.color);
        gameObject.getComponent(GeometryRendererComponent).changeColor("dimgray");
      }
    }
    
    var emptyObject = new GameObject("GameController");
    emptyObject.components.push(new GameControllerBehavior());
    this.hierarchy.push(emptyObject);
  }
}