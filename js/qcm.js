function quizAlert() {
    //Check filedset completed
    var fieldset = document.getElementById("information");
    var inputs = fieldset.querySelectorAll("input, select, textarea");

    var allFilled = true;

    inputs.forEach(function (input) {
        if (input.type !== "button" && input.type !== "submit") {
            if (!input.value.trim()) {
                allFilled = false;
            }
        }
    });

    if (!allFilled) {
        alert("Please fill in all fields!");
        return;
    }

    alert("You're about to start the quiz!");
    quizConfirm();
}


// Function to show the quiz and start the countdown
function quizConfirm() {

    let res = confirm("Are you sure you want to continue?");

    if (res) {
        alert("The quiz will start in 5 seconds!");

        //add a 5-second countdown 
        var timer = 5;

        //Create an element p to display the message 
        var confirmation = document.createElement("p");
        confirmation.textContent = timer + " seconds";

        //style of message 
        confirmation.style.color = "red";
        confirmation.style.fontSize = "1.5em";
        confirmation.style.fontWeight = "bold";
        confirmation.style.textAlign = "center";

        //add the message to the page after the start id button 
        var start = document.getElementById("information");
        start.appendChild(confirmation);

        //using the setInterval function, which runs every second 
        var interval = setInterval(function () {
            //decrement countdown 
            timer--;

            //It is also displayed in the console 
            console.log(timer);

            //display the countdown in the p element created 
            confirmation.textContent = timer + " seconds";

            //if the countdown is over 
            //show the message "Here we go! Good luck!" 
            //show form 
            //show submission button 
            if (timer == 0) {
                clearInterval(interval);
                confirmation.textContent = "Here we go! Good luck!";
                document.getElementsByClassName("quiz")[0].style.display = "block";
                document.getElementsByTagName("button")[0].style.display = "block";
                information.style.display = "none";
            }
        }, 1000);

    } else {
        alert("You will be redirected to the home page!");
        window.location.href = "../../html/index.html";
    }
}


document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");

    document.getElementById("submit").addEventListener("click", function () {

        // Check if the user has filled in the information
        const score = submitQuiz();

        resetQuiz();

    });
});

function submitQuiz() {
    let score = 0;

    for (let answer of document.querySelectorAll("input[type='radio']:checked")) {
        if (window.location.href.includes("EarthLife.html")) {
            if (answer.value === "a") score += 5;
            else if (answer.value === "b") score -= 5;
            else if (answer.value === "c") score -= 5;
        }
        else {
            if (answer.value === "b") score += 5;
            else if (answer.value === "a") score -= 5;
            else if (answer.value === "c") score -= 5;
        }

    }

    for (let answer of document.querySelectorAll("input[type='checkbox']:checked")) {
        if (window.location.href.includes("EarthLife.html")) {

            if (["a", "c"].includes(answer.value))
                score += 5;
            else if (answer.value === "b")
                score -= 10;
        }
        else {
            if (["a", "c"].includes(answer.value))
                score += 5;
            else if (answer.value === "b")
                score -= 10;
        }
    }

    if (score < 10) // under the average
        alert(`You scored ${score}/20 points... try again!`);
    else if (score >= 10 && score != 20)
        alert(`You scored ${score}/20 points! Well done!`);
    else if (score === 20) // perfect score
        // Check the URL to determine which alert to show
        if (window.location.href.includes("EarthLife.html"))
            alert(`You scored ${score}/20 points! Perfect! You know Earth life better than anyone!`);
        else
            alert(`You scored ${score}/20 points! Perfect! You know Sea life better than anyone!`);
    return score;
}



function resetQuiz() {

    document.querySelectorAll("input[type='radio']:checked").forEach((input) => {
        input.checked = false;
    });

    document.querySelectorAll("input[type='checkbox']:checked").forEach((input) => {
        input.checked = false;
    });

    window.scrollTo(0, 0);
}


