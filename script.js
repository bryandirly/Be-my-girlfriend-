//dedicated to https://www.instagram.com/chlseagraciella/

const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
let isRunning = false;
let hasMoved = false; 

let rect = noButton.getBoundingClientRect();
let initialX = rect.left;
let initialY = rect.top;

noButton.addEventListener("click", function () {
    if (!isRunning) {
        moveButtonSmoothly();
    }
});

document.addEventListener("mousemove", function (event) {
    if (isRunning) return; 

    let rect = noButton.getBoundingClientRect();
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    let distance = Math.sqrt(
        Math.pow(mouseX - (rect.left + rect.width / 2), 2) +
        Math.pow(mouseY - (rect.top + rect.height / 2), 2)
    );

    if (distance < 100) { 
        moveButtonSmoothly();
    } else if (hasMoved && distance > 150) {
        resetButtonPosition();
    }
});


function moveButtonSmoothly() {
    isRunning = true;
    hasMoved = true;

    let maxX = window.innerWidth - noButton.clientWidth - 50;
    let maxY = window.innerHeight - noButton.clientHeight - 50;

    let randomX, randomY;
    do {
        randomX = Math.random() * maxX;
        randomY = Math.random() * maxY;
    } while (Math.abs(randomX - initialX) < 100 && Math.abs(randomY - initialY) < 100);

    noButton.style.transition = "transform 0.4s ease-out";
    noButton.style.transform = `translate(${randomX - initialX}px, ${randomY - initialY}px)`;

    setTimeout(() => {
        isRunning = false;
    }, 400);
}


function resetButtonPosition() {
    isRunning = true;
    hasMoved = false;

    noButton.style.transition = "transform 0.5s ease-in";
    noButton.style.transform = "translate(0, 0)";

    setTimeout(() => {
        isRunning = false;
    }, 500);
}

yesButton.addEventListener("click", function () {
    window.location.href = "thankyou.html";
});
