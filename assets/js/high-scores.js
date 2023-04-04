//TODO: display ranked list of high scores
//TODO: be able to clear high scores list

var scoresList = document.querySelector("#scores-list");
var clearScores = document.querySelector("#clear-scores");

// function gets user scores from local storage and displays it in an ordered list
function displayScores() {
    var allUsers = JSON.parse(localStorage.getItem("userDetails")); // grab array of user details

    var iterations = allUsers.length;
    var index = 0; // look for index with greatest value

    while(iterations > 0) {
        // find index of array that contains user with the highest score
        for(var i = 0; i < allUsers.length; i++) {
            if(allUsers[i] === null) { continue;}

            if(allUsers[index] === null || allUsers[index].score < allUsers[i].score) {
                index = i;
                continue;
            }
        }

        var liEl = document.createElement("li");
        liEl.textContent = allUsers[index].name + "-" + allUsers[index].score;
        scoresList.append(liEl);

        allUsers[index] = null;
        index = 0;
        iterations--;
    }
}

displayScores(); // display scores as soon as page loads