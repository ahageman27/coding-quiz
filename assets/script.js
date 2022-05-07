var scoresButton = document.getElementById("high-score-button");
var timerEl = document.getElementById("timer");
var startScreen = document.querySelector(".start-screen");
var startButton = document.getElementById("start-button");
var quizEl = document.querySelector(".quiz");
var questionEl = document.getElementById("question");
var answerButton = document.getElementsByClassName("answer-button");
var answerAEl = document.getElementById("answerA");
var answerBEl = document.getElementById("answerB");
var answerCEl = document.getElementById("answerC");
var answerDEl = document.getElementById("answerD");
var highScoresEl = document.querySelector(".high-scores");
var scoresListEl = document.getElementById("scores-list");

var user = {
    right: false,
    score: 0
}

var questions = ["question1", "question2", "question3", "question4"]
var question1Answers = ["A", "B", "C", "D"]
var question2Answers = ["A", "B", "C", "D"]
var question3Answers = ["A", "B", "C", "D"]
var question4Answers = ["A", "B", "C", "D"]

var secondsLeft = 100;
function timer() {
    var timeinterval = setInterval(function () {
        timerEl.textContent = "Time: " + secondsLeft;
        secondsLeft--;

        if (secondsLeft <= 0) {
            clearInterval(timeinterval)
            gameOver()
        }
    }, 1000);
}

startButton.addEventListener("click", startQuiz)

function startQuiz() {
    startScreen.style.display = "none";
    timer();
    writeQuestion()
}

function writeQuestion() {
    quizEl.style.display = "block";
    var randomNum = Math.floor(Math.random() * questions.length);
    questionEl.textContent = questions[randomNum];
    if (randomNum === 0) {
        answerAEl.textContent = question1Answers[0];
        answerAEl.value = true;
        answerBEl.textContent = question1Answers[1];
        answerBEl.value = false;
        answerCEl.textContent = question1Answers[2];
        answerCEl.value = false;
        answerDEl.textContent = question1Answers[3];
        answerDEl.value = false;
    }
    else if (randomNum === 1) {
        answerAEl.textContent = question2Answers[0];
        answerAEl.value = true;
        answerBEl.textContent = question2Answers[1];
        answerBEl.value = false;
        answerCEl.textContent = question2Answers[2];
        answerCEl.value = false;
        answerDEl.textContent = question2Answers[3];
        answerDEl.value = false;
    }
    else if (randomNum === 2) {
        answerAEl.textContent = question3Answers[0];
        answerAEl.value = true;
        answerBEl.textContent = question3Answers[1];
        answerBEl.value = false;
        answerCEl.textContent = question3Answers[2];
        answerCEl.value = false;
        answerDEl.textContent = question3Answers[3];
        answerDEl.value = false;
    }
    else if (randomNum === 3) {
        answerAEl.textContent = question4Answers[0];
        answerAEl.value = true;
        answerBEl.textContent = question4Answers[1];
        answerBEl.value = false;
        answerCEl.textContent = question4Answers[2];
        answerCEl.value = false;
        answerDEl.textContent = question4Answers[3];
        answerDEl.value = false;
    }

    console.log(answerButton)
    for (var i = 0; i < answerButton.length; i++) {
        answerButton[i].addEventListener("click", updateUser, "event")
    }
    questions.splice(randomNum, 1)
}

function updateUser(event) {
    var selection = event.target;
    console.log(selection)
    user.right = selection.value;
    if (user.right) {
        user.score++;
    }
    else {
        secondsLeft -= 10;
    }
    newQuestion()
    console.log(user)
}

function newQuestion() {

}