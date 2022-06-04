export class Coordinates{
    x:number
    y:number
    constructor(x:number = 0, y:number = 0){
        this.x = x
        this.y = y
    }
    toStringPoints = () => {
        return(String(this.x) + " " + String(this.y))
    }
} 