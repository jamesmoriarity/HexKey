import React from "react"
import { Music } from "./Music"
import SingleHex, { SingleHexState } from "./SingleHex"

export interface HexNodeProps{
    displayType:number,
    position:number, 
    rootNote:number,
    onClick:Function
  }
export function HexNode(props:HexNodeProps){
    const nodeNames:string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven']
    const handleClick = function(e:React.MouseEvent){
      console.log('yep!')
      props.onClick(props.position)
    }

    
    const showNoteNameLabel = function(props:HexNodeProps){
        return(Music.notes[props.rootNote])
    }
    const showNumberLabel = function(props:HexNodeProps){
        return(props.position + 1)
    }
    const getLabel = function(props:HexNodeProps){
      if (props.displayType === SingleHexState.DISPLAY_NONE) {
          return ''
      }
      if (props.displayType === SingleHexState.DISPLAY_NUMBER) {
          return showNumberLabel(props)
      }
      if (props.displayType === SingleHexState.DISPLAY_NOTENAME) {
          return showNoteNameLabel(props)
      }
    }
    return <g onClick={handleClick}  className={'node ' + nodeNames[props.position]}>
            <circle/>
            <text>{getLabel(props)}</text>
          </g>
  }