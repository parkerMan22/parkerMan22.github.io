class ParticleBehavior extends Behavior{
  constructor(direction, speed){
    super();
    this.maxLife = .3;
    this.lifetime = 0;
    this.direction = direction;
    this.speed = speed;
  }
  start(){

  }
  update(gameObject){
    this.lifetime += Time.deltaTime;
    if(this.lifetime > this.maxLife){
      SceneManager.currentScene.destroy(gameObject);
    }
    gameObject.transform.position.x += Math.cos(this.direction) * this.speed * Time.deltaTime;
    gameObject.transform.position.y += Math.sin(this.direction) * this.speed * Time.deltaTime;

  }
}
