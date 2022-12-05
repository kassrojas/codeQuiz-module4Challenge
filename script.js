var startEl = document.querySelector(".start");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector(".question");
var saveScoreButton = document.querySelector("#saveScore");
var cursor = 0;
var score = 0;
var timerInterval;
var secondsLeft; 

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
        correctAnswer: "d",
        possible: [
            "a. console.log();",
            "b. if else statements",
            "c. logic of the function",
            "d. parameters to be passed into the function",
        ],
    },
    {
        text: "5 of 5. What is the proper syntax for creating an array?",
        correctAnswer: "a",
        possible: [
            "a. var items = ['item1', 'item2']; ",
            "b. var items = {item1, item2}; ",
            "c. var items = ('item1', 'item2')",
            "d. var items = [item1; item2]; ",
        ],
    },

];
// contains text , correctAnswer, possible

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

};

function saveScore(){
    document.querySelector(".question").style.display = "none";
    document.querySelector(".scoreForm").style.visibility = "visible";
}


// advancing through questions
var advance = function (event) {
    var element = event.target;
    
    if (element.matches(".question button")){
        console.log(element);
        if(element.dataset.choice === questions[cursor].correctAnswer) {
            score++;
            console.log(score);
        }
        else {
            secondsLeft--;
            score--;
            displayQuestion(); 
        }
    
        if (cursor < questions.length -1) {
            cursor++;
            questionEl.dataset.index = cursor;
        }
        else {
            var lastQuestion = true;
            clearInterval(timerInterval);
            timerEl.textContent = "Time's up!";
        } 
        if (lastQuestion){
            saveScore();
        }
        // score++;
        displayQuestion();
    }
    // console.log(score); // score--; not working 
};


// getting rid of "start" button after click:
function change () {
    document.querySelector(".start").style.display = "none";
}

//start button function
startEl.addEventListener("click", countdownTimer);

// advances us on any click
document.addEventListener("click", advance);


// countdownTimer() works to keep track of the timer.
function countdownTimer(){
    secondsLeft = 10;
    displayTime(secondsLeft);
    displayQuestion();

    // console.log(secondsLeft);
    if (timer){
        timerInterval = setInterval(function() {
            secondsLeft--;
            displayTime(secondsLeft);
        
        
            if (secondsLeft <= 0){
                clearInterval(timerInterval);
                timerEl.textContent = "Time's up!";
            }

        }, 1000);
    };
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