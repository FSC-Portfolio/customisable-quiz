"use strict";
var loadedQuestions;
var currentQuestion = 0;

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
        // loadedQuestions.forEach(function (item) {
        //     console.log(item);
        // })
    }
}

function playGame() {
    $('#main-text').html(loadedQuestions[currentQuestion].title);
    var answerList = $('#answer-list');
    answerList.html("");
    var actualAnswer = loadedQuestions[currentQuestion].answer;
    $(loadedQuestions[currentQuestion].choices).each(function (index, item) {
        var choiceDivRow = $('<div>');
        choiceDivRow.attr("class", "row");
        var choiceDivCol = $('<div>');
        choiceDivCol.attr("class", "col-md-12");
        choiceDivCol.html('<button type="button" id="'+ item +'" class="btn btn-primary btn-lg">' + item +'</button>');
        choiceDivRow.append(choiceDivCol);
        $('#answer-list').append(choiceDivRow);
    })



    $('#answer-list').click(function(event){
        event.preventDefault();
        // make sure we're clicking on a button
        if (event.target.matches(".btn")) {
            // check the result
            if (event.target.id === actualAnswer) {
                console.log("okies");
                currentQuestion += 1;
                playGame();
            } else {
                console.log("nokies");
            }
        }
    })
}


// <div class="row">
//     <div class="col-md-12">
//         <button type="button" class="btn btn-primary btn-lg">answer</button>
//     </div>
// </div>
//
// <div className="row">
//     <div className="col">
//         <button type="button" className="btn btn-primary btn-lg">answer</button>
//     </div>
// </div>
//
// <div className="row">
//     <div className="col">
//         <button type="button" className="btn btn-primary btn-lg">answer</button>
//     </div>
// </div>
//
// <div className="row">
//     <div className="col">
//         <button type="button" className="btn btn-primary btn-lg">answer</button>
//     </div>
// </div>
    // display the first question
    // display the answers
    // when someone clicks an answer
    // validate against known answer
    // if a wrong question is selected subtract 10 seconds from the timer.
    // if a correct answer is selected move to next question
    // when completed
    // stop the clock
    // ask for initials to go on high score page

function theCounter(countdownSeconds) {
    // This is the countdown timer.
    // TODO needs to return a flag when started to stop user restarting!
    var counter = countdownSeconds;
    var interval = setInterval(function () {
        counter--;
        if (counter <= 0) {
            clearInterval(interval);
            $('#seconds').html("Count down complete");
            return;
        } else {
            $('#seconds').text(counter);
        }
    }, 1000);
}

$('#btn-start').click(function () {
    theCounter(60);
    playGame();
});

loadData();