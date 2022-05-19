import React from "react"
import { Music } from "./Music"
export interface NotesSelectProps{
    tonic:number
    onChange:Function
}
export function NotesSelect(props:NotesSelectProps):JSX.Element{
    let options:JSX.Element[] = []
    Music.notes.forEach((element:string, index:number) => {
      let o:JSX.Element = <option value={index} key={index}>{Music.notes[index]}</option>
      options.push(o)
    })
    return <select value={props.tonic} onChange={(e)=>props.onChange(e)}>
                {options}
            </select>
  }
