export class Angles{
    static getAngleFromPoints(centerPointX:number, centerPointY:number, endPointX:number, endPointY:number) {
        var dy = endPointY - centerPointY;
        var dx = endPointX - centerPointX;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        //if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
      }
}