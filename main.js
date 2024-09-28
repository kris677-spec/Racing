var blueCar = document.getElementById("bluecar");
var raceCar = document.getElementById("racecar");
var result = document.getElementById("result");
const score = document.getElementById("score");
var game = document.getElementById("game");
var counter = 0;
var jumpsound = document.getElementById("jumpsound");
const playerName = "Navya"; // Set the player's name here
var carsPassed = 0; // New variable to count passed cars

// Function to show pop-up messages
function showPopup(message) {
    // Create a div for the pop-up message
    var popup = document.createElement("div");
    popup.innerText = message;
    popup.style.position = "absolute";
    popup.style.top = "10px";
    popup.style.right = "10px";
    popup.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    popup.style.color = "white";
    popup.style.padding = "10px";
    popup.style.borderRadius = "5px";
    popup.style.zIndex = "1000"; // Ensure it's above other elements

    document.body.appendChild(popup);

    // Remove the pop-up after 2 seconds
    setTimeout(() => {
        popup.remove();
    }, 2000);
}

// bluecar move
blueCar.addEventListener("animationiteration", function() {
    var random = (Math.floor(Math.random() * 3)) * 130;
    blueCar.style.left = random + "px";
    counter++;

    // Increment carsPassed and check if it reaches 10
    carsPassed++;
    if (carsPassed === 10) {
        showPopup(`Kya baat he, ${playerName}! Heavy driver!`); // Pop-up message
        carsPassed = 0; // Reset the counter after showing the message
    }
});

// racecar move
window.addEventListener("keydown", function(e) {
    if (e.keyCode == "39") {
        var raceCarLeft = parseInt(window.getComputedStyle(raceCar).getPropertyValue("left"));
        if (raceCarLeft < 260) {
            raceCar.style.left = (raceCarLeft + 130) + "px";
            jumpsound.play();
        }
    }

    if (e.keyCode == "37") {
        var raceCarLeft = parseInt(window.getComputedStyle(raceCar).getPropertyValue("left"));
        if (raceCarLeft > 0) {
            raceCar.style.left = (raceCarLeft - 130) + "px";
            jumpsound.play();
        }
    }
});

// Game over
setInterval(function Gameover() {
    var blueCarTop = parseInt(window.getComputedStyle(blueCar).getPropertyValue("top"));
    var blueCarLeft = parseInt(window.getComputedStyle(blueCar).getPropertyValue("left"));
    var raceCarLeft = parseInt(window.getComputedStyle(raceCar).getPropertyValue("left"));

    // Check for crash
    if ((blueCarLeft === raceCarLeft) && (blueCarTop > 250) && (blueCarTop < 450)) {
        showPopup(`Oops, gaadi dekh ke chala na ${playerName}!`); // Updated pop-up message for crash
        result.style.display = "block";
        game.style.display = "none";
        score.innerHTML = `Score: ${counter}`;
        counter = 0; // Reset score
    }
}, 10);
