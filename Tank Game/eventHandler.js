var keys = [];

function keydown(e) {
  if(keys[e.key]) return; //Don't keep firing if the key is held down
  keys[e.key] = true;
  update({name:"keydown", key:e.key});
}

function keyup(e) {
  keys[e.key] = false;
  update({name:"keyup", key:e.key});
}

function mousedown(e) {
  update({name:"mousedown", location: { x: e.offsetX, y: e.offsetY } , button:e.button});
}
function mouseup(e) {
  update({ name: "click", location: { x: e.offsetX, y: e.offsetY } });
}
function mousemove(e) {
  update({name:"mousemove", location: {x: e.offsetX, y: e.offsetY}});
}
function wheel(e){
  update({name:"mousewheel", location: {x:e.offsetX, y:e.offsetY}, delta: e.deltaY});
}
function resize(e){
  update({name:"resize"});
}


var updateListeners = [];

function timer() {
  update({ name: "timer" })
}

var Time = {};
var start = null;
function animationHandler(elapsedTime){
  if(!start) start = elapsedTime;
  Time.deltaTime = (elapsedTime - start)/1000.0;

  update({name:"render"})

  window.requestAnimationFrame(animationHandler);
  start = elapsedTime;
}

function update(event) {
  for (let i = 0; i < updateListeners.length; i++) {
    updateListeners[i].eventPump(event);
  }
}

window.requestAnimationFrame(animationHandler);

 