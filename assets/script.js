var scoresButton = document.getElementById("high-score-button");
var timerEl = document.getElementById("timer");
var startScreen = document.querySelector(".start-screen");
var startButton = document.getElementById("start-button");
var quizEl = document.querySelector(".quiz");
var questionEl = document.getElementById("question");
var answerAEl = document.getElementById("answerA");
var answerBEl = document.getElementById("answerB");
var answerCEl = document.getElementById("answerC");
var answerDEl = document.getElementById("answerD");
var highScoresEl = document.querySelector(".high-scores");
var scoresListEl = document.getElementById("scores-list");

var questions = ["question1", "question2", "question3", "question4"]
var question1Answers = ["A", "B", "C", "D"]
var question2Answers = ["A", "B", "C", "D"]
var question3Answers = ["A", "B", "C", "D"]
var question4Answers = ["A", "B", "C", "D"]

var secondsLeft = 100;
console.log(scoresButton)

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
        answerCEl.textContent = question1Answers[2];
        answerDEl.textContent = question1Answers[3];
    }
    else if (randomNum === 1) {
        answerAEl.textContent = question2Answers[0];
        answerAEl.value = true;
        answerBEl.textContent = question2Answers[1];
        answerCEl.textContent = question2Answers[2];
        answerDEl.textContent = question2Answers[3];
    }
    else if (randomNum === 2) {
        answerAEl.textContent = question3Answers[0];
        answerAEl.value = true;
        answerBEl.textContent = question3Answers[1];
        answerCEl.textContent = question3Answers[2];
        answerDEl.textContent = question3Answers[3];
    }
    else if (randomNum === 3) {
        answerAEl.textContent = question4Answers[0];
        answerAEl.value = true;
        answerBEl.textContent = question4Answers[1];
        answerCEl.textContent = question4Answers[2];
        answerDEl.textContent = question4Answers[3];
    }

}