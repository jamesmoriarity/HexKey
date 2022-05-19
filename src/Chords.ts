export class Chords{
    major:any[]
    minor:any[]
    diminished:any[]
    constructor(){
    this.major = []
        this.major[0] = [0,3,2,0,1,0] //c
        this.major[1] = [1,4,3,1,2,1]
        this.major[2] = [null,0,0,2,3,2] // d
        this.major[3] = [null,1,1,3,4,3]
        this.major[4] = [0,2,2,1,0,0] // e
        this.major[5] = [1,3,3,2,1,1] // f
        this.major[6] = [2,4,4,3,2,2] 
        this.major[7] = [3,5,5,4,3,3] // g
        this.major[8] = [4,6,6,5,4,4]
        this.major[9] = [5,7,7,6,5,5] // a
        this.major[10] = [6,8,8,7,6,6]
        this.major[11] = [7,9,9,8,7,7] //b
    this.minor = []
        this.minor[0] = [8, 10, 10,8,8,8]
        this.minor[1] = [null,null,null,2,1,0]
        this.minor[2] = [0,0,0,3,2,1]
        this.minor[3] = [null,4,3,1,2,1] //
        this.minor[4] = [0,2,2,0,0,0] // e
        this.minor[5] = [1,3,3,1,1,1] // f
        this.minor[6] = [2,4,4,2,2,2]
        this.minor[7] = [3,5,5,3,3,3] // g
        this.minor[8] = [4,6,6,4,4,4]
        this.minor[9] = [5,7,7,5,5,5] // a
        this.minor[10] = [6,8,8,6,6,6]
        this.minor[11] = [7,9,9,7,7,7] // b
    this.diminished = []
        this.diminished[0] = [null,3,2,0,1,0]
        this.diminished[1] = [null,4,3,1,2,1]
        this.diminished[2] = [null, null, null, 1,3,1] // d
        this.diminished[3] = [null,4,3,1,2,1]
        this.diminished[4] = [null,4,3,1,2,1]
        this.diminished[5] = [null,4,3,1,2,1]
        this.diminished[6] = [null,null,null,5,7,5]
        this.diminished[7] = [null,null,null,6,8,6]
        this.diminished[8] = [null,null,null,7,9,7]
        this.diminished[9] = [0,0,2,2,1,0]
        this.diminished[10] = [null,4,3,1,2,1]
        this.diminished[11] = [null,4,3,1,2,1]
    }
}