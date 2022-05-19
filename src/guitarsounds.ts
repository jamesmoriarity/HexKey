import { Chords } from "./Chords";
import { Music } from "./Music";

const context = new AudioContext();
let dampening = 0.99;
function pluck(frequency:number) { //:AudioNode
  const pluck = context.createScriptProcessor(4096, 0, 1);
  const signalPeriodInSamples = Math.round(context.sampleRate / frequency);
  const currentSignal = new Float32Array(signalPeriodInSamples);
  for (let i = 0; i < signalPeriodInSamples; i++) {
    currentSignal[i] = Math.random() * 2 - 1; //noise between [-1, 1]
  }

  // This callback produces the sound signal
  let sampleIndex = 0;
  pluck.onaudioprocess = function (e) {
    const output = e.outputBuffer.getChannelData(0);
    for (let i = 0; i < e.outputBuffer.length; i++) {
      // averages current sample with the next one. lowpass filter w/frequency 1/2 sampling rate
      currentSignal[sampleIndex] = (currentSignal[sampleIndex] + currentSignal[(sampleIndex + 1) % signalPeriodInSamples]) / 2;
      // Put sample into buffer
      output[i] = currentSignal[sampleIndex];
      // increase signal decay
      currentSignal[sampleIndex] *= dampening;
      // loops around to zero once at the end of samples
      sampleIndex = (sampleIndex + 1) % signalPeriodInSamples;
    }
  };

  // remove harsh frequencies.
  const bandpass = context.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = frequency;
  bandpass.Q.value = 1;

  // We connect the ScriptProcessorNode to the BiquadFilterNode
  pluck.connect(bandpass);

  // Our signal would have died down by 2s, so we automatically
  // disconnect eventually to prevent leaking memory.
  setTimeout(() => {
    pluck.disconnect();
  }, 2000);
  setTimeout(() => {
    bandpass.disconnect();
  }, 2000);

  // The bandpass is last AudioNode in the chain, so we return
  // it as the "pluck"
  return bandpass;
}

// Fret is an array of finger positions
// e.g. [-1, 3, 5, 5, -1, -1];
// 0 is an open string
// >=1 are the finger positions above the neck
function strum(frets:any, stringCount = 6, stagger = 15) {
  // Reset dampening to the natural state
  dampening = 0.99;
  // Connect our strings to the sink
  const dst = context.destination;
  const filterFrets:number[] = frets.filter((fret:number) => Number.isFinite(fret));
  for (let index = 0; index < filterFrets.length-1; index++) {
      setTimeout(() => {
        pluck(getFrequency(index, filterFrets[index])).connect(dst);
      }, stagger * index);
  }
}

function getFrequency(string:any, fret:any) {
  const A = 110;
  const offsets = [-5, 0, 5, 10, 14, 19]; // These are how far guitar strings are tuned apart from A
  return A * Math.pow(2, (fret + offsets[string]) / 12);
}

function mute() {
  dampening = 0.89;
}
// playChord([0,2,2,1,0,0])

export function playChordByPosition(scale:number[], position:number){
    const minors = [1,2,5]
    const majors = [0,3,4]
    const dims = [6]
    const noteIndex = scale[position]
    let chords:Chords = new Chords()
    let chordLabel:string = (minors.includes(position)) ? 'minor' : (majors.includes(position)) ? 'major' : 'diminished'
    let chordArray = (chordLabel === 'minor') ? chords.minor : (chordLabel === 'major') ? chords.major : chords.diminished
    console.log('playing chord:' + Music.notes[noteIndex] + chordLabel )
    const frets:number[] = chordArray[noteIndex]
    console.log('frets:' + frets )
    playChord(frets)
}

export function playChord(frets:any) {
  context.resume().then(()=>strum(frets));
}
