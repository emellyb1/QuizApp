const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++ /* This increments up by one (to the next questions) */
    setNextQuestion()
})


/*This is what happens when we click to start the app*/
function startGame() {
    startButton.classList.add('hide') /*This adds the hide class so it no longer shows up when its clicked on*/
    shuffledQuestions = questions.sort(()=> Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide') /*This will remove the 'hide' on the questions and have it appear on screen after clicking 'start'*/
    setNextQuestion()

}

/*This what happens when we click the next button on the app */
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })

}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild (answerButtonsElement.firstChild)
    }
}

/*This what happens when we select our answer */
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) /* This will check if we are not on our last question */ {
        nextButton.classList.remove('hide')
    } else { /* else we are on our last questions, the button will say RESTART and the game will restart */
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')

}
/*Creating the list of questions*/
const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true},
            { text: '20', correct: false}  
        ]
    },
    {
        question: 'What is 5 + 2?',
        answers: [
            { text: '7', correct: true},
            { text: '10', correct: false}  
        ]
    },
    {
        question: 'What is 10 + 20?',
        answers: [
            { text: '30', correct: true},
            { text: '20', correct: false}  
        ]
    },
    {
        question: 'What is 1 + 2?',
        answers: [
            { text: '3', correct: true},
            { text: '9', correct: false}  
        ]
    },
    {
        question: 'What is 90 + 10?',
        answers: [
            { text: '100', correct: true},
            { text: '200', correct: false}  
        ]
    }

]