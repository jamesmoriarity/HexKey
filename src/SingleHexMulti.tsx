import React from "react"
import { playChord, playChordByPosition, playOctaveByPosition } from "./guitarsounds"
import { HexKey, PositionState } from "./HexKey"
import { HexKeyHelperPositions } from "./HexKeyHelperPositions"
import { HexNode } from "./HexNode"
import { Music } from "./Music"

export class SingleHexMultiState{
  currentNumbers:number[]
  currentAnswers:number[]
  lastAnswer:number | null
  displayType:number
  tonic:number
  scale:number[]
  itemsPerQuestion:number
  showHelper:boolean
  constructor(tonic:number, displayType:number){
    this.currentNumbers = []
    this.currentAnswers = []
    this.lastAnswer = null
    this.displayType = displayType
    this.tonic = tonic
    this.scale = Music.getKeyScale(this.tonic)
    this.itemsPerQuestion = 1
    this.showHelper = true
  }
}

class SingleHexMulti extends React.Component {
  state:SingleHexMultiState
 	constructor(props:any){
 		super(props)
        this.state = this.getState()
        this.state.currentNumbers = this.getNextSequence();
 	}
    getState = () => {
        return new SingleHexMultiState(Music.G, PositionState.LABELTYPE_NUMBER)
    }
    getNextSequence = ():number[] => {
        let options:number[] = []
        for(let i:number = 0; i < 7; i++){
          if(i != this.state.currentAnswers[0] || this.state.itemsPerQuestion !== 1){
            options.push(i)
          }
        }
        let sequence:number[] = []
        for(let j = 0; j < this.state.itemsPerQuestion; j++){
          const index:number = Math.floor(Math.random() * options.length)
          sequence.push(options[index])
        }
        return(sequence)
    }
    answerIsCorrect = () => {
        return (this.state.currentAnswers.length === this.state.currentNumbers.length)
    }
   componentDidUpdate = ()=>{
     if(this.answerIsCorrect()){
        // console.log('all answers are present')
        setTimeout(this.nextQuestion, 1200)
     }
   }
   nextQuestion = () => {
     let sequence:number[] = this.getNextSequence()
     this.setState({currentNumbers:sequence, currentAnswers:[], lastAnswer:null})
   }

  onNodeClick = (position:number) => {
    if(position === this.state.currentNumbers[this.state.currentAnswers.length]){
      const noteNum:number = this.state.scale[position]
      //playChordByPosition(this.state.scale, position)
      playOctaveByPosition(this.state.scale, position)
      let newAnswers:number[] = [...this.state.currentAnswers]
      newAnswers.push(position)
      this.setState({currentAnswers:newAnswers, currentAnswer:position, lastAnswer:position})
    }
    else{
        this.setState({lastAnswer:position})
    }
  }

 
  getUserAnswerReply = ():string => {
    if(this.state.lastAnswer === null){
        return ''
    }
    let currAnswers:number[] = this.state.currentAnswers
    let isLastAnswerCorrect:boolean = (this.state.lastAnswer === currAnswers[currAnswers.length-1])
    if(currAnswers.length === this.state.currentNumbers.length){
        return (this.state.itemsPerQuestion === 1) ? 'correct.' : 'sequence completed.'
    }
    if(isLastAnswerCorrect){
        return 'correct so far...'
    }
    else{
        return 'incorrect. try again.'
    }
  }
  getCurrentNumbersAsOneBasedPositions = () => {
      let remapped:number[] = this.state.currentNumbers.map((elm:number)=>{
        return elm + 1
      })
      return remapped
  }
  getInstruction = ():string => {
    return 'click on multiple positions...  ' + this.getCurrentNumbersAsOneBasedPositions().join(' - ')
  }
  getPositionStates = () => {
      let states:PositionState[] = []
      for(let positionIndex = 0; positionIndex < 7; positionIndex++){
          let labelShouldDisplay:boolean = this.state.currentAnswers.includes(positionIndex)
          let hilite:boolean = labelShouldDisplay
          let state:PositionState = new PositionState(
                                                hilite,
                                                false,
                                                labelShouldDisplay, 
                                                this.state.displayType)
          
          states.push(state)
        }
      return states
  }
  getHelper = () => {
    if(!this.state.showHelper){ return null}
    return <HexKeyHelperPositions 
      activeArrows={[]}
      tonic={this.state.tonic}
      positionStates={this.getPositionStates()}
      onPositionClick={this.onNodeClick} 
      completed={false}/>
  }
  toggleShowHelper = () => {
    this.setState({showHelper:!this.state.showHelper})
  }
  render (){ return <div>
                      <div className="questionPosition">
                          <div>
                            <input type="checkbox" 
                                  checked={this.state.showHelper} 
                                  onChange={this.toggleShowHelper}/> Show Hint - Sequence Pattern

                          </div>
                        <div className='instruction'>
                          {this.getInstruction()}
                        </div>
                        <div className="answer-reply">{this.getUserAnswerReply()}</div>
                      </div>
                      <HexKey
                        activeArrows={[]}
                        tonic={this.state.tonic}
                        positionStates={this.getPositionStates()}
                        onPositionClick={this.onNodeClick} 
                        completed={false}/>
                      <div className="hexkeyhelper">{this.getHelper()}</div>
                    </div>
  }
}
export default SingleHexMulti
