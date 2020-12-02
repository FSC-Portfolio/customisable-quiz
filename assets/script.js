"use strict";

function setDefault() {
    localStorage.setItem("qanda", JSON.stringify(questions));
    // $('#main-text').html(JSON.stringify(questions));
}

function loadData() {
    if(!localStorage.getItem("qanda")) {
        console.log("empty storage");
        // it's the first time playing so set the default
        setDefault();
    } else {
        // Load the questions
        var loadedQuestions = JSON.parse(localStorage.getItem("qanda"));
        loadedQuestions.forEach(function (question, index) {
            console.log(index, question.title);
        })
        console.log("load status...")
    }
    // otherwise load the existing data.
}

loadData();