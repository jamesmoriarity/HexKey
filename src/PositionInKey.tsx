import React from "react"
import { playChordByPosition } from "./guitarsounds"
import { HexNode } from "./HexNode"
import { Labels } from "./Labels"
import { Music } from "./Music"
import { NoteButtons } from "./NoteButtons"
import { NotesSelect } from "./NotesSelect"

export class PositionInKeyState{
    currentPosition:number
    currentAnswer:number
    userAnswer:number
    tonic:number
    scale:number[]
    constructor(tonic:number, currentPosition:number = 1){
      this.currentPosition = currentPosition
      this.tonic = tonic
      this.scale = Music.getKeyScale(this.tonic)
      this.currentAnswer = this.scale[currentPosition]
      this.userAnswer = -1
    }
  }

class PositionInKey extends React.Component {
    state:PositionInKeyState
 	constructor(props:any){
 		super(props)
        this.state = new PositionInKeyState(Music.G)
 	}
   componentDidUpdate = ()=>{
    if(this.state.currentAnswer === this.state.userAnswer){
      playChordByPosition(this.state.scale, this.state.currentPosition)
      setTimeout(this.nextQuestion, 1000)
    }
   }
   getRandomNonRepeatingPosition = () => {
    let positions:number[] = []
    for(let i = 1; i < 7; i++){
      if(i !== this.state.currentPosition){
       positions.push(i)
      }
    }
    let nextPositionIndex:number = Math.floor(Math.random() * positions.length)
    return positions[nextPositionIndex]     
   }
   nextQuestion = () => {
     let nextPosition:number = this.getRandomNonRepeatingPosition()
     console.log('nextPosition', nextPosition)
     let nextNoteNum:number = this.state.scale[nextPosition]
     console.log('nextNoteNum', nextNoteNum)
     this.setState({currentAnswer:nextNoteNum, userAnswer:-1, currentPosition:nextPosition})
   }
  onInput = (event:any) => {
    this.setState({userAnswer:parseInt(event.target.value)})
  }
 
  getSubtitle = ():string => {
    if(this.state.userAnswer === -1){
      return ''
    }
    if(this.state.currentAnswer === this.state.userAnswer){
      return 'correct'
    }
    return 'incorrect'
  }
  getCurrentPositionLabel = ():string => {
    let num:number = this.state.currentPosition + 1
    return num.toString() + Labels.getSuffixForPosition(this.state.currentPosition)
  }
  getTonicNoteName = () => {
    return Music.notes[this.state.tonic]
  }
  getUserAnswer = () => {
    if(this.state.userAnswer === -1){return ''}
    return this.state.userAnswer
  }
  onKeySelect = (e:any) => {
    console.log(e.target.value)
    let newState:PositionInKeyState = new PositionInKeyState(parseInt(e.target.value), 1)
    this.setState({...newState})
  }
  render (){ return <div>

                      <div className="questionPosition">
                        <div>
                          <NotesSelect tonic={this.state.tonic} onChange={this.onKeySelect}/>
                       </div>
                        <div>
                            {this.getCurrentPositionLabel()} of  {this.getTonicNoteName()}
                        </div>
                        <div>{this.getSubtitle()}</div>
                        <div>
                            <NoteButtons onClick={this.onInput} />
                        </div>
                      </div>

                    </div>
  }
}
export default PositionInKey
