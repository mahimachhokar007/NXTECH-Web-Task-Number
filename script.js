const questions = [
    {
        question:"What is the full form of DBMS?",
        answers: [
            {text: "Data of Binary Management System", correct: false},
            {text: "Database Management System", correct: true},
            {text: "Database Management Service", correct: false},
            {text: "Data Backup Management System", correct: false},
        ]
    },
    {
        question:"Who created the first DBMS?",
        answers: [
            {text: "Edgar Frank Codd", correct: false},
            {text: "Charles Babbage", correct: false},
            {text: "Charles Bachman", correct: true},
            {text: "Sharon B. Codd", correct: false},
        ]
    },
    {
        question:"Which of the following is a feature of the database?",
        answers: [
            {text: "User interface provided", correct: true},
            {text: "No-backup for the data stored", correct: false},
            {text: "Lack of Authentication", correct: false},
            {text: "Store data in multiple locations", correct: false},
        ]
    },
    {
        question:"The ability to query data, as well as insert, delete, and alter tuples, is offered by ____________",
        answers: [
            {text: "TCL (Transaction Control Language)", correct: false},
            {text: "DCL (Data Control Language)", correct: false},
            {text: "DML (Data Manipulation Langauge)", correct: true},
            {text: "DDL (Data Definition Langauge)", correct: false},
        ]
    },
    {
        question:"Which forms have a relation that contains information about a single entity?",
        answers: [
            {text: "4NF", correct: true},
            {text: "3NF", correct: false},
            {text: "5NF", correct: false},
            {text: "BCNF", correct: false},
        ]
    },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
 
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add ("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
            startQuiz();
    }
})

startQuiz();