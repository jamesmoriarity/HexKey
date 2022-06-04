export class Music{
    static majorScaleIntervals:number[] = [2,2,1,2,2,2,1]
    static notes:string[] = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
    static C:number   = 0
    static Db:number  = 1
    static D:number   = 2
    static Eb:number  = 3
    static E:number   = 4
    static F:number   = 5
    static Gb:number  = 6
    static G:number   = 7
    static Ab:number  = 8
    static A:number   = 9
    static Bb:number  = 10
    static B:number   = 11

    static addInterval = function(note:number, interval:number){
      return((note + interval) % 12 )
    }

    static intervalNames:string[] = ['ZERO', 'MINOR2ND', '2ND', 'MINOR3RD', '3RD', '4TH', 'SHARP4TH', '5TH', 'SHARP5TH', '6TH', 'FLAT7TH', '7TH' ]
    static interval_2nd:number = 2
    static interval_minor3rd:number = 3
    static interval_3rd:number = 4
    static interval_4th:number = 5
    static interval_sharp4th:number = 6
    static interval_5th:number = 7
    static interval_flat6th:number = 8
    static interval_6th:number = 9
    static interval_flat7th:number = 10
    static interval_7th:number = 11
    static interval_8th:number = 0

    static getKeyScale = (tonic:number)=>{
        let scale:number[] = [tonic]
        let currentNote:number = tonic
        for(let i:number = 0; i < 6; i++){
          currentNote = (currentNote + Music.majorScaleIntervals[i]) % 12
          scale.push(currentNote)
        }
        return scale
      }
  }