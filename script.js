var startEl = document.querySelector(".start");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector(".question");
var saveScoreButton = document.querySelector("#saveScore");
var cursor = 0;
var score = 0;

var questions = [
    {
        text: "1 of 5. Javascript files should be inserted:",
        correctAnswer: "a",
        possible: [
            "a. before </body> element",
            "b. after </body> element",
            "c. within <head> element",
            "d. after </html> element",
        ],
    },
    {
        text: "2 of 5. Event delegation targets: ",
        correctAnswer: "c",
        possible: [
            "a. only the children elements",
            "b. a single element on the page",
            "c. a common parent element",
            "d. all click events",
        ],
    },
    {
        text: "3 of 5. What is the proper syntax for a function in Javascript?",
        correctAnswer: "e",
        possible: [
            "a. var someName = function () {}; ", //function expression
            "b. function someName () {}; ", //function declaration
            "c. var = someName function () {};",
            "d. all of the above",
            "e. only a and b",
        ],
    },
    {
        text: "4 of 5. What information is stored within the () of function someName () {}; ?",
        correctAnswers: "d",
        possible: [
            "a. console.log();",
            "b. if else statements",
            "c. logic of the function",
            "d. parameters to be passed into the function",
        ],
    },
    {
        text: "5 of 5. What is the proper syntax for creating an array?",
        correctAnswers: "a",
        possible: [
            "a. var items = ['item1', 'item2']; ",
            "b. var items = {item1, item2}; ",
            "c. var items = ('item1', 'item2')",
            "d. var items = [item1; item2]; ",
        ],
    },

];
// contains questionText , correctAnswer, possible

correctAnswers = ["a", "c", "e", "d", "a"];

//displayQuestions
var displayQuestion = function () {
    
    questionEl.querySelector("h3").textContent = questions[cursor].text;
    questionEl.querySelector("#possible").innerHTML = null;
   
    for (var buttonLabel of questions[cursor].possible){
        var buttonEl = document.createElement("button");
        buttonEl.textContent = buttonLabel;
        buttonEl.dataset.choice = buttonLabel[0];
        questionEl.querySelector("#possible").appendChild(buttonEl);
    }
    // if (questions.length - 1){
    //     console.log('im here');
    //     saveScore();
    // }
};

function saveScore(){
    document.querySelector(".question").style.display = "none";
}


// advancing through questions
var advance = function (event) {
    var element = event.target;
    
    if (element.matches(".question button")){
        
        element.dataset.choice === correctAnswers[cursor];
        
        if (cursor < questions.length -1) {
            cursor++;
            questionEl.dataset.index = cursor;
            console.log(questionEl.dataset.index);
        } 
        if (cursor == questions.length -1){
            console.log('im here');
        }
        score++;
        displayQuestion();

    } else {
        
        element.dataset.choice !== correctAnswers[cursor];
        score--;
        displayQuestion(); 
    }
    // console.log(score); // score--; not working 
};


// getting rid of "start" button after click:
function change () {
    document.querySelector(".start").style.display = "none";
}


startEl.addEventListener("click", countdownTimer);
document.addEventListener("click", advance);
// advances us on any click


// countdownTimer() works to keep track of the timer.
function countdownTimer(){
    var secondsLeft = 10;
    displayTime(secondsLeft);
    
    // console.log(secondsLeft);
    
    var timerInterval = setInterval(function() {
        secondsLeft--;
        displayTime(secondsLeft);
        
        
        if (secondsLeft === 0){
            clearInterval(timerInterval);
            timerEl.textContent = "Time's up!";
            saveScoreForm(); //empty function
        }
        
    }, 1000);
}

//displayTime() maintains proper labels on countdownTimer
function displayTime(secondsLeft){
    var timeLabel = "seconds";

    if (secondsLeft === 1) {
        timeLabel = "second";
    }

    timerEl.textContent = "Time left: " + secondsLeft + " " + timeLabel;
};

//save scores to local storage
saveScoreButton.addEventListener("click", function (event){
    event.preventDefault();

    var initials = document.querySelector("#initials").value;

    if (initials === ""){
        displayMessage("Initials cannot be left blank");
    }

    localStorage.setItem('initials', initials);
    renderLastScores(); //empty function rn

});