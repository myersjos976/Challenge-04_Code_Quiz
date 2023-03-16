var startPage = document.querySelector("#start-page");
var question1 = document.querySelector("#question-1");
var question2 = document.querySelector("#question-2");
var question3 = document.querySelector("#question-3");
var question4 = document.querySelector("#question-4");
var question5 = document.querySelector("#question-5");
var question6 = document.querySelector("#question-6");
var question7 = document.querySelector("#question-7");
var question8 = document.querySelector("#question-8");
var question9 = document.querySelector("#question-9");
var question10 = document.querySelector("#question-10");

var startButton = document.querySelector("#start-button");
var aButton = document.querySelector("answer-a");
var bButton = document.querySelector("answer-b");
var cButton = document.querySelector("answer-c");
var dButton = document.querySelector("answer-d");

var timerEl = document.querySelector("#timer");
var answerKey = ['b', 'd', 'a', 'c', 'b', 'c', 'd', 'c', 'b', 'a'];
var questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];

// Make start page visible and hide all others.
function openStartPage()
{
    startPage.style.display = 'block';
    question1.style.display = 'none';
    question2.style.display = 'none';
    question3.style.display = 'none';
}

// Starts the quiz.
function startQuiz()
{
    openQuestion(1);
    startTimer();
}

// Creates a 5 minute timer.
function startTimer() {
    var timeLeft = 400;
    var timeInterval = setInterval(function () {
        if (timeLeft > 1)
        {
            timerEl.textContent = timeLeft;
            console.log(timeLeft);
            timeLeft--;
        }
        else 
        {
            timerEl.textContent = "";
            clearInterval(timeInterval);
        }
    }, 1000);
}

//Displays quiz question of number starting at 1.
function openQuestion(number)
{
    startPage.style.display = 'none';
    for(let x = 0; x < questions.length; x++)
    {
        questions[x].this.style.length = 'none';
    }
    questions[number - 1].style.length = 'block';
}

// When page is opened, load start page.
openStartPage();


// When start button is pressed, start the quiz.
startButton.addEventListener("click", function(event) {
    startQuiz();
});

// Creates buttons for each question.
// aButton.addEventListener("click", function(event) {

// });

// bButton.addEventListener("click", function(event) {

// })

// cButton.addEventListener("click", function(event) {
    
// })

// dButton.addEventListener("click", function(event) {
    
// })