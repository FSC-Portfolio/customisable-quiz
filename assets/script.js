"use strict";
var loadedQuestions;
var currentQuestion = 0;
var counter = 0;
var timer;

function shuffleArray(arrayToShuffle) {
    // Shuffles whatever array is parsed to it.
    for(var i = arrayToShuffle.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i)
        var temp = arrayToShuffle[i];
        arrayToShuffle[i] = arrayToShuffle[j];
        arrayToShuffle[j] = temp;
    }
    // Return shuffled result.
    return arrayToShuffle;
}

function loadData() {
    if(!localStorage.getItem("qanda")) {
        console.log("empty storage");
        // it's the first time playing so set the default
        localStorage.setItem("qanda", JSON.stringify(shuffleArray(questions)));
    } else {
        // Load the questions.
        loadedQuestions = JSON.parse(localStorage.getItem("qanda"));
    }
}


// Borrowed a good portion of the timer from
// https://codepen.io/joshLongmire3/pen/prJrZV
function countDown(seconds, callback) {
    //callback = callback || function(){};
    timer = setInterval(function() {
        document.getElementById("seconds").innerHTML = "Number: " + seconds;
        seconds-- || (clearInterval(timer), callback());
        counter = seconds +1;
    }, 1000);
}


function theCounter(totalSeconds) {
    countDown(totalSeconds, function () {
        $('seconds').html("Countdown done!");
    });
}

function theCounterStop(){
    clearInterval(timer);
}


function playGame() {
    $('#main-text').html(loadedQuestions[currentQuestion].title);
    var answerList = $('#answer-list');
    answerList.html("");
    var actualAnswer = loadedQuestions[currentQuestion].answer;
    $(loadedQuestions[currentQuestion].choices).each(function (index, item) {
        // set the variables
        var newButton = $('<button>');
        var choiceDivRow = $('<div>');
        choiceDivRow.attr("class", "row");
        var choiceDivCol = $('<div>');
        choiceDivCol.attr("class", "col-md-12");

        newButton.attr("id", item);
        newButton.attr("type", "button");
        newButton.attr("name", item);
        newButton.attr("class", "gameButton btn btn-primary btn-lg");
        newButton.html(item);

        choiceDivCol.append(newButton);

        // choiceDivCol.html('<button type="button" id="' + item + '" class="btn btn-primary btn-lg">' + item + '</button>');
        choiceDivRow.append(choiceDivCol);
        $('#answer-list').append(choiceDivRow);
    });


    $('#answer-list').click(function(event){
        event.preventDefault();
        // make sure we're clicking on a button
        if (event.target.matches(".gameButton")) {
            // check the result
            if (event.target.id === actualAnswer) {
            // if (event.target.id === actualAnswer) {
                if (currentQuestion + 1 < loadedQuestions.length ) {
                    console.log("current q: ", currentQuestion);
                    currentQuestion += 1;
                    playGame();
                } else {
                    console.log("we're ending the game with a score of ", counter);
                    theCounterStop();
                    // window.location.href = "highscore.html";
                }
            } else {
                console.log("counter is at ", counter);
                theCounter(counter - 10);
            }
        }
    })
}

    // when completed
    // stop the clock
    // ask for initials to go on high score page


$('#btn-start').click(function () {
    theCounter(60);
    playGame();
});

loadData();