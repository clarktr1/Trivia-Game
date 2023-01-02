// 1. Create HTML layout
// 2. Set each button to toggle display for the subsequent question.
// 3. Set a timer that counts down by 1 second from 30 seconds.
// 4. On 'correct' answers, advance the question by changing display. On 'wrong answers', take away 5 seconds from the timer.
// 4.a.(optional) In addition, the remaining timer time is added to the score. May also leave it at a static number.
// 5. Final button displays high score screen and stores data into local Storage. Sorts in the OL.


// Dom Elements
intro = document.getElementById('intro');
timeEl = document.getElementById('time');
startEl = document.getElementById('start');
startAgainEl = document.getElementById('start-again')
highscoreEl = document.getElementById('high-score');
scoreEl = document.getElementById('score');
questionOne = document.getElementById('q1');
questionTwo = document.getElementById('q2');
questionThree = document.getElementById('q3');
questionFour = document.getElementById('q4');
questionFive = document.getElementById('q5');
finishEl = document.getElementById('finish');
listEl = document.getElementById('list');
inputEl = document.getElementById('name');
submitEl = document.getElementById('submit');

// Timer

startEl.addEventListener('click', setTime);

let timerInterval;
var secondsLeft = 30;

function setTime() {

    timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft;
  
      if(secondsLeft <= 0) {
        clearInterval(timerInterval);
        questionOne.style.display = 'none';
        questionTwo.style.display = 'none'
        questionThree.style.display = 'none';
        questionFour.style.display = 'none';
        questionFive.style.display = 'none';
        finishEl.style.display = 'block';

        timeEl.textContent = 0;
      }
    
  
    }, 1000);
  }

function stopTimer (){
    clearInterval(timerInterval);
};

function decrementTimer() {

    secondsLeft -= 5;
    alert('Wrong! Try again.');

};

// Change Display

highscoreEl.addEventListener('click', viewScore);
startEl.addEventListener('click', toggleOne);
document.getElementById('correct1').addEventListener('click', toggleTwo);
document.getElementById('correct1').addEventListener('click', updateScore);
document.getElementById('correct2').addEventListener('click', toggleThree);
document.getElementById('correct2').addEventListener('click', updateScore);
document.getElementById('correct3').addEventListener('click', toggleFour);
document.getElementById('correct3').addEventListener('click', updateScore);
document.getElementById('correct4').addEventListener('click', toggleFive);
document.getElementById('correct4').addEventListener('click', updateScore);
document.getElementById('correct5').addEventListener('click', finalToggle);
document.getElementById('correct5').addEventListener('click', updateScore);
document.getElementById('start-again').addEventListener('click', returnHome);
var wrongChoice = document.querySelectorAll('#wrong');
console.log(wrongChoice);

for (var button of wrongChoice) {
    button.addEventListener('click', decrementTimer);
}

function play() {
    var audio = document.getElementById('audio');
    if (audio.paused){
        audio.play();
    } else{
        audio.play();
        audio.currentTime = 0;
    }
}


function updateScore() {
    let currentScore = parseInt(scoreEl.textContent, 10);
    currentScore += secondsLeft;
    scoreEl.textContent = currentScore;
    var lastScore = document.getElementById('final-score');
    lastScore.textContent = scoreEl.textContent;
    if (scoreEl.textContent = '0') {
        lastScore.textContent = '0';
    }
};

function viewScore() {
    intro.style.display = 'none';
    finishEl.style.display = 'block';
};

function toggleOne() {
    intro.style.display = 'none';
    questionOne.style.display = 'block';   
};

function toggleTwo() {
    questionOne.style.display = 'none';
    questionTwo.style.display = 'block'; 
    play();
};

function toggleThree() {
    questionTwo.style.display = 'none';
    questionThree.style.display = 'block';
    play()
};

function toggleFour() {
    questionThree.style.display = 'none';
    questionFour.style.display = 'block';
    play()
};

function toggleFive() {
    questionFour.style.display = 'none';
    questionFive.style.display = 'block';
    play()
};

function finalToggle(){
    questionFive.style.display = 'none';
    finishEl.style.display = 'block';
    play()
    stopTimer();
    
};

function returnHome(){
    finishEl.style.display = 'none';
    intro.style.display = 'block';
    secondsLeft = 30;
    scoreEl.textContent = 0;
    timeEl.textContent = 30;
};



//Set to Local Storage
    submitEl.addEventListener('click', addToList);
    function saveScore(){

        var finalScore = scoreEl.textContent;
        localStorage.setItem('score', finalScore);
    }; 

    function saveName(){
        var inputValue = inputEl.value;
        localStorage.setItem('name', inputValue);
    };

  
    function addToList(event) {
 
        console.log(submitEl);
        event.preventDefault();
        saveScore();
        saveName();
        var storedScore = localStorage.getItem('score');
        var storedName = localStorage.getItem('name');

        var listItem = document.createElement('li');
        listItem.textContent = storedName + "   " + storedScore;

        listEl.appendChild(listItem);
    };

    // Extra Sounds

    const ding = document.getElementById('correct-sound');
 