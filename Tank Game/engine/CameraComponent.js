class CameraComponent extends Component{
  constructor(zoom, color){
    super();

    this.backgroundColor = color;
    this.zoom = zoom;
    this.target = null;
    this.screenUL = new Vector2(0,0);
    this.size = new Vector2(.25,.25);

  }
  get exposed (){return ["backgroundColor", "zoom", "target", "screenUL", "screenLR"]}
}