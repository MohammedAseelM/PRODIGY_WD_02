let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function formatTime(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor(ms / (1000 * 60)) % 60;
    const seconds = Math.floor(ms / 1000) % 60;
    const milliseconds = ms % 1000;

    return [hours, minutes, seconds, milliseconds]
        .map((value, index) => {
            if (index === 3) {
                return String(value).padStart(3, "0");
            }
            return String(value).padStart(2, "0");
        })
        .join(":");
}

function updateDisplay() {
    if (!isRunning) return;

    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {
    if (isRunning) return;

    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    isRunning = true;
    startStopBtn.textContent = "Stop";
}

function stopTimer() {
    if (!isRunning) return;

    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
    startStopBtn.textContent = "Start";
    display.textContent = formatTime(elapsedTime);
}

startStopBtn.addEventListener("click", () => {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);

    startTime = 0;
    elapsedTime = 0;
    isRunning = false;

    display.textContent = "00:00:00:000";
    startStopBtn.textContent = "Start";
    laps.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
    if (!isRunning) return;

    const lap = document.createElement("li");
    lap.textContent = display.textContent;
    laps.appendChild(lap);
});

updateDisplay();