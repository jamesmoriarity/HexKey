import React from "react"
import { HexKey, PositionState } from "./HexKey"
import { NotesSelect } from "./NotesSelect"
import { Music } from "./Music"
import { NoteButtons } from "./NoteButtons"

export class KeyBuilderState{
  currentAnswers:number[]
  lastAnswer:number | null
  tonic:number
  scale:number[]
  selectedPosition:number
  autoSelectNext:boolean
  previousPosition:number
  constructor(tonic:number){
    this.tonic = tonic
    this.scale = Music.getKeyScale(this.tonic)
    this.currentAnswers = []
    this.lastAnswer = null
    this.selectedPosition = -1
    this.previousPosition = -1
    this.autoSelectNext = true
  }
}

export class KeyBuilder extends React.Component {
  state:KeyBuilderState
 	constructor(props:any){
 		super(props)
    this.state = this.getState(Music.G)
    if(this.state.autoSelectNext){
      this.state.selectedPosition = this.getNextPosition()
    }
 	}
   getNextPosition = () => {
    let scale:number[] = [...this.state.scale]
    let position:number = -1
    scale.forEach((element:number, index:number) => {
       if(!this.state.currentAnswers.includes(element)){
        if(position === -1){position = index}
       }
     })
     return position
     // look through the scale, whichever is the next unanswered position
   }
   resetKey = () => {
    let newState:KeyBuilderState = this.getState(this.state.tonic)
    newState.autoSelectNext = this.state.autoSelectNext
    this.setState(newState)
   }
    setTonic = (tonic:number) => {
        let newState:KeyBuilderState = this.getState(tonic)
        this.setState(newState)
    }
    getState = (tonic:number) => {
        return new KeyBuilderState(tonic)
    }
    onKeySelect = (e:any) => {
        console.log(e.target.value)
        this.setTonic(parseInt(e.target.value))
    }
   componentDidUpdate = ()=>{
     if(this.keyIsCompleted()){
       setTimeout(this.resetKey, 1500)
     }
    if(this.state.autoSelectNext){
      let nextPosition:number = this.getNextPosition()
      if(nextPosition !== this.state.selectedPosition){
        this.setState({selectedPosition:nextPosition, previousPosition:this.state.selectedPosition})
      }
    }
   }
   componentDidMount = () => {
    console.log('componentDidMount')
   }
   getInstruction = () => {
       return 'Enter all seven notes in the key of:'
   }
   getAnswerReply = () => {
     if(this.keyIsCompleted()){ return 'Key Completed. Nice Job.'}
    if (this.state.lastAnswer === null || this.state.lastAnswer === -1){return('')}
    let position:number = (this.state.autoSelectNext) ? this.state.previousPosition : this.state.previousPosition
    let isCorrect:boolean = this.state.lastAnswer === this.state.scale[position]
    let userAnswer:string = Music.notes[this.state.lastAnswer] + ' is '
    return userAnswer + ( (isCorrect) ? 'correct' : 'incorrect for the ' + (this.state.selectedPosition + 1) + ' position' )
   }
  onNodeClick = (position:number) => {
    this.setState({selectedPosition:position, lastAnswer:null})
  }
  
  shouldNodeDisplay = (index:number) => {
    let labelShouldDisplay:boolean = this.state.currentAnswers.includes(this.state.scale[index])
    return labelShouldDisplay
  }
  keyIsCompleted = () => {
    return (this.state.currentAnswers.length === this.state.scale.length)
  }
  getPositionStates = () => {
      let states:PositionState[] = []
      for(let positionIndex = 0; positionIndex < 7; positionIndex++){
          let shouldDisplay:boolean = this.shouldNodeDisplay(positionIndex)
          let hilite:boolean = shouldDisplay || (positionIndex === this.state.selectedPosition) || this.keyIsCompleted()
          let labelType:number = PositionState.LABELTYPE_NOTENAME
          let hiliteSelected:boolean = (!this.shouldNodeDisplay(positionIndex))
          if(!this.state.currentAnswers.includes(this.state.scale[positionIndex]) && hilite){
            labelType = PositionState.LABELTYPE_QUESTION
          }
          let state:PositionState = new PositionState( hilite, hiliteSelected, shouldDisplay, labelType)
          states.push(state)
        }
      return states
  }
  onInput = (event:any) => {
    console.log('onInput', event.target.value)
    let noteNum:number = parseInt(event.target.value)
    if(this.state.selectedPosition > -1){
      let answeredCorrectly:boolean = (noteNum === this.state.scale[this.state.selectedPosition])
      if(answeredCorrectly){
        let newAnswers:number[] = [...this.state.currentAnswers]
        newAnswers.push(noteNum)
        if(this.state.autoSelectNext){
          let selectedPosition = this.getNextPosition()
          this.setState({currentAnswers:newAnswers, 
                          currentAnswer:noteNum, 
                          lastAnswer:noteNum, 
                          selectedPosition:selectedPosition,
                          previousPosition:selectedPosition})
        }
        else{
          this.setState({currentAnswers:newAnswers, currentAnswer:noteNum, lastAnswer:noteNum, previousPosition:this.state.selectedPosition})

        }
      }
      else{
        this.setState({lastAnswer:noteNum})
      }
    }
  }

  getUserAnswer = () => {
    if(this.state.lastAnswer === null){return ''}
    return Music.notes[this.state.lastAnswer]
  }

  toggleAutoSelect = () => {
    let autoSelectState:boolean = !this.state.autoSelectNext
    let lastAnswer:number | null = (autoSelectState) ? -1 : this.state.lastAnswer
    this.setState({autoSelectNext:autoSelectState, lastAnswer:lastAnswer})
  }
  render (){ return <div>
                      <div className="questionPosition">
                            <div>
                              {this.getInstruction()}
                              <NotesSelect tonic={this.state.tonic} onChange={this.onKeySelect}/>
                              <button onClick={this.resetKey}>clear</button>
                              <input type="checkbox" checked={this.state.autoSelectNext} onChange={this.toggleAutoSelect}/> Autoselect Positions
                            </div>
                            <div>
                              <NoteButtons onClick={this.onInput} />
                            </div>
                            <div>{this.getAnswerReply()}</div>

                      </div>
                      <HexKey
                        completed={this.keyIsCompleted()}
                        tonic={this.state.tonic}
                        positionStates={this.getPositionStates()}
                        onPositionClick={this.onNodeClick} />
                    </div>
  }
}
export default KeyBuilder
