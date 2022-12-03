var startEl = document.getElementById('startButton');
var timerEl = document.getElementById('timer');
var nextEl = document.querySelector('#next');
var cursor = 0;
var questions = [
    "Did you have a break?",
    "Do you like icecream?", 
    "What's your favorite pizza topping?", 
    "What's your favorite weekday?"]


var displayQuestion = function () {
    countdownTimer(); //starts timer at the same time as question
    nextEl.textContent = questions[cursor];
};

startEl.addEventListener('click', displayQuestion);

var advance = function (){
    if (cursor < questions.length - 1) {
        cursor++;
        displayQuestion();
    }

};


nextEl.addEventListener('click', advance);


// countdownTimer() works to keep track of the timer. setInterval(function () {what to do}, 1000) acts on secondsLeft to go down by 1 second every 1000m and to clearInterval() || stop the timerInterval || when secondsLeft === 0.   

function countdownTimer(){
    var secondsLeft = 40;
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







countdownTimer();
displayQuestion();