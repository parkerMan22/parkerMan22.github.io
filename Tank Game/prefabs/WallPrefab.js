function WallPrefab(scene){
    var wall = new GameObject("Wall");
    wall.isStatic = true;
    wall.transform.position = new Vector2(0, 11);
    var wallGeometry = new AxisAlignedRectangle(24 , 2);
    wall.components.push(new GeometryComponent(wallGeometry));
    var wallRenderer = new GeometryRendererComponent("blue", wallGeometry);
    wall.components.push(wallRenderer);
    wall.renderer = wallRenderer;
    wall.components.push(new Collider(wallGeometry));
    scene.hierarchy.push(wall);

    var wall = new GameObject("Wall2");
    wall.isStatic = true;
    wall.transform.position = new Vector2(0, -11);
    var wallGeometry = new AxisAlignedRectangle(24 ,2);
    wall.components.push(new GeometryComponent(wallGeometry));
    var wallRenderer = new GeometryRendererComponent("blue", wallGeometry);
    wall.components.push(wallRenderer);
    wall.renderer = wallRenderer;
    wall.components.push(new Collider(wallGeometry));
    scene.hierarchy.push(wall);

    var wall = new GameObject("Wall3");
    wall.isStatic = true;
    wall.transform.position = new Vector2(11, 0);
    var wallGeometry = new AxisAlignedRectangle(2, 20);
    wall.components.push(new GeometryComponent(wallGeometry));
    var wallRenderer = new GeometryRendererComponent("blue", wallGeometry);
    wall.components.push(wallRenderer);
    wall.renderer = wallRenderer;
    wall.components.push(new Collider(wallGeometry));
    scene.hierarchy.push(wall);

    var wall = new GameObject("Wall4");
    wall.isStatic=true;
    wall.transform.position = new Vector2(-11, 0);
    var wallGeometry = new AxisAlignedRectangle(2, 20);
    wall.components.push(new GeometryComponent(wallGeometry));
    var wallRenderer = new GeometryRendererComponent("blue", wallGeometry);
    wall.components.push(wallRenderer);
    wall.renderer = wallRenderer;
    wall.components.push(new Collider(wallGeometry));
    scene.hierarchy.push(wall);
}