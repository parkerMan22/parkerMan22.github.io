//A class that holds an x and y component
class Vector2 extends Geometry {
  constructor(a, b) {
    super();
    this.x = 0;
    this.y = 0;

    //Check that we have the right number of arguments of the right type
    // Zero parameters -> default value
    // One parameter -> Expect another Vector2
    // Two parameters -> Expect two numbers in x,y format
    if (a == undefined) {
      //No parameters, so we are fine with the default values above.
      return;
    }
    if (b === undefined) {
      //Exactly one parameter
      if (!a instanceof Vector2) {
        throw "Wrong parameter types in Vector2 constructor";
      }
      //If we get here, we have one parameter that is another Vector2
      //Treat this as a copy constructor
      this.x = a.x;
      this.y = a.y;
    }
    //If we get here, we have two parameters
    if (!typeof a === "number" || !typeof b == "number") {
      throw "wrong parameter types in Vector2 constructor";
    }
    //If we get here, we have two arguments that are both numbers
    this.x = a;
    this.y = b;

  }
  add(a, b) {
    if (typeof a == "undefined") throw "Vector2.add expects at least argument";
    if (typeof b == "undefined") {
      //Only one argument
      if (!a instanceof Vector2) throw "Vector2.add expects a Vector2 as its first argument when there is only one argument";
      //We have one argument and it is another Vector 2
      this.x += a.x;
      this.y += a.y;
    }
    else {
      //We have at least two arguments. We ignore any additional arguments
      if (!a instanceof Number || !b instanceof Number) throw "Vector2.add expects both its arguments to be numbers when there is more than one argument."
      //We have two numbers as arguments
      this.x += a;
      this.y += b;
    }
    return this;
  }
  subtract(a, b) {
    if (typeof a == "undefined") throw "Vector2.subtract expects at least one argument";
    if (typeof b == "undefined") {
      //Only one argument
      if (!a instanceof Vector2) throw "Vector2.subtract expects a Vector2 as its first argument when there is only one argument";
      //We have one argument and it is another Vector 2
      this.x -= a.x;
      this.y -= a.y;
    }
    else {
      //We have at least two arguments. We ignore any additional arguments
      if (!a instanceof Number || !b instanceof Number) throw "Vector2.subtract expects both its arguments to be numbers when there is more than one argument."
      //We have two numbers as arguments
      this.x -= a;
      this.y -= b;
    }
    return this;
  }
  multiply(a){
    if(typeof a == "undefined") throw "Vector2.multiply expects at least one argument"
    if(!a instanceof Number) throw "Vector2.multiply expects its first argument to be of type Number"
    //At this point we have at least one argument at it is a number
    this.x *= a;
    this.y *= a;

    return this;
  }
  rotate(rotation){
    if(typeof rotation == "undefined") throw "Vector2.rotate requires exactly one argument."
    if(!rotation instanceof Number) throw "Vector2.rotate expects its one argument to be of type Number."
    //Build a matrix in the following form:
    //[a b]
    //[c d]
    let a = Math.cos(rotation);
    let b = -Math.sin(rotation);
    let c = Math.sin(rotation);
    let d = Math.cos(rotation);

    let newX = a * this.x + b * this.y
    let newY = c * this.x + d * this.y;

    this.x = newX;
    this.y = newY;

    return this;
  }
  get lengthSquared() {
    return this.x * this.x + this.y * this.y;
  }
  get length() {
    return Math.sqrt(this.lengthSquared);
  }
  normalize(){
    let l = this.length;
    this.x /= l;
    this.y /= l;

    return this;
  }
  isZero(){
    return this.x == 0 && this.y == 0;
  }
  dot(other){
    if(typeof other == "undefined") throw "Vector2.dot expects at least one argument"
    if(!other instanceof Vector2) throw "Vector2.dot expects its first argument to of type Vector2"
    //We have at least one argument and it is of type Vector2
    return this.x * other.x + this.y * other.y;
  }
  copy() {
    let toReturn = new Vector2(this.x, this.y);
    return toReturn;
  }
}