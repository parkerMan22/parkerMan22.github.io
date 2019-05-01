class RigidBodyComponent extends Component{
  constructor(){
    super();
    this.direction = 0;
    this.velocity = 0;
  }
  update(gameObject){

    let xVelocity = Math.cos(this.direction) * this.velocity;
    let yVelocity = Math.sin(this.direction) * this.velocity;

    yVelocity -= 9.8 * Time.deltaTime;  //Gravity constant in meters/s^2
                                        //Use 32 ft/s^2 if you are using ft

    gameObject.transform.position.x += xVelocity * Time.deltaTime;
    gameObject.transform.position.y += yVelocity * Time.deltaTime;

    this.direction = Math.atan2(yVelocity, xVelocity);
    this.velocity = new Vector2(xVelocity, yVelocity).length;


  }
  get exposed (){return ["direction", "velocity"]}
}
