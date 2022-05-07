var scoresButton = document.getElementById("high-score-button");
var timerEl = document.getElementById("timer");
var startScreen = document.querySelector(".start-screen");
var startButton = document.getElementById("start-button");
var quizEl = document.querySelector(".quiz");
var questionEl = document.getElementById("question");
var answerButton = document.querySelectorAll(".answer-button");
var answerAEl = document.getElementById("answerA");
var answerBEl = document.getElementById("answerB");
var answerCEl = document.getElementById("answerC");
var answerDEl = document.getElementById("answerD");
var gameOverEl = document.querySelector(".game-over");
var playerScoreEl = document.getElementById("player-score");
var initialsEl = document.querySelector("#initials");
var submitButtonEl = document.querySelector("#submit-score");
var highScoresEl = document.querySelector(".high-scores");
var scoresListEl = document.getElementById("scores-list");

var player = {
    score: 0,
    initials: ""
}

var questions = ["question1", "question2", "question3", "question4"]
var question1Answers = ["A", "B", "C", "D"]
var question2Answers = ["E", "F", "G", "H"]
var question3Answers = ["I", "J", "K", "L"]
var question4Answers = ["M", "N", "O", "P"]

var timeInterval;

var secondsLeft = 100;
function timer() {
    timeInterval = setInterval(function () {
        timerEl.textContent = "Time: " + secondsLeft;
        secondsLeft--;

        if (secondsLeft <= 0) {
            clearInterval(timeInterval)
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

    for (var i = 0; i < answerButton.length; i++) {
        answerButton[i].addEventListener("click", updateAnswer, "event")
    }
    questions.splice(randomNum, 1)
}

function updateAnswer(event) {
    var selection = event.target;
    if (selection.value === "false") {
        secondsLeft -= 10;
    }
    newQuestion();
}

function newQuestion() {
    if (questions.length === 0) {
        gameOver()
    }
    writeQuestion()
}

function gameOver() {
    clearInterval(timeInterval);
    console.log(typeof highScoresEl);
    quizEl.style.display = "none";
    gameOverEl.style.display = "block";
    timerEl.textContent = "Time: " + secondsLeft;
    player.score = secondsLeft;
    playerScoreEl.textContent = player.score;
    submitButtonEl.addEventListener("click", function () {
        player.initials = initialsEl.value;
        console.log(player);
    })
}