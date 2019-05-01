class CircleScene extends Scene{
  constructor(){
    super("Circle Scene");
  }
  start(){
    this.camera = new Camera(20, "azure");// Add a camera game object
    this.camera.transform.position = new Vector2(1 / 2, 1 / 2); //Set its position
    this.hierarchy.push(this.camera);

    WallPrefab(this);

    var circleGO = new GameObject("Circle");
    circleGO.transform.position = new Vector2(4, 4);
    circleGO.transform.rotation = 0;
    var circleGeometry = new Circle(4);
    circleGO.components.push(new GeometryComponent(circleGeometry));
    var wallRenderer = new GeometryRendererComponent("black", circleGeometry);
    circleGO.components.push(wallRenderer);
    circleGO.renderer = wallRenderer;
    circleGO.components.push(new Collider(circleGeometry));
    //wall.components.push(new RotatorBehavior());
    this.hierarchy.push(circleGO);

    this.instantiate(Prefabs.getPrefabByName("Tank1"), new Vector2(0,-4));
    SceneManager.currentScene.getGameObjectByName("Tank1").getComponent(GeometryRendererComponent).changeColor("steelBlue");

    this.instantiate(Prefabs.getPrefabByName("Baddie"), new Vector2(0, 4));

    //Wall Prefab, change colors
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
    
    var emptyObject = new GameObject("GameController");
    emptyObject.components.push(new GameControllerBehavior());
    this.hierarchy.push(emptyObject);
  }
}