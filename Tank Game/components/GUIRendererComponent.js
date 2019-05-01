class GUIRendererComponent extends Component{
  constructor(){
    super();
  }
  renderGUI(ctx, gameObject){
    throw "All implementations of GUIRendererComponent must override render."
  }
}