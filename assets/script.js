"use strict";

function setDefault() {
    localStorage.setItem("qanda", JSON.stringify(questions));
    // $('#main-text').html(JSON.stringify(questions));
}

function loadData() {
    if(!localStorage.getItem("qanda")) {
        console.log("empty storage");
        setDefault();
    }
}

loadData();