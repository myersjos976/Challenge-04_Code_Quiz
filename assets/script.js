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
var timerEl = document.querySelector("#timer");
var isCorrectEl = document.getElementById("bottom-bar");

var timeLeft;
var currentQuestion;
var answerKey = ['b', 'd', 'a', 'c', 'b', 'c', 'd', 'c', 'b', 'a'];
var questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];


/* 
    Makes start page visible and hides all others.
    Start page contains a start quiz button which when pressed will call startQuiz().
*/
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
    timeLeft = 400;
    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        }
        else {
            timerEl.textContent = "";
            clearInterval(timeInterval);
        }
    }, 1000);
}

/*
    Displays the question page corresponding to the input number.
    Updates the currentQuestion and hides all sections except for the currentQuestion's page.
*/
function openQuestion(number)
{
    currentQuestion = number;
    startPage.style.display = 'none';
    for (let x = 0; x < questions.length; x++)
    {
        questions[x].style.display = 'none';
    }
    questions[number - 1].style.display = 'block';

    /*  
    The 4 following event listeners create 4 buttons for each question.
    If answer matches answerKey, than correct is displayed.
    Else, the answer doesn't match answerKey, so incorrect is displayed and timer is decremented by 10.
    After, the next question is opened.
    */
    var aButton = document.querySelector("#answer-a" + number);
    var bButton = document.querySelector("#answer-b" + number);
    var cButton = document.querySelector("#answer-c" + number);
    var dButton = document.querySelector("#answer-d" + number);


    aButton.addEventListener("click", function(event) {
        console.log("Clicked");
        if (answerKey[currentQuestion -  1] === 'a') {
            isCorrectEl.innerText = "Correct";
        }
        else {
            isCorrectEl.innerText = "Incorrect";
            timeLeft = timeLeft - 10;
        }

        if (currentQuestion < 10) {
            openQuestion(currentQuestion + 1);
        }

        else {
            openQuizOver();
        }
    });

    bButton.addEventListener("click", function(event) {
        console.log("Clicked");
        if (answerKey[currentQuestion - 1] === 'b') {
            isCorrectEl.textContent = "Correct";
        }
        else {
            isCorrectEl.textContent = "Incorrect";
            timeLeft = timeLeft - 10;
        }

        if (currentQuestion < 10){
            openQuestion(currentQuestion + 1);
        }
        else {
            openQuizOver();
        }
    });

    cButton.addEventListener("click", function(event) {
        console.log("Clicked");
        if (answerKey[currentQuestion - 1] === 'c') {
            isCorrectEl.textContent = "Correct";
        }
        else {
            isCorrectEl.textContent = "Incorrect";
            timeLeft = timeLeft - 10;
        }

        if (currentQuestion < 10) {
            openQuestion(currentQuestion + 1);
        }
        else {
            openQuizOver();
        }
    });

    dButton.addEventListener("click", function(event) {
        console.log("Clicked");
        if (answerKey[currentQuestion - 1] === 'd') {
            isCorrectEl.textContent = "Correct";
        }
        else {
            isCorrectEl.textContent = "Incorrect";
            timeLeft = timeLeft - 10;
        }

        if (currentQuestion < 10) {
            openQuestion(currentQuestion + 1);
        }
        else {
            openQuizOver();
        }
    });
}

/*
    Called once the quiz has ended (whether by running out of time or all questions being answered).
    The timer is cleared and the quizOver screen opened. This screen allows the user to see their score
    and enter their initials into the high scores list. 
*/
function openQuizOver()
{
    clearInterval();

    //TODO: Create input box for user's intitials for the high score list and save user's score information.
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// When webpage is opened, the start page is opened first.
openStartPage();

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// When start button is pressed, start the quiz.
startButton.addEventListener("click", function(event) {
    startQuiz();
});