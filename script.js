const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector("#time-list");
let time = 0;

const timeEl = document.querySelector('#time')

const board = document.querySelector('#board')

let score = 0;

startBtn.addEventListener('click', event => {
	event.preventDefault();
	screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'))
		screens[1].classList.add('up')
		startGame();
	}
})

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++;
		event.target.remove();
		createRndCircle();
	}
})


function startGame() {
	createRndCircle();
	setInterval(decreaseTime, 1000);
	setTime(time)
}

function decreaseTime() {
	if (time === 0) {
		finishGame();
	} else {
		let current = --time;
		if (current < 10) current = `0${current}`
		setTime(current)
	}
	
}

function setTime(value) {
	timeEl.innerHTML = value
}

function finishGame() {
	timeEl.parentNode.classList.add('hide')
	const backBtnElem = document.createElement('button')
	backBtnElem.innerText = 'Заново'
	backBtnElem.classList.add('back-btn')
	backBtnElem.addEventListener('click', () => location.reload())
	board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`;
	board.append(backBtnElem)
}


function createRndCircle() {
	const circleEl = document.createElement('div')
	const size = getRndNum(18, 50);
	const {width, height} = board.getBoundingClientRect();

	const x = getRndNum(0, width - size)
	const y = getRndNum(0, height - size)

	circleEl.classList.add('circle')

	circleEl.style.background = getRandomColor();


	circleEl.style.width = `${size}px`
	circleEl.style.height = `${size}px`

	circleEl.style.left = `${x}px`
	circleEl.style.top = `${y}px`

	board.append(circleEl)
}

function getRndNum(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}