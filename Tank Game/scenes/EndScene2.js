class EndScene extends Scene{
  constructor(){
    super("P2 Won");    
  }
  start(){
    this.hierarchy = [];

    this.camera = new Camera(20, "dimgray");// Add a camera game object
    this.camera.transform.position = new Vector2(1 / 2, 1 / 2); //Set its position


    //Push all our game objects into the scene
    this.hierarchy.push(this.camera);

    var guiText = new GameObject("GUI Text");
    var textComponent = new GUITextComponent("Player 2 Won!", "firebrick", "50px Arial Bold");
    textComponent.justify = "center";
    guiText.components.push(textComponent);
    guiText.rendererGUI = textComponent;
    guiText.transform.position = new Vector2(width / 2, height / 2);

    this.hierarchy.push(guiText);

    guiText = new GameObject("GUI Text 2");
    textComponent = new GUITextComponent("Press Space to Continue", "silver", "30px Arial");
    textComponent.justify = "center";
    guiText.components.push(textComponent);
    guiText.rendererGUI = textComponent;
    guiText.transform.position = new Vector2(width / 2, height / 2 + 50);
    this.hierarchy.push(guiText);

    //Wall Prefab, change colors
    this.wall1 = this.instantiate(Prefabs.getPrefabByName("WallT"));
    this.wall1 = this.instantiate(Prefabs.getPrefabByName("WallB"));
    this.wall1 = this.instantiate(Prefabs.getPrefabByName("WallL"));
    this.wall1 = this.instantiate(Prefabs.getPrefabByName("WallR"));

    let list = SceneManager.currentScene.findByTag("wall");
    for (var i = 0; i < list.length; i++) {
      var gameObject = list[i];
      console.log(gameObject.name + " colored: " + gameObject.color);
      gameObject.getComponent(GeometryRendererComponent).changeColor("firebrick");
    }

    p1score = 0;
    p2score = 0;
    
    NextPrefab(this);
  }

}