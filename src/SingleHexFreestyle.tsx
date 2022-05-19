import React from "react"
import { playChord, playChordByPosition } from "./guitarsounds"
import { HexKey, PositionState } from "./HexKey"
import { HexNode } from "./HexNode"
import { Music } from "./Music"
import { NotesSelect } from "./NotesSelect"

export class SingleHexFreestyleState{
  displayType:number
  tonic:number
  scale:number[]
  constructor(tonic:number, displayType:number){
    this.displayType = displayType
    this.tonic = tonic
    this.scale = Music.getKeyScale(this.tonic)
  }
}
class SingleHexFreestyle extends React.Component {
  state:SingleHexFreestyleState
 	constructor(props:any){
 		super(props)
        this.state = this.getState()
 	}
    getState = () => {
        return new SingleHexFreestyleState(Music.G, PositionState.LABELTYPE_NOTENAME)
    }

  onNodeClick = (position:number) => {
    playChordByPosition(this.state.scale, position)
  }
  onKeySelect = (e:any) => {
      const key:number = parseInt(e.target.value)
      this.setState(new SingleHexFreestyleState(key, this.state.displayType))
  }
  getInstruction = ():string => {
    return 'click away...'
  }
  getPositionStates = () => {
      let states:PositionState[] = []
      for(let positionIndex = 0; positionIndex < 7; positionIndex++){
          let labelShouldDisplay:boolean = true
          let hilite:boolean = true
          let state:PositionState = new PositionState(
                                                hilite,
                                                true,
                                                labelShouldDisplay, 
                                                this.state.displayType)
          
          states.push(state)
        }
      return states
  }
  render (){ return <div>
                      <div className="questionPosition">
                        <div className='instruction'>{this.getInstruction()}</div>
                        <div><NotesSelect onChange={this.onKeySelect} tonic={this.state.tonic} /></div>
                      </div>
                      <HexKey
                        tonic={this.state.tonic}
                        positionStates={this.getPositionStates()}
                        onPositionClick={this.onNodeClick} 
                        completed={false}/>
                    </div>
  }
}
export default SingleHexFreestyle
