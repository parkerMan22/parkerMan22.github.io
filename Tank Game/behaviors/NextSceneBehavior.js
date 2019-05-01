class NextSceneBehavior extends Behavior{
  constructor(nextScene){
    super("Next Scene Behavior");
    this.nextScene = nextScene;
  }
  OnKeyDown(gameObject, key){
    console.log(key);
    if(key==" ")
      SceneManager.loadScene(this.nextScene);
  }
}