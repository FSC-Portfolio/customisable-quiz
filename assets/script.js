"use strict";

function setDefault() {
    localStorage.setItem("qanda", JSON.stringify(questions));
    // $('#main-text').html(JSON.stringify(questions));
}

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
        setDefault();
    } else {
        // Load the questions and shuffle them.
        var loadedQuestions = shuffleArray(JSON.parse(localStorage.getItem("qanda")));
        loadedQuestions.forEach(function (item) {
            console.log(item);
        })

    }
}

loadData();