//TODO: Game starts as soon as I hit the start button
    //TODO: timer starts counting down
    //TODO: Question appears on the screen
        //TODO: Four corresponding answers are presented

//TODO: When I click one of four answers
    //TODO: If answer is incorrect, subtract 10 seconds from timer
    //TODO: Regardless of correct answer, move to next question

//TODO: Display if previous answer was right or wrong

//TODO: If all questions are answered or timer reaches 0, transition to game over screen
    //TODO: display final score as amount of time remaining

// grab HTML elements using document object
var timeLeft = document.querySelector("#time-left");
var gameQuestion = document.querySelector("#game-question");
var buttonAnswers = [document.querySelector("#answer-1"), document.querySelector("#answer-2"), document.querySelector("#answer-3"), document.querySelector("#answer-4")];
var anyAnswer = document.querySelector(".answer");

var timeLimit = 100; // initialize time limit
var isGameOver = false; // checks if player has won the game or not

    // array of questions, possible answers and correct answers
var quizQuestions = [
    {question: "John Cena won his first World Championship from ________.",
    answers: ["Randy Orton", "Triple H", "Kurt Angle"],
    correctAnswer: "JBL"}
];

// pop last value from array and display that question to the user
var question = quizQuestions.pop();

function startGame() {
    console.log("start game");
    // display first question
    displayQuestion();

    startTimer(); // start the timer
}

function startTimer() {
    var timeInterval = setInterval(function() {
        timeLeft.textContent = timeLimit;
        timeLimit--;
        
        // game ends when timer runs out or user has answered every question
        if(isGameOver || timeLimit < 0) {
            // end game
            clearInterval(timeInterval);
        }
    }, 1000);
}

// displays the next question and its possible answers to the webpage
function displayQuestion() {
    if(question === null) {
        isGameOver = true; // user has answered all the questions
        return;
    }

    gameQuestion.textContent = question.question;

    var randNum = Math.floor(Math.random() * 4); // determines placement of right answer
    var answersIncrement = 0; // iterator for wrong answers

    // this loop ensures that the correct answer always appears in a random position
    for(var i = 0; i < 4; i++) {
        if(i == randNum) {
            buttonAnswers[i].textContent = question.correctAnswer;
            continue;
        }

        buttonAnswers[i].textContent = question.answers[answersIncrement];
        answersIncrement++;
    }
}

anyAnswer.addEventListener("click", function(event) {
    var answer = anyAnswer.innerHTML;
    console.log(answer);
    if(answer !== question.correctAnswer) {
        if(timeLimit - 10 < 0) {
            timeLimit = 0;
        }
        else {
            timeLimit -= 10; // penalize user for a wrong answer, subtracts 10 seconds from time
        }
    } 

    // grab next question and display it to the webpage
    question = quizQuestions.pop;
    displayQuestion();
});


startGame(); // start quiz game