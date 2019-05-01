class BaddieBehavior extends Behavior{
  constructor(){
    super();
    this.fireTimer = Math.random();
    this.fireRate = 2;
    this.ySpeed = 1;
    this.xRange = 10;
    this.totalTime = 0;

  }
  start(){

  }
  update(gameObject){
    this.fireTimer += Time.deltaTime;
    this.totalTime += Time.deltaTime;

    gameObject.transform.position.y += this.ySpeed * Time.deltaTime
    gameObject.transform.position.x += Math.cos(this.totalTime) * this.xRange * Time.deltaTime;

    if(this.fireTimer > this.fireRate){
      this.fireTimer =  Math.random() ;
      SceneManager.currentScene.instantiate(Prefabs.getPrefabByName("BadBullet"), gameObject.transform.position.copy());
    }

  }
}