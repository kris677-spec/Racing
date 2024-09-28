var blueCar = document.getElementById("bluecar");
var raceCar = document.getElementById("racecar");
var result = document.getElementById("result");
const score = document.getElementById("score");
var game = document.getElementById("game");
var counter = 0;
var jumpsound = document.getElementById("jumpsound");
var popup = document.createElement("div");
popup.className = "popup";
document.body.appendChild(popup);

// Bluecar move
blueCar.addEventListener("animationiteration", function() {
    var random = (Math.floor(Math.random() * 3)) * 130;
    blueCar.style.left = random + "px";
    counter++;
    // Show milestone message every 10 cars passed
    if (counter % 10 === 0) {
        showPopup("Kya baat hai Navya.. heavy driver!");
    }
});

// Function to move the race car to the right
function moveRight() {
    var raceCarLeft = parseInt(window.getComputedStyle(raceCar).getPropertyValue("left"));
    if (raceCarLeft < 260) {
        raceCar.style.left = (raceCarLeft + 130) + "px";
        jumpsound.play();
    }
}

// Function to move the race car to the left
function moveLeft() {
    var raceCarLeft = parseInt(window.getComputedStyle(raceCar).getPropertyValue("left"));
    if (raceCarLeft > 0) {
        raceCar.style.left = (raceCarLeft - 130) + "px";
        jumpsound.play();
    }
}

// Event listeners for keyboard controls
window.addEventListener("keydown", function(e) {
    if (e.keyCode === 39) moveRight(); // Right arrow key
    if (e.keyCode === 37) moveLeft(); // Left arrow key
});

// Event listeners for touch controls
document.getElementById("leftBtn").addEventListener("click", moveLeft);
document.getElementById("rightBtn").addEventListener("click", moveRight);

// Game over check
setInterval(function Gameover() {
    var blueCarTop = parseInt(window.getComputedStyle(blueCar).getPropertyValue("top"));
    var blueCarLeft = parseInt(window.getComputedStyle(blueCar).getPropertyValue("left"));
    var raceCarLeft = parseInt(window.getComputedStyle(raceCar).getPropertyValue("left"));
    
    if ((blueCarLeft === raceCarLeft) && (blueCarTop > 250) && (blueCarTop < 450)) {
        result.style.display = "block";
        game.style.display = "none";
        score.innerHTML = `Score: ${counter}`;
        showPopup("Oops! Gaadi dekh ke chala na Navya!");
        counter = 0;
    }
}, 10);

// Function to display popups
function showPopup(message) {
    popup.innerHTML = message;
    popup.style.display = "block";
    setTimeout(function() {
        popup.style.display = "none";
    }, 2000); // Popup will disappear after 2 seconds
}
