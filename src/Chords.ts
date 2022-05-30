export class Chords{
    major:any[]
    minor:any[]
    octave:any
    diminished:any[]
    constructor(){
    this.octave = []
    this.octave[0] = [null,3,null,null,1,null]  // C
    this.octave[1] = [null,4,null,null,2,null]
    this.octave[2] = [null,5,null,null,3,null]
    this.octave[3] = [null,6,2,null,null,null] // D#
    this.octave[4] = [0,null,3,null,null,null] // E
    this.octave[5] = [1,null,4,null,null,null]
    this.octave[6] = [2,null,5,null,null,null]
    this.octave[7] = [3,null,6,null,null,null] // G
    this.octave[8] = [4,null,7,null,null,null]
    this.octave[9] = [5,0,null,null, null,null] // A
    this.octave[10] = [6,1,null,null,null]
    this.octave[11] = [7,2,null,null,null] //B

    this.major = []
        this.major[0] = [0,3,2,0,1,0] //c
        this.major[1] = [1,4,3,4,2,1]
        this.major[2] = [10,0,0,2,3,2] // d
        this.major[3] = [11,3,1,3,4,11]
        this.major[4] = [0,2,2,1,0,0] // e
        this.major[5] = [1,3,3,2,1,1] // f
        this.major[6] = [2,4,4,3,2,2]  // f#
        this.major[7] = [3,2,0,0,0,3] // g
        this.major[8] = [4,3,1,1,1,4]
        this.major[9] = [null,0,2,2,2,0] // a
        this.major[10] = [null,1,3,3,3,1]
        this.major[11] = [null,2,4,4,4,2] //b
    this.minor = []
        this.minor[0] = [null,3,5,5,4,3]           // c
        this.minor[1] = [null,4,6,6,5,4]
        this.minor[2] = [null,5,7,7,6,5]               // d
        this.minor[3] = [null,null,1,3,4,2]           //
        this.minor[4] = [0,2,2,0,0,0]               // e
        this.minor[5] = [1,3,3,1,1,1]               // f
        this.minor[6] = [2,4,4,2,2,2]
        this.minor[7] = [3,5,5,3,3,3]               // g
        this.minor[8] = [4,6,6,4,4,4]
        this.minor[9] = [null,0,2,2,1,0]          // a
        this.minor[10] = [null,1,3,3,2,1]
        this.minor[11] = [null,2,4,4,3,2] // b
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