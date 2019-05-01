class Scene {
  constructor(name) {
    this.hierarchy = [];
    this.name = name;
    this.playing = true;
    this.canvases = []; //For deferred rendering

  }
  start() {
    this.hierarchy = [];

    updateListeners.push(this);
    this.playing = true;

  }
  update() {
    if (!this.playing) return;
    //Run through our built-in physics engine
    for (let i = 0; i < this.hierarchy.length; i++) {
      let goI = this.hierarchy[i]; //The game object at index i;
      let iColliders = []; //Store the colliders in i
      for (let ci = 0; ci < goI.components.length; ci++) {
        let iComponent = goI.components[ci];
        if (iComponent instanceof Collider) {
          iColliders.push(iComponent);
        }
      }

      //If goI doen't have any colliders, we can continue
      if (iColliders.length == 0) continue;

      for (let j = i + 1; j < this.hierarchy.length; j++) {
        //Get all the colliders on both game objects
        let goJ = this.hierarchy[j]; //The game object at index j;

        if (goI.isStatic && goJ.isStatic) continue; //No need to do collisions with two static objects

        let jColliders = [];

        for (let cj = 0; cj < goJ.components.length; cj++) {
          let jComponent = goJ.components[cj];
          if (jComponent instanceof Collider) {
            jColliders.push(jComponent);
          }
        }

        if (jColliders.length == 0) continue;


        //Now loop over the colliders to see if they are in collision
        for (let ci = 0; ci < iColliders.length; ci++) {
          for (let cj = 0; cj < jColliders.length; cj++) {
            let iCollider = iColliders[ci];
            let jCollider = jColliders[cj];
            //console.log(" " );
            if (this.inCollision(iCollider.Geometry, goI.transform, jCollider.Geometry, goJ.transform)) {
              //Send an event to I
              for (let ib = 0; ib < goI.components.length; ib++) {
                let component = goI.components[ib];
                if (component instanceof Behavior) {
                  if (typeof component.onCollision === "function")
                    component.onCollision(iCollider, goI, jCollider, goJ);
                }
              }

              //Send an event to J
              for (let jb = 0; jb < goJ.components.length; jb++) {
                let component = goJ.components[jb];
                if (component instanceof Behavior) {
                  if (typeof component.onCollision === "function")
                    component.onCollision(jCollider, goJ, iCollider, goI);
                }
              }

            }
          }
        }



      }
    }
  }

  eventPump(event) {
    switch (event.name) {
      case "resize":
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        //canvas.height = rect.height;
        width = canvas.width;
        height = canvas.height;
        break;
      case "timer":
        if (!this.playing) break;
        this.update();

        for (let i = 0; i < this.hierarchy.length; i++) {
          var gameObject = this.hierarchy[i];
          let components = gameObject.components;
          for (let j = 0; j < components.length; j++) {
            let component = components[j];
            if (typeof component.update === "function")
              component.update(gameObject);

          }

        }
        this.render();
        break;
      case "click":
      case "keydown":
      case "keyup":
      case "mousewheel":
      case "mousedown":
      case "resize":
        //Look for behaviors that want to know if they've respond to this event
        for (let i = 0; i < this.hierarchy.length; i++) {
          var gameObject = this.hierarchy[i];
          let components = gameObject.components;
          for (let j = 0; j < components.length; j++) {
            let component = components[j];
            if (component instanceof Behavior) {
              if (event.name == "click" && typeof component.OnClick === "function") {
                component.OnClick(gameObject, new Vector2(event.location.x, event.location.y));
              }
              else if (event.name == "keydown" && typeof component.OnKeyDown == "function") {
                component.OnKeyDown(gameObject, event.key);
              }
              else if (event.name == "keyup" && typeof component.OnKeyUp == "funciton") {
                component.OnKeyUp(gameObject, event.key);
              }
              else if (event.name == "mousewheel" && typeof component.OnMouseWheel == "function") {
                component.OnMouseWheel(gameObject, new Vector2(event.location.x, event.location.y), event.delta);
              }
              else if (event.name == "mousedown" && typeof component.OnMouseWheel == "function") {
                component.OnMouseWheel(gameObject, new Vector2(event.location.x, event.location.y), event.button);
              }
              else if (event.name == "resize" && typeof component.OnResize == "function") {
                component.OnResize(gameObject);
              }
            }
          }

        }
        break;

    }
  }
  render() {


    //This is where I render. I don't update my model here.
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    //canvas.height = rect.height;
    width = canvas.width;
    height = canvas.height;


    let imageData = [];

    let cameras = this.findByType(Camera);
    for (let i = 0; i < cameras.length; i++) {
      let camera = cameras[i];
      let targetName = "main";
      if (camera.target)
        targetName = camera.target
      if (!this.canvases[targetName]) {
        this.canvases[targetName] = document.createElement('canvas');
        this.canvases[targetName].width = width;
        this.canvases[targetName].height = height;
      }
      let ctx = this.canvases[targetName].getContext("2d");

      this.renderCamera(camera, ctx);
    }

    globalCtx.drawImage(this.canvases["main"], 0, 0, width, height);

    for (let i = 0; i < cameras.length; i++) {
      let camera = cameras[i];
      let cameraComponent = camera.getComponent(CameraComponent);

      if (camera.target) {
        globalCtx.drawImage(this.canvases[camera.target], 0, 0, width, height,
          cameraComponent.screenUL.x * width,
          cameraComponent.screenUL.y * height,
          cameraComponent.size.x * width,
          cameraComponent.size.y * height)




      }
    }




  }
  renderCamera(camera, ctx) {
    ctx.fillStyle = camera.backgroundColor;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    {
      //Camera transformations
      ctx.translate(camera.transform.position.x * canvas.width, camera.transform.position.y * canvas.height);
      ctx.scale(camera.zoom, camera.zoom);

      ctx.save(); {
        ctx.scale(1, -1);
        ctx.save(); {
          for (var i = 0; i < this.hierarchy.length; i++) {
            var gameObject = this.hierarchy[i];
            ctx.save(); {
              ctx.translate(gameObject.transform.position.x, gameObject.transform.position.y);
              ctx.scale(gameObject.transform.scale.x, gameObject.transform.scale.y);
              ctx.rotate(gameObject.transform.rotation);
              if (typeof gameObject.render === "function")
                gameObject.render(ctx);
            }
            ctx.restore();
          }
        }
        ctx.restore();
      }
      ctx.restore();
    }
    ctx.restore();


    //Now do screen space rendering
    for (var i = 0; i < this.hierarchy.length; i++) {
      var gameObject = this.hierarchy[i];
      ctx.save(); {
        if (gameObject.rendererGUI instanceof GUIRendererComponent)
          gameObject.renderGUI(ctx);
      }
      ctx.restore();
    }
  }
  inCollision(geo1, transform1, geo2, transform2) {

    if (geo2 instanceof Vector2 && !(geo1 instanceof Vector2)) {
      //Flip them
      return this.inCollision(geo2, transform2, geo1, transform1);
    }
    else if (geo1 instanceof Vector2) {
      if (geo2 instanceof Vector2) {
        return geo1.transform.position.x == geo2.transform.position.x && geo1.transform.position.y == geo2.transform.position.y;
      }
      else if (geo2 instanceof AxisAlignedRectangle) {

        //console.log(transform1.position.x + " " + transform1.position.y);

        if (!transform2.position.isZero()) {
          let newTransform1 = transform1.copy();
          newTransform1.position.subtract(transform2.position);
          let newTransform2 = transform2.copy();
          newTransform2.position.subtract(transform2.position);
          return this.inCollision(geo1, newTransform1, geo2, newTransform2);
        }

        if (transform2.rotation != 0) {
          let newTransform1 = transform1.copy();
          let newTransform2 = transform2.copy();

          newTransform1.position.rotate(-newTransform2.rotation);
          newTransform2.rotation = 0;

          return this.inCollision(geo1, newTransform1, geo2, newTransform2);
        }


        let x = transform1.position.x;
        let y = transform1.position.y;
        let left = - geo2.width / 2;
        let right = + geo2.width / 2;
        let top = + geo2.height / 2;
        let bottom = - geo2.height / 2;

        let inCollision = (x > left && x < right && y < top && y > bottom);
        if (inCollision) {
          //console.log("collision");
        }
        return inCollision;

      }
      else if (geo2 instanceof Circle) {
        let distance = transform1.position.copy().subtract(transform2.position).length;
        return distance < geo2.radius;
      }
    }
    else if (geo2 instanceof Circle && !(geo1 instanceof Circle)) {
      //Flip them
      return this.inCollision(geo2, transform2, geo1, transform1);
    }
    else if (geo1 instanceof Circle) {
      if (geo2 instanceof AxisAlignedRectangle) {
        let newGeo2 = new AxisAlignedRectangle(geo2.width + geo1.radius * 2, geo2.height + geo1.radius * 2)
        return this.inCollision(new Vector2(), transform1, newGeo2, transform2);
      }
      else if (geo2 instanceof Circle) {
        let length = transform1.position.copy().subtract(transform2.position).length;
        return length < geo1.radius + geo2.radius;
      }
    }
    else if (geo1 instanceof AxisAlignedRectangle) {
      if (geo2 instanceof AxisAlignedRectangle) {
        var isColliding = 0; //False
        //Check geo1 points if inside geo2
        //var transformNew = new Vector2(-geo1.width/2, geo1.height/2);
        if(this.inCollision(new Vector2(-geo1.width/2, geo1.height/2), transform1, geo2, transform2))
        {
          console.log("1 Top Left " + transform1.position.x+ " hit " + transform2.position.x);
          isColliding = 1;
        }

        if(this.inCollision(new Vector2(geo1.width/2, geo1.height/2), transform1, geo2, transform2))
        {
          console.log("2 Top Right " + geo1.name + " hit " + geo2.name);
          isColliding = 1;
        }

        if(this.inCollision(new Vector2(-geo1.width/2, -geo1.height/2), transform1, geo2, transform2))
        {
          console.log("3 Bottom Left " + geo1.name + " hit " + geo2.name);
          isColliding = 1;
        }

        if(this.inCollision(new Vector2(geo1.width/2, -geo1.height/2), transform1, geo2, transform2))
        {
          console.log("4 Bottom Right " + geo1.name + " hit " + geo2.name);
          isColliding = 1;
        }

        //vice versa
        if(this.inCollision(new Vector2(-geo2.width/2, geo2.height/2), transform2, geo1, transform1))
        {
          console.log("5 Top Left " + transform1.position.x+ " hit " + transform2.position.x);
          isColliding = 1;
        }

        if(this.inCollision(new Vector2(geo2.width/2, geo2.height/2), transform2, geo1, transform1))
        {
          console.log("6 Top Right " + geo1.name + " hit " + geo2.name);
          isColliding = 1;
        }

        if(this.inCollision(new Vector2(-geo2.width/2, -geo2.height/2), transform2, geo1, transform1))
        {
          console.log("7 Bottom Left " + geo1.name + " hit " + geo2.name);
          isColliding = 1;
        }

        if(this.inCollision(new Vector2(geo2.width/2, -geo2.height/2), transform2, geo1, transform1))
        {
          console.log("8 Bottom Right " + geo1.name + " hit " + geo2.name);
          isColliding = 1;
        }

        return isColliding;
      }
    }
  }
  findByType = function (type) {
    if (!type) throw "Scene.findByType needs exactly one argument";
    let toReturn = [];
    for (var i = 0; i < this.hierarchy.length; i++) {
      var gameObject = this.hierarchy[i];
      if (gameObject instanceof type)
        toReturn.push(gameObject);

    }
    return toReturn;
  }
  instantiate(gameObject, position, rotation) {
    this.hierarchy.push(gameObject);
    if (position)
      gameObject.transform.position = position;
    if (rotation)
      gameObject.transform.rotation = rotation;
  }
  destroy(gameObject) {
    this.hierarchy.splice(this.hierarchy.indexOf(gameObject), 1);
  }
  getGameObjectByName(name) {
    for (var i = 0; i < this.hierarchy.length; i++) {
      var gameObject = this.hierarchy[i];
      if (gameObject.name == name)
        return gameObject;
    }
  }
  findByTag(tag) {
    let returnList = [];
    for (var i = 0; i < this.hierarchy.length; i++) {
      var gameObject = this.hierarchy[i];
      console.log(tag + " Name: " + gameObject.name + " Tag: " + gameObject.tag);
      if (gameObject.tag == tag)
        returnList.push(gameObject);
    }
    return returnList;
  }
}
