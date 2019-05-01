class GUIRectangleComponent extends GUIRendererComponent{
  constructor(axisAlignedRectangle, color){
    super()
    if(!axisAlignedRectangle || !color)
      throw "GUIRectangleComponent expects a constructor with two arguments";
    this.axisAlignedRectangle = axisAlignedRectangle;
    this.color = color;
    
  }
  renderGUI(ctx, gameObject){

    let x;
    let y;
    let width;
    let height;

    x = gameObject.transform.position.x;
    y = gameObject.transform.position.y;
    width = this.axisAlignedRectangle.widthHeight.x;
    height = this.axisAlignedRectangle.widthHeight.y;

    ctx.fillStyle = this.color;
    ctx.fillRect(x,y,width,height);
  }
  get exposed (){return ["color"]}
}