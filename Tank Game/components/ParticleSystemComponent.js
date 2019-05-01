class ParticleSystemComponent extends Component{
  constructor(color){
    super();

    this.maxLife = .3;
    this.lifetime = 0;
    this.color = "red"
    if(color)
      this.color = color;

    this.particleBase = new GameObject("Particle");
    var geo  = new Circle(.1);
    this.particleBase.components.push(new GeometryComponent(geo));
    this.particleBase.components.push(new GeometryRendererComponent(this.color, geo))
    this.particleBase.renderer = this.particleBase.getComponent(GeometryRendererComponent);
    this.particleBase.components.push(new Collider(geo));


  }
  update(gameObject){
    console.log("ParticleSystemUpdate");
    let newParticle = this.particleBase.copy();
    newParticle.transform.position = gameObject.transform.position.copy();
    newParticle.components.push(new ParticleBehavior(Math.random()*2*Math.PI, 10));
    
    SceneManager.currentScene.instantiate(newParticle)

    this.lifetime += Time.deltaTime;
    if(this.lifetime > this.maxLife){
      SceneManager.currentScene.destroy(gameObject);
    }
  }
}