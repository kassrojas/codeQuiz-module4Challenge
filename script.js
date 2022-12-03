var nextEl = document.querySelector('#next');
var cursor = 0;
var questions = [
    "Did you have a break?",
    "Do you like icecream?", 
    "What's your favorite pizza topping?", 
    "What's your favorite weekday?"]


var displayQuestion = function () {
    nextEl.textContent = questions[cursor];
};

var advance = function (){
    if (cursor < questions.length - 1) {
        cursor++;
        displayQuestion();
    }

};

nextEl.addEventListener('click', advance);

displayQuestion();