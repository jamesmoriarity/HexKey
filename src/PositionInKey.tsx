import React from "react"
import { HexNode } from "./HexNode"
import { Music } from "./Music"
import { SingleHexState } from "./SingleHex"

export class PositionInKeyState{
    currentPosition:number
    currentAnswer:string
    userAnswer:string | null
    tonic:number
    scale:number[]
    constructor(tonic:number, currentPosition:number = 1){
      this.currentPosition = currentPosition
      this.tonic = tonic
      this.scale = Music.getKeyScale(this.tonic)
      this.currentAnswer = Music.notes[this.scale[currentPosition]]
      this.userAnswer = null
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
     let nextNoteName:string = Music.notes[nextNoteNum]
     console.log('nextNoteName', nextNoteName)
     this.setState({currentAnswer:nextNoteName, userAnswer:null, currentPosition:nextPosition})
   }

  onInput = (event:any) => {
    console.log('onInput', event.target.value)
    let noteName:string = event.target.value
    this.setState({userAnswer:noteName})
  }
 
  getSubtitle = ():string => {
    if(this.state.userAnswer === null){
      return ' - '
    }
    if(this.state.currentAnswer === this.state.userAnswer){
      return 'correct'
    }
    if(this.state.currentAnswer.includes(this.state.userAnswer)){
        return ' - '
    }
    return 'incorrect'
  }
  getCurrentPositionLabel = ():string => {
    let num:number = this.state.currentPosition + 1
    return num.toString()
  }
  getTonicNoteName = () => {
    return Music.notes[this.state.tonic]
  }
  getUserAnswer = () => {
    if(this.state.userAnswer === null){return ''}
    return this.state.userAnswer
  }
  onKeySelect = (e:any) => {
    console.log(e.target.value)
    let newState:PositionInKeyState = new PositionInKeyState(parseInt(e.target.value))
    newState.currentPosition = 1
    this.setState({...newState})
  }
  render (){ return <div>

                      <div className="questionPosition">

                      <div>
                              <select value={this.state.tonic} onChange={this.onKeySelect}>
                                  <option value={8}>Ab</option>
                                  <option value={9}>A</option>
                                  <option value={10}>Bb</option>
                                  <option value={11}>B</option>
                                  <option value={0}>C</option>
                                  <option value={1}>Db</option>
                                  <option value={2}>D</option>
                                  <option value={3}>Eb</option>
                                  <option value={4}>E</option>
                                  <option value={5}>F</option>
                                  <option value={6}>Gb</option>
                                  <option value={7}>G</option>
                              </select>
                            </div>
                        <div>
                            {this.getCurrentPositionLabel()}
                             of 
                            {this.getTonicNoteName()}
                        </div>
                        <div>{this.getSubtitle()}</div>
                        <div>
                            <input  type="text" 
                                    value={this.getUserAnswer()} 
                                    onChange={this.onInput} />
                        </div>
                      </div>

                    </div>
  }
}
export default PositionInKey
