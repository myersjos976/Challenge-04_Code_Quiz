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
var quizOverPage = document.querySelector("#quiz-over");
var quizScorePage = document.querySelector("#high-scores");

var startButton = document.querySelector("#start-button");
var submitButton = document.querySelector("#submit-button");
var goBackButton = document.querySelector("#go-back-button");
var clearScoresButton = document.querySelector("#clear-scores-button");
var highScoreLink = document.querySelector("#high-scores-link");

var timerEl = document.querySelector("#timer");
var isCorrectEl = document.querySelector("#bottom-bar");
var finalScoreEl = document.querySelector("#final-score");
var scoreListEl = document.querySelector("#score-list");

var timeLeft;
var timerInterval;
var highScores;
var answerKey = ['b', 'd', 'a', 'c', 'b', 'c', 'd', 'c', 'b', 'a'];
var questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];

/*
    Clears all pages and elements from the screen.
    Exceptions include: the top header, high score link, and footer.
*/
function clearScreen()
{
    startPage.style.display = 'none';
    isCorrectEl.style.display = 'none';
    timerEl.style.display = 'none';
    for (let x = 0; x < questions.length; x++)
    {
        questions[x].style.display = 'none';
    }
    quizOverPage.style.display = 'none';
    quizScorePage.style.display = 'none';
}

/* 
    Makes start page visible and hides all others.
    Start page contains a start quiz button which when pressed will call startQuiz().
*/
function openStartPage()
{
    clearScreen();
    startPage.style.display = 'block';

    // When start button is pressed, start the quiz.
    startButton.addEventListener("click", function(event) {
    startQuiz();
    });
}

// Starts the quiz.
function startQuiz()
{
    timerEl.style.display = 'block';
    isCorrectEl.style.display = 'block';

    startTimer();
    openQuestionPage(1);
}

// Creates a 5 minute timer.
function startTimer() 
{
    timerEl.style.display = 'block';
    timeLeft = 400;
    timerInterval = setInterval(function () {
        if (timeLeft >= 1) {
            timerEl.textContent = "Time left: " + timeLeft;
            timeLeft--;
        }
        else {
            timerEl.textContent = "";
            clearInterval(timerInterval);
        }
    }, 1000);
}

/*
    Displays the question page corresponding to the input number.
    Updates the currentQuestion and hides all sections except for the currentQuestion's page.
*/
function openQuestionPage(number)
{
    var currentQuestion = number;
    
    //Clears the previous question if there is one, else clears start page.
    if (currentQuestion > 1) {
        questions[currentQuestion - 2].style.display = 'none';
    }
    else {
        startPage.style.display = 'none';
    }

    //Now display the new question.
    questions[currentQuestion - 1].style.display = 'block';

    /*  
        The 4 following event listeners create 4 buttons for each question.
        If answer matches answerKey, than correct is displayed.
        Else, the answer doesn't match answerKey, so incorrect is displayed and timer is decremented by 10.
        After, the next question is opened.
    */
    var aButton = document.querySelector("#answer-a" + currentQuestion);
    var bButton = document.querySelector("#answer-b" + currentQuestion);
    var cButton = document.querySelector("#answer-c" + currentQuestion);
    var dButton = document.querySelector("#answer-d" + currentQuestion);

    aButton.addEventListener("click", function(event) {
        if (answerKey[currentQuestion -  1] === 'a') {
            isCorrectEl.textContent = "Correct";
        }
        else {
            isCorrectEl.textContent = "Incorrect";
            timeLeft = timeLeft - 10;
        }

        if (currentQuestion < 10) {
            
            openQuestionPage(currentQuestion + 1);
        }

        else {
            openQuizOverPage();
        }
    });

    bButton.addEventListener("click", function(event) {
        if (answerKey[currentQuestion - 1] === 'b') {
            isCorrectEl.textContent = "Correct";
        }
        else {
            isCorrectEl.textContent = "Incorrect";
            timeLeft = timeLeft - 10;
        }

        if (currentQuestion < 10){
            openQuestionPage(currentQuestion + 1);
        }
        else {
            openQuizOverPage();
        }
    });

    cButton.addEventListener("click", function(event) {
        if (answerKey[currentQuestion - 1] === 'c') {
            isCorrectEl.textContent = "Correct";
        }
        else {
            isCorrectEl.textContent = "Incorrect";
            timeLeft = timeLeft - 10;
        }

        if (currentQuestion < 10) {
            openQuestionPage(currentQuestion + 1);
        }
        else {
            openQuizOverPage();
        }
    });

    dButton.addEventListener("click", function(event) {
        if (answerKey[currentQuestion - 1] === 'd') {
            isCorrectEl.textContent = "Correct";
        }
        else {
            isCorrectEl.textContent = "Incorrect";
            timeLeft = timeLeft - 10;
        }

        if (currentQuestion < 10) {
            openQuestionPage(currentQuestion + 1);
        }
        else {
            openQuizOverPage();
        }
    });
}

/*
    Called once the quiz has ended (whether by running out of time or all questions being answered).
    The timer is cleared and the quizOver screen opened. This screen allows the user to see their score
    and enter their initials into the high scores list. 
*/
function openQuizOverPage()
{
    clearInterval(timerInterval);
    clearScreen();
    quizOverPage.style.display = 'block';
    var score = timeLeft;

    finalScoreEl.textContent = "Your final score is: " + score;

    //Collects initials from the user and stores their score in a 2D array for high scores using local storage.
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();       
        var initials = document.querySelector("#initials")

        if (initials === "") {
            displayMessage("error", "Initials cannot be blank.");
        }
        else {
            var tempScoreArray;
            var newScore = [initials, score];
            var scoreChecked = newScore;

            //Sorts high scores if array is bigger than 0.
            if(highScores.length > 0) {
                for (var x = 0; x < highScores.length; x++)
                {   
                    //Checks if score is bigger or equal to current score.            
                    if (scoreChecked[1] >= highScores[x][1]) {
                        //Store old values in temp array.
                        tempScoreArray = highScores[x];
                        
                        //Put in the new values.
                        highScores[x] = scoreChecked;

                        //Now old array will be compared with rest of the 2D array.                    
                        scoreChecked = tempScoreArray;
                    }
                }
            }
            else {
                highScores.concat(scoreChecked);
            }

            localStorage.setItem("highScores", highScores);

            openHighScoresPage();
        }

    });
}

/*
    Opens the high scores page and grabs the scores from local storage if there are any.
    If the user wants to go back to start page or clear high scores, there are buttons for both.
*/
function openHighScoresPage()
{
    clearScreen();
    quizScorePage.style.display = 'block';

    if (localStorage.getItem("highScores") !== null) {
        highScores = localStorage.getItem("highScores");
    }

    for (var r = 0; r < highScores.length; r++)
    {
        var scoreRow = document.querySelector("#score" + r);
        scoreRow.innerHTML = "" + highScores[r][0] + " " + highScores[r][1]; 
    }

    goBackButton.addEventListener("click", function(event) {
        event.preventDefault();
        openStartPage();
    });

    clearScoresButton.addEventListener("click", function(even) {
        highScores = [];
        localStorage.clear();
    })
}

// When webpage is opened, the start page is opened first.
openStartPage();

//When high score link is clicked, show high score page.
highScoreLink.addEventListener("click", function(event) {
    event.preventDefault();
    clearInterval(timerInterval);
    openHighScoresPage();
});