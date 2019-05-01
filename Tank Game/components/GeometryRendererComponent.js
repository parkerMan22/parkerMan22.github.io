class GeometryRendererComponent extends RendererComponent {
  constructor(color, geometry) {
    super()
    this.color;
    this.geometry;

    // Check the arguments. We expect exactly two. 
    // The first is a color
    // The second is a geometry

    this.color = color;
    this.geometry = geometry;
  }

  changeColor(color) {
    this.color = color;
  }

  render(ctx, gameObject) {

    ctx.fillStyle = this.color;

    if (this.geometry instanceof AxisAlignedRectangle) {
      let width = this.geometry.widthHeight.x;
      let height = this.geometry.widthHeight.y;

      let x = -width / 2;
      let y = -height / 2;

      ctx.fillRect(x, y, width, height);

    }
    else if (this.geometry instanceof Circle) {
      ctx.fillStyle = this.color;

      ctx.beginPath();
      ctx.ellipse(0, 0, this.geometry.radius, this.geometry.radius, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    else if (this.geometry instanceof Vector2) {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = .05;

      ctx.beginPath();
      ctx.moveTo(this.geometry.x - .25, 0);
      ctx.lineTo(this.geometry.y + .25, 0);
      ctx.moveTo(0, this.geometry.y + .25);
      ctx.lineTo(0, this.geometry.y - .25);
      ctx.stroke();     
    }
    else if(this.geometry instanceof Triangle){
      ctx.strokeStyle = this.color;
      ctx.lineWidth = .1;
      ctx.beginPath();
      ctx.moveTo(this.geometry.points[0].x, this.geometry.points[0].y);
      ctx.lineTo(this.geometry.points[1].x, this.geometry.points[1].y);
      ctx.lineTo(this.geometry.points[2].x, this.geometry.points[2].y);
      ctx.lineTo(this.geometry.points[0].x, this.geometry.points[0].y);
      ctx.stroke();

    }



  }
  get exposed (){return ["color"]}
}