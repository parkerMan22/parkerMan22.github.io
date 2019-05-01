class Line extends Geometry{
  constructor(a,b){
    super();

    this.a = 0;
    this.b = 0;
    this.c = 0;

    this.a = a.y-b.y;
    this.b = b.x-a.x;
    this.c = a.x*b.y-b.x*a.y;

  }
}