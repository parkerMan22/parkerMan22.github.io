function NextPrefab(scene){
  var empty = new GameObject();
  var nextSceneBehavior = new NextSceneBehavior(scene.next);
  empty.components.push(nextSceneBehavior);
  scene.hierarchy.push(empty);
}