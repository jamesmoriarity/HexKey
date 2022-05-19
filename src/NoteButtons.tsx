import React from "react"
import { Music } from "./Music"
export interface NoteButtonsProps{
    onClick:Function
}
export function NoteButtons(props:any){
        let buttons:JSX.Element[] = []
        Music.notes.forEach((element:string, index:number) => {
          let b:JSX.Element = <button className="note-choice" onClick={(e)=>props.onClick(e)} value={index} key={index}>{element}</button>
          buttons.push(b)
        })
        return <span>{buttons}</span>
}
