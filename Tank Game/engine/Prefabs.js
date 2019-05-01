class Prefabs{
  static prefabs = [];
  constructor(){
    
  }
  static addPrefab(gameObject){
    Prefabs.prefabs.push(gameObject);
  }
  static getPrefabByName(name){
    for(let i = 0; i < Prefabs.prefabs.length; i++){
      if(Prefabs.prefabs[i].name == name)
        return Prefabs.prefabs[i].copy();
    }
  }
}

