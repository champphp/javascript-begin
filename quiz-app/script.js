const quizData = [
    {
        question: "What is the most used programming language in 2019?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "Who is the President of US?",
        a: "Florin Pop",
        b: "Donald Trump",
        c: "Ivan Saldano",
        d: "Mihai Andrei",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Jason Object Notation",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];

const answerEls = document.querySelectorAll('.answer')
const quiz = document.getElementById('quiz')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a-text');
const b_text = document.getElementById('b-text');
const c_text = document.getElementById('c-text');
const d_text = document.getElementById('d-text');
const submitBtn = document.getElementById('submit')

let currentQuestion = 0;
let score = 0

const getSelected = () => {
    let answer = ''
    
    answerEls.forEach((answerEl) => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}

const loadQuiz = () => {
  deselectAnswers()
    const currentQuizData = quizData[currentQuestion]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

const deselectAnswers = () => {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false
  })
}

submitBtn.addEventListener("click",() =>{
    const answer = getSelected()
    if(answer) {
      if(answer === quizData[currentQuestion].correct){
        score++
      }
        currentQuestion++;
        if(currentQuestion < quizData.length){
            getSelected()
            loadQuiz();
        }else {
            quiz.innerHTML = `<h2>
            You answered correcty at ${score}/${quizData.length} question.
            </h2>
            <button onClick="location.reload()">Reload</button>
            `
        }
    }else{
      
    }
})

loadQuiz()
