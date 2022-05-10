var scoresButton = document.getElementById("high-score-button");
var timerEl = document.getElementById("timer");
var startScreen = document.querySelector(".start-screen");
var startButton = document.getElementById("start-button");
var quizEl = document.querySelector(".quiz");
var questionEl = document.getElementById("question");
var answerButtonEl = document.querySelectorAll(".answer-button");
var gameOverEl = document.querySelector(".game-over");
var playerScoreEl = document.getElementById("player-score");
var initialsInputEl = document.querySelector("#initials-input");
var submitButtonEl = document.querySelector("#submit-score");
var highScoresEl = document.querySelector(".high-scores");
var scoresListEl = document.getElementById("scores-list");
var playAgainButton = document.getElementById("play-again");

var highScoresString = localStorage.getItem("high-scores");
var highScores = [];
var numHighScores = highScores.length;

var player = {
    score: 0,
    initials: ""
}

var question1 = {
    title: "css",
    choices: ["a", "b", "c", "d"],
    answer: "a"
}

var question2 = {
    title: "question 2",
    choices: ["a", "b", "c", "d"],
    answer: "a"
}
var question3 = {
    title: "question 3",
    choices: ["a", "b", "c", "d"],
    answer: "a"
}
var question4 = {
    title: "question 4",
    choices: ["a", "b", "c", "d"],
    answer: "a"
}

var questions = [question1, question2, question3, question4];

var timeInterval;
var randomNum;
var currentQuestion;

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


function startQuiz() {
    startScreen.style.display = "none";
    highScoresEl.style.display = "none";
    timerEl.style.display = "block";
    quizEl.style.display = "block";
    timer();
    writeQuestion();
}

// Writes the question
function writeQuestion() {
    randomNum = Math.floor(Math.random() * questions.length);
    currentQuestion = questions.splice(randomNum, 1);

    if (questions.lenght !== 0) {
        questionEl.textContent = currentQuestion[0].title;
    }

    // Creates answer buttons and adds event listener
    for (var i = 0; i < currentQuestion[0].choices.length; i++) {
        var answerButton = document.createElement("button");
        answerButton.textContent = currentQuestion[0].choices[i];
        answerButton.setAttribute("class", "answer-button");
        questionEl.append(answerButton);
        answerButton.addEventListener("click", updateAnswer);
    }
}

// Records answer and checks if wrong 
function updateAnswer(event) {
    var selection = event.target.textContent;
    if (selection !== currentQuestion[0].answer) {
        secondsLeft -= 10;
    }
    newQuestion();
}

// Checks if quiz is over 
function newQuestion() {
    if (questions.length === 0) {
        gameOver()
    }
    else {
        writeQuestion()
    }
}


function gameOver() {
    clearInterval(timeInterval);
    quizEl.style.display = "none"
    for (var i = 0; i < answerButtonEl.length; i++) {
        answerButtonEl[i].style.display = "none"
    }
    gameOverEl.style.display = "block";
    timerEl.textContent = secondsLeft;
    player.score = secondsLeft;
    secondsLeft = 100;
    playerScoreEl.textContent = player.score;
    questions = [question1, question2, question3, question4];
}

function updateInitials(event) {
    player.initials = this.value;
}

function writeHighScores() {
    startScreen.style.display = "none";
    timerEl.style.display = "none";
    quizEl.style.display = "none";
    gameOverEl.style.display = "none";
    highScoresEl.style.display = "block";
    scoresListEl.innerHTML = highScores.map((score) =>
        `<li>${score.initials} - ${score.score}`
    ).join("");

}

function updateHighScore(score, highScores) {
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("high-scores", JSON.stringify(highScores));
    writeHighScores();
}

startButton.addEventListener("click", startQuiz)
playAgainButton.addEventListener("click", startQuiz)
scoresButton.addEventListener("click", writeHighScores)

submitButtonEl.addEventListener("click", function () {
    player.initials = initialsInputEl.value;
    initialsInputEl.value = "";
    highScores = JSON.parse(localStorage.getItem("high-scores")) ?? [];
    updateHighScore(player, highScores);
});