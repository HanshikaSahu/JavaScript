const questions = [
    {
        question : "Which is the largest animal in the world?",
        answers : [
            {text : "Elephant", correct: false},
            {text : "Blue whale", correct: true},
            {text : "Giraffe", correct: false},
            {text : "Elephant", correct: false},
        ]
    },
    {
        question : "Which is the smallest country in the world?",
        answers : [
            {text : "Vatican city", correct: true},
            {text : "Nepal", correct: false},
            {text : "Sri Lanka", correct: false},
            {text : "Bhutan", correct: false},
        ]
    },
    {
        question : "Which is the largest desert in the world?",
        answers : [
            {text : "Kalhari", correct: false},
            {text : "Gobi", correct: false},
            {text : "Sahara", correct: false},
            {text : "Antarctica", correct: true},
        ]
    },
    {
        question : "Which is the smallest continent in the world?",
        answers : [
            {text : "Asia", correct: false},
            {text : "Australia", correct: true},
            {text : "Arctic", correct: false},
            {text : "Africa", correct: false},
        ]
    },
];

const question = document.getElementById("question");
const answerButton = document.querySelector(".answer-btns");
const nextButton = document.querySelector(".next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetQuestion();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    question.innerHTML = questionNo + ". " + currentQuestion.question;   

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetQuestion(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(event){
    const selectButton = event.target;
    const isCorrect = selectButton.dataset.correct === "true";
    if(isCorrect){
        selectButton.classList.add("correct");
        score++;
    }
    else{
        selectButton.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetQuestion();
    question.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();