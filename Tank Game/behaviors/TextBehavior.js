class TextBehavior extends Behavior{
  constructor(){
    super();
    this.frames  = 0;
  }
  start(){

  }
  update(gameObject){
    this.frames++;
    let guiText = gameObject.getComponent(GUITextComponent);
    guiText.text = "P1: " +  SceneManager.currentScene.getGameObjectByName("GameController").getComponent(GameControllerBehavior).p1score + "                        P2: " + SceneManager.currentScene.getGameObjectByName("GameController").getComponent(GameControllerBehavior).p2score ;
  }
}