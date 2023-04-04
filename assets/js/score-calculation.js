//TODO: display final score as amount of time remaining


//var timeLeft = document.querySelector(".score");
var userName = document.querySelector("#user-initials");
var finalScore = document.querySelector(".score");
var timer = document.querySelector("#final-score")
var submitButton = document.querySelector("#submit-button");

// display the final score as amount of time remaining
function displayFinalScore(timeLimit) {
    if(localStorage.getItem("score") === null) {
        alert("You did not play the game!");
    }
    else {
        finalScore.textContent = localStorage.getItem("score");
        timer.textContent = localStorage.getItem("score");
    }
}

// saves user's initials and score in local storage as an object
function saveUserInfo(event) {
    event.preventDefault();
    // checks if user redirected to this page without actually playing the game
    if(localStorage.getItem("score") !== null) {
        // checks for invalid initials, like using blank spaces
        if(userName.value.trim().length > 0) {
            // create object userInfo to store user initials and score
            var userInfo = {
                name: userName.value.trim(), // remove spaces
                score: finalScore.textContent
            };

            var allUsers;
            // if no user scores are saved yet, create new array and push current user score
            if(localStorage.getItem("userDetails") === null) {
                allUsers = [];
                allUsers.push(userInfo);
                localStorage.setItem("userDetails", JSON.stringify(allUsers));
            } 
            else {
                // get array of user scores
                allUsers = JSON.parse(localStorage.getItem("userDetails"));

                // check for same initials
                for(var i = 0; i < allUsers.length; i++) {
                    // if initials are the same and they set a personal best, replace their score with new one
                    if(allUsers[i].name === userInfo.name) {
                        // replace old score with new higher score
                        if(allUsers[i].score < userInfo.score) {
                            allUsers[i] = userInfo;
                            localStorage.setItem("userDetails", JSON.stringify(allUsers));
                        }
                        window.location.href = "high-score.html"; // transition to high scores screen
                        return;
                    }
                }

                allUsers.push(userInfo);
                localStorage.setItem("userDetails", JSON.stringify(allUsers));
            }

            window.location.href = "high-score.html"; // transition to high scores screen
        }
        else {

            alert("Please write valid initials.");
        }
    }
    else {
        alert("You did not play the game!");
    }
}

submitButton.addEventListener("click", saveUserInfo);

displayFinalScore();