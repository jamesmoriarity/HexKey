import React from "react"
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
}
export interface HexNodeProps{
  position:number, 
  rootNote:number
}
export function HexNode(props:HexNodeProps){
  const nodeNames:string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven']
  const handleClick = function(e:React.MouseEvent){
    console.log('yep!')
  }
  return <g onClick={handleClick}  className={'node ' + nodeNames[props.position]}>
          <circle/>
          <text>{Music.notes[props.rootNote]}</text>
        </g>
}
class BaseComponent extends React.Component {
 	constructor(props:any){
 		super(props)
 	}

  getKeyScale = (tonic:number)=>{
    let scale:number[] = [tonic]
    let currentNote:number = tonic
    for(let i:number = 0; i < 6; i++){
      currentNote = (currentNote + Music.majorScaleIntervals[i]) % 12
      scale.push(currentNote)
    }
    return scale
  }
  getHexNodes = (tonic:number)=>{
    let nodes:JSX.Element[] = []
    this.getKeyScale(tonic).forEach((rootNote:number, index:number) => {
      nodes.push(<HexNode position={index} rootNote={rootNote} key={index}/>)
    });
    return nodes
  }
  render (){
    return <svg className="hexkey" width="256" height="280" viewBox="0 0 32 35" xmlns="http://www.w3.org/2000/svg">
              <g className="hex">
                <path className="outline" d="M15.8 32.6 2.7 25V10l13.1-7.6L28.9 10V25z"/>
                
                <g className="nodes">{this.getHexNodes(Music.Eb)}</g>
              </g>
            </svg>
  }
}
export default BaseComponent
