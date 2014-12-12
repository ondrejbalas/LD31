class Pos {
    public x:number;
    public y:number;
    public sqX:number;
    public sqY:number;

    static fromPixels(x:number,y:number):Pos {
        var sqSize = window.squareSize();
        var pos = new Pos()
        pos.x = x;
        pos.y = y;
        pos.sqX = Math.floor(x/sqSize);
        pos.sqY = Math.floor(y/sqSize);
        return pos;
    }
}
