var startEl = document.querySelector('#startButton');
var timerEl = document.querySelector('#timer');
var questionsEl = document.querySelector('.questions');
var cursor = 0;
var score = 0;

var questionsArray = [
    {
        questionText: "Javascript files should be inserted:",
        answer: "a",
        possible: [
            "a. before </body> element",
            "b. after </body> element",
            "c. within <head> element",
            "d. after </html> element",
        ],
    },
    {
        questionText: "Event delegation targets: ",
        answer: "c",
        possible: [
            "a. only the children elements",
            "b. a single element on the page",
            "c. a common parent element",
            "d. all click events",
        ],
    },
    {
        questionText: "What is the proper syntax for a function in Javascript?",
        answer: "e",
        possible: [
            "a. var someName = function () {}; ", //function expression
            "b. function someName () {}; ", //function declaration
            "c. var = someName function () {};",
            "d. all of the above",
            "e. only a and b",
        ],
    },
    {
        questionText: "What information is stored within the () of function someName () {}; ?",
        answer: "d",
        possible: [
            "a. console.log();",
            "b. if else statements",
            "c. logic of the function",
            "d. parameters to be passed into the function",
        ],
    },
    {
        questionText: "What is the proper syntax for creating an array?",
        answer: "a",
        possible: [
            "a. var items = ['item1', 'item2']; ",
            "b. var items = {item1, item2}; ",
            "c. var items = ('item1', 'item2')",
            "d. var items = [item1; item2]; ",
        ],
    },

];


var displayQuestion = function () {
    countdownTimer(); 
    
    questionsEl.querySelector('h3').textContent = questionsArray[cursor].questionText;
    questionsEl.querySelector('#possible').innerHTML = null;
   
    for (var buttonLabel of questionsArray[cursor].possible){
        var buttonEl = document.createElement('button');
        buttonEl.textContent = buttonLabel;
        buttonEl.dataset.choice = buttonLabel[0];
        questionsEl.querySelector('#possible').appendChild(buttonEl);
    }
};

// startEl.addEventListener('click', displayQuestion);

var advance = function (event){
    var element = event.target;

    if (element.matches('.questions button')){
        element.dataset.choice === questionsArray[cursor].answer;
        
    if (cursor < questionsEl.length - 1) {
        cursor++;
        questionsEl.dataset.index = cursor;
    }
        displayQuestion();
    }

};

document.addEventListener('click', advance);
// advances us on any click


// countdownTimer() works to keep track of the timer. setInterval(function () {what to do}, 1000) acts on secondsLeft to go down by 1 second every 1000m and to clearInterval() || stop the timerInterval || when secondsLeft === 0.   
function countdownTimer(){
    var secondsLeft = 60;
    displayTime(secondsLeft);
    
    // console.log(secondsLeft);
    
    var timerInterval = setInterval(function() {
        secondsLeft--;
        displayTime(secondsLeft);
        
        
        if (secondsLeft === 0){
            clearInterval(timerInterval);
            gameOverMessage();
            timerEl.textContent = '';
        }
        
    }, 1000);
}

//displayTime() maintains proper labels on countdownTimer
function displayTime(secondsLeft){
    var timeLabel = 'seconds';

    if (secondsLeft === 1) {
        timeLabel = 'second';
    }

    timerEl.textContent = 'Time left: ' + secondsLeft + ' ' + timeLabel;
}

function gameOverMessage() {
    // create a function that displays a game over message
}



displayQuestion();