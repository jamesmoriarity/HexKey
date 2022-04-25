import React from "react"
export class Music{
  static majorScaleIntervals:number[] = [2,2,1,2,2,2,1]
  static notes:string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  static C:number = 0
  static F:number = 5
}
export interface HexNodeProps{
  position:number, 
  rootNote:number
}
export function HexNode(props:HexNodeProps){
  const nodeNames:string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven']
  return <g onClick={(e)=>{console.log('yep!')}}  className={'node ' + nodeNames[props.position]}>
          <circle fill="#e6e6e6" stroke="#000" strokeWidth=".1"/>
          <text>{Music.notes[props.rootNote]}</text>
        </g>
}


class BaseComponent extends React.Component {
 	constructor(props:any){
 		super(props)
 	}
  tonic:number = Music.F
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
                <g className="nodes">{this.getHexNodes(Music.F)}</g>
              </g>
            </svg>
  }
}
export default BaseComponent
