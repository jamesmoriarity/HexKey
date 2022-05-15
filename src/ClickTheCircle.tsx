/*
note and chord library

Exercise
    SingleHexKey
        positions [react to answers with pulses, show their numbers]
    Scoreboard

Exercise.onStart
    this.askQuestion(this.getQuestion())

Exercise.askQuestion(question){
    question.asked = true
    question.askedTime = Date().now() // milliseconds
    state.question = question
    // state.question.subQuestions = subQuestions
    // set question in state, ui reacts
}

Exercise.state.subQuestionCount = 3

Exercise.getQuestion(){
    let len = Exercise.state.subQuestionCount
    let subQuestions = []
    for(let i = 0; i < len, i++){
        let n = Math.floor(Math.random() * 7) + 1
        subQuestions.push(n)
    }
    return new Question(subQuestions)
}

Exercise.onAnswer (subAnswer:number)
    if question is open
        add subAnswer(subAnswer)
        subAnswerWasCorrect = (answers[index] === userAnswers[index])
        if !subAnswerWasCorrect
            question.answeredCorrectly(false)
        if subAnswerWasCorrect and userAnswers.length === actual answers length
            question.answeredCorrectly(true) 
        if not end of sequence next question() after interval

Question(subAnswers){
    this.userAnsweredCorrectly = false
    this.asked = false
}
Question.answeredCorrectly(correct:boolean){
    this.userAnsweredCorrectly = correct
    this.close()
}
Question.close()
    // store question in history
    this.open = false

Exercise State
    subQuestionCount:number // number of subquestions in each question
    score:score (metrics bundled into an object)
        total questions
        correct answers
        avg time per correct answer
    currentQuestion:question | null
        askedTime
        answeredTime
        subQuestions:number[]:number[]
        display:string 'Click the following position(s in order)'
        answered:boolean
        userAnswerSequence:userAnswerSequence
            add(answer, answertime)
                when len === answer sequence.length
                    process answer
            [answer, answer time]

        answerSequence:number[]
    

a hexagon component, with no labels
exercise starts by showing brief intro/instruction [start]
question is chosen - getQuestion(){random number is chosen}
question is displayed as a Number "click the [x] position"
answer reply is displayed when an answer is present as "correct":"incorrect"
onAnswer handler accepts clicks from circles
    if question && !answered then process question

if wrong, pulses false reset has clicked
    for circle: if theres an answer and it's me...
        if wrong, pulse wrong

    onAnswerProcessed wait x seconds before the next question

*/