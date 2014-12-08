class Helpers {
    public globaltick:any;

    public boundsCheck(check:number, min:number, max:number):boolean {
        return check >= min && check <= max;
    }

    public distance(x1:number, y1:number, x2:number, y2:number) {
        //return Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
        return Math.abs(x2-x1) + Math.abs(y2-y1);
    }
}
