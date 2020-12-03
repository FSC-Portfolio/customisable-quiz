"use strict";

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

function setDefault() {
    // Shuffle and store the questions.
    localStorage.setItem("qanda", JSON.stringify(shuffleArray(questions)));
    // $('#main-text').html(JSON.stringify(questions));
}

function loadData() {
    if(!localStorage.getItem("qanda")) {
        console.log("empty storage");
        // it's the first time playing so set the default
        setDefault();
    } else {
        // Load the questions.
        var loadedQuestions = JSON.parse(localStorage.getItem("qanda"));
        // loadedQuestions.forEach(function (item) {
        //     console.log(item);
        // })
    }
}

function theCounter(countdownSeconds) {
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
    console.log("heya");
    theCounter(60);
});

loadData();