class Triangle extends Geometry{
  constructor(a,b,c,d,e,f){
    super();

    this.points = [];

    let badConstructorCount = "Triangle constructor needs one argument (copy constructor), three argumments (Vector2s), or three arguments (floats)"

    if(a === undefined)
      throw badConstructorCount
    
    if(b === undefined){
      for(let i = 0; i < 3; i++){
        this.points.push(a.points[i]);
      }
    }

    else if(c === undefined)
      throw badConstructorCount;
    if(!d)
    {
      this.points.push(a);
      this.points.push(b);
      this.points.push(c);
    }
    else if(e === undefined)
      throw badConstructorCount;
    else{
      this.points.push(new Vector2(a,b));
      this.points.push(new Vector2(c,d));
      this.points.push(new Vector2(e,f));
    }    
  }
}