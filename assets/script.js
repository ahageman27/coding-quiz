// get all required elements from HTML
var scoresButton = document.getElementById("high-score-button");
var timerEl = document.getElementById("timer");
var startScreen = document.querySelector(".start-screen");
var startButton = document.getElementById("start-button");
var quizEl = document.querySelector(".quiz");
var questionEl = document.getElementById("question");
var answerButtonEl = document.querySelectorAll(".answer-button");
var validationEl = document.getElementById("validation");
var gameOverEl = document.querySelector(".game-over");
var playerScoreEl = document.getElementById("player-score");
var initialsInputEl = document.querySelector("#initials-input");
var submitButtonEl = document.querySelector("#submit-score");
var highScoresEl = document.querySelector(".high-scores");
var scoresListEl = document.getElementById("scores-list");
var playAgainButton = document.getElementById("play-again");

// initially hide further elements
quizEl.style.display = "none";
gameOverEl.style.display = "none";
highScoresEl.style.display = "none";

// high scores list variables
var highScoresArray = JSON.parse(localStorage.getItem("high-scores")) ?? [];
var highScores = [];
var numHighScores = highScores.length;

var player = {
    score: 0,
    initials: ""
}

// question objects including question, choices, and answer
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

// variables that needed to be global
var timeInterval;
var randomNum;
var currentQuestion;
var secondsLeft = 100;

// handles timer countdown
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

// starts quiz by hiding start screen, writing question, and starting timer
function startQuiz() {
    secondsLeft = 100;
    startScreen.style.display = "none";
    highScoresEl.style.display = "none";
    timerEl.style.display = "block";
    quizEl.style.display = "flex";
    validationEl.textContent = "";
    timer();
    writeQuestion();
}

// handles displaying a question
function writeQuestion() {
    randomNum = Math.floor(Math.random() * questions.length);
    // removes random question from array and saves it to variable
    currentQuestion = questions.splice(randomNum, 1);

    // displays question
    questionEl.textContent = currentQuestion[0].title;

    // Creates answer buttons and adds event listener
    for (var i = 0; i < currentQuestion[0].choices.length; i++) {
        var answerButton = document.createElement("button");
        answerButton.textContent = currentQuestion[0].choices[i];
        answerButton.setAttribute("class", "answer-button btn btn-warning m-2 text-left");
        questionEl.appendChild(answerButton);
        answerButton.addEventListener("click", updateAnswer);
    }
}

// records answer and checks if wrong 
function updateAnswer(event) {
    var selection = event.target.textContent;
    if (selection !== currentQuestion[0].answer) {
        secondsLeft -= 10;
        validationEl.textContent = "Wrong!"
    }
    else {
        validationEl.textContent = "Correct!"
    }
    newQuestion();
}

// checks if quiz is over 
function newQuestion() {
    if (questions.length === 7) {
        gameOver()
    }
    else {
        writeQuestion()
    }
}

// ends game. stops timer, hides question/answer, records score, resets timer and questions array
function gameOver() {
    clearInterval(timeInterval);
    quizEl.style.display = "none"
    gameOverEl.style.display = "flex";
    timerEl.textContent = "Timer: " + secondsLeft;
    player.score = secondsLeft;
    secondsLeft = 100;
    playerScoreEl.textContent = player.score;
    questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15];
}

// grabs initials from input
function updateInitials(event) {
    player.initials = this.value;
}

// writes/displays high scores list and hides all other elements
function writeHighScores() {
    startScreen.style.display = "none";
    quizEl.style.display = "none";
    gameOverEl.style.display = "none";
    highScoresEl.style.display = "flex";
    clearInterval(timeInterval);
    scoresListEl.innerHTML = "";
    highScoresArray = JSON.parse(localStorage.getItem("high-scores")) ?? [];
    for (var i = 0; i < highScoresArray.length; i++) {
        var highScore = document.createElement("li");
        highScore.textContent = highScoresArray[i].initials + " - " + highScoresArray[i].score;
        scoresListEl.appendChild(highScore);
    }
}

// adds new score and sorts scores
function updateHighScore(score, highScores) {
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("high-scores", JSON.stringify(highScores));
}

startButton.addEventListener("click", startQuiz)

playAgainButton.addEventListener("click", function () {
    questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15];
    startQuiz();
})

scoresButton.addEventListener("click", writeHighScores);

submitButtonEl.addEventListener("click", function () {
    if (initialsInputEl.value === "") {
        alert("Please enter your name")
    } else {
        player.initials = initialsInputEl.value;
        initialsInputEl.value = "";
        highScores = JSON.parse(localStorage.getItem("high-scores")) ?? [];
        updateHighScore(player, highScores);
        writeHighScores();
    }
});