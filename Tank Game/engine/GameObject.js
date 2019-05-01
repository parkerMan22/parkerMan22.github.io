//A generic GameObject class
class GameObject{
  constructor(name, tag){
    this.transform = new Transform();
    this.components = [];
    this.name = name;
    this.isStatic = false;

    if(tag == null) {
      this.tag = "None";
    } else
    {
      this.tag = tag;
    }
    
  }
  render(ctx) {
    if(this.renderer){
      this.renderer.render(ctx, this);
    }
  }
  renderGUI(ctx){
    if(this.rendererGUI){
      this.rendererGUI.renderGUI(ctx,this);
    }
  }
  getComponent(type){
    for(let i = 0; i < this.components.length; i++){
      let component = this.components[i];
      if(component instanceof type){
        return component;
      }
    }
    return undefined;
  }
  copy(){
    let toReturn = _.cloneDeep(this);
    return toReturn;
  }
}