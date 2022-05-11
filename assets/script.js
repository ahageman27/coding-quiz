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
    title: " An HTML document can contain _____",
    choices: ["Attributes", "Tags", "Raw text", "All of the above"],
    answer: "All of the above"
}

var question2 = {
    title: "A page designed in HTML is called _____",
    choices: ["Application", "Cover page", "Front-end", "Web Page"],
    answer: "Web Page"
}
var question3 = {
    title: "The HTML document contains a root tag called ____",
    choices: ["HEAD", "Title", "Body", "HTML"],
    answer: "HTML"
}
var question4 = {
    title: "If we want to place text around an image, which CSS property should we use?",
    choices: ["push", "float", "align", "wrap"],
    answer: "float"
}
var question5 = {
    title: "Suppose we want to arrange three DIVs so that DIV 3 is placed above DIV1. Now, which CSS property are we going to use to control the stack order?",
    choices: ["d-index", "s-index", "z-index", "x-index"],
    answer: "z-index"
}
var question6 = {
    title: "Choose the correct HTML tag for a large title.",
    choices: ["h1", "header", "head", "h6"],
    answer: "h1"
}
var question7 = {
    title: " If we want to use a dotted border around an image, which css property are we going to use?",
    choices: ["border-line", "border-style", "border-decoration", "border-color"],
    answer: "border-style"
}
var question8 = {
    title: "JavaScript language is _____.",
    choices: ["Object-oriented", "Object-based", "Functional programming", "All of the above"],
    answer: "Object-based"
}
var question9 = {
    title: "Which of the following statements is true about the JavaScript?",
    choices: ["It is a scripting language used to make the website interactive", "It is an advanced version of Java for Desktop and Mobile application development", "It is a markup language of Java to develop the webpages", "All of the above"],
    answer: "It is a scripting language used to make the website interactive"
}
var question10 = {
    title: "In which HTML element, we put the JavaScript code?",
    choices: ["<javascript>...</javascript>", "<js>...</js>", "<script>...</script>", "<css>...</css>"],
    answer: "<script>...</script>"
}
var question11 = {
    title: "Which JavaScript keyword is used to declare a variable?",
    choices: ["Var", "var", "Let", "All of the above"],
    answer: "var"
}
var question12 = {
    title: "JavaScript ignores _____.",
    choices: ["newlines", "tabs", "spaces", "All of the above"],
    answer: "All of the above"
}
var question13 = {
    title: "Which JavaScript method is used to write on browser's console?",
    choices: ["console.write()", "console.output()", "console.log()", "console.writeHTML()"],
    answer: "console.log()"
}
var question14 = {
    title: "JavaScript arrays are written with _____.",
    choices: ["round brackets ()", "curly brackets {}", 'double quotes ""', "square brackets []"],
    answer: "undefined"
}
var question15 = {
    title: "Which keyword is used to define a JavaScript function?",
    choices: ["module", "fun", "func", "function"],
    answer: "function"
}

var questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15];

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
    quizEl.style.display = "flex";
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
    if (questions.length === 7) {
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
    questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15];
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