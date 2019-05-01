class Camera extends GameObject{
  constructor(zoom, color){
    super("Camera");
    
    this.cameraComponent = new CameraComponent(zoom, color);
    this.components.push(this.cameraComponent);
  }
  get zoom(){
    return this.getComponent(CameraComponent).zoom;
  }
  get backgroundColor(){
    return this.getComponent(CameraComponent).backgroundColor;
  }
}