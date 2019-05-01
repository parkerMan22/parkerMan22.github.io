class GUITextComponent extends GUIRendererComponent {
  constructor(text, color, font) {
    super();
    this.text = text;
    this.color = color;
    this.font = font;
    this.justify = "center";

    if (!text || !color || !font)
      throw "GUITextComponent expects exactly three arguments in its constructor";

  }
  renderGUI(ctx, gameObject) {

    ctx.fillStyle = this.color;
    ctx.font = this.font;

    if (this.justify == "left")
      ctx.fillText(this.text, gameObject.transform.position.x, gameObject.transform.position.y);
    else if (this.justify == "center")
      ctx.fillText(this.text, gameObject.transform.position.x - ctx.measureText(this.text).width / 2, gameObject.transform.position.y);
    else //justify == "right"
      ctx.fillText(this.text, gameObject.transform.position.x - ctx.measureText(this.text).width, gameObject.transform.position.y);
  }
  get justification() {
    return this.justify;
  }
  set justificitation(j) {
    if (j != "left" || j != "center" || j != "right") {
      return console.log("Invalid justification string. The only valid values are 'left', 'center', and 'right'");
    }
    this.justify = j;
  }
  get exposed (){return ["text", "color", "font", "justify"]}
}