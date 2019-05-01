class RotatorBehavior extends Behavior {
  constructor() {
    super("Rotator Behavior")
    this.speed = .5;
  }
  update(gameObject) {
    gameObject.transform.rotation += this.speed * Time.deltaTime;
  }
}