
const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
}

refs.startBtn.addEventListener('click', clickStartBtn);
refs.stopBtn.addEventListener('click', clickStopBtn);

function clickStartBtn() {
    timerId = setInterval(changeBodyColor, 1000)
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
}

function clickStopBtn() {
    clearInterval(timerId)
    refs.stopBtn.disabled = true;
    refs.startBtn.disabled = false;
}

function changeBodyColor() {
    let bodyColor = getRandomHexColor();
    document.body.style.backgroundColor = bodyColor;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
