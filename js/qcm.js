let attempts = 0;

function quizAlert() {
    //Check filedset completed
    var fieldset = document.getElementById("information");
    var inputs = fieldset.querySelectorAll("input, select, textarea");

    var allFilled = true;
    
    inputs.forEach(function(input) {
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
        confirmation.textContent = timer + "seconds"; 

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
        window.location.href = "home.html"; 
    } 
}


document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");

    document.getElementById("submit").addEventListener("click", function () {

        if (attempts >= 3) {
            this.disabled = true;
            return;
        }
        

        const score = submitQuiz();
        attempts++;

        const result = document.getElementById("result");
        const row = document.createElement("tr");

        const attemptsCell = document.createElement("td");
        attemptsCell.textContent = attempts;

        const scoreCell = document.createElement("td");
        scoreCell.textContent = score;

        row.appendChild(attemptsCell);
        row.appendChild(scoreCell);
        result.querySelector("tbody").appendChild(row);

        resetQuiz();

        if (attempts >= 3){
            this.disabled = true;
        }

    });
});

function submitQuiz() {
    let score = 0;

    for (let answer of document.querySelectorAll("input[type='radio']:checked")) {
        if (answer.value === "a") score += 4;
    }

    for (let answer of document.querySelectorAll("input[type='checkbox']:checked")) {
        if (["a", "b"].includes(answer.value)) 
            score += 3;
        else if (answer.value === "c") 
            score -= 3;
    }
    return score;
}


function resetQuiz() {

    document.querySelectorAll("input[type='radio']:checked").forEach((input) =>{
        input.checked = false;
    });

    document.querySelectorAll("input[type='checkbox']:checked").forEach((input) => {
        input.checked = false;
    });

    window.scrollTo(0, 0);
}

    
