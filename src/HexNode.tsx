import React from "react"
import { PositionState } from "./HexKey"
import { Music } from "./Music"

export interface HexNodeProps{
    displayState:PositionState,
    position:number, 
    rootNote:number,
    onClick:Function
  }
export class HexNodeNames{
  static asStrings:string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven']
}

export function HexNode(props:HexNodeProps){ 
  const nodeNames:string[] = HexNodeNames.asStrings
    const handleClick = function(e:React.MouseEvent){
      props.onClick(props.position)
    }
    const showNoteNameLabel = function(props:HexNodeProps){
        return(Music.notes[props.rootNote])
    }
    const showNumberLabel = function(props:HexNodeProps){
        return(props.position + 1)
    }
    const getLabel = function(){
      if (props.displayState.labelType === PositionState.LABELTYPE_QUESTION) {
          return '?'
      }
      if (!props.displayState.labelDisplay) {
          return ''
      }
      if (props.displayState.labelType === PositionState.LABELTYPE_NUMBER) {
          return showNumberLabel(props)
      }
      if (props.displayState.labelType === PositionState.LABELTYPE_NOTENAME) {
          return showNoteNameLabel(props)
      }
    }
    let hiliteClass:string = (props.displayState.hilite) ? ' hilite' : ' '
    if(props.displayState.hiliteSelected){
      hiliteClass += ' hiliteSelected'
    }
    return <g onClick={handleClick}  className={'node ' + nodeNames[props.position] + hiliteClass}>
            <circle/>
            <text>{getLabel()}</text>
          </g>
  }