// Variables

let secondS = 0,
    minuteS = 0,
    timerStart = false,
    pressPause = false,
    sessionEnd = false,
    secondB = 0,
    minuteB = 0,
    amountOfSessions = 1,
    amountOfBreaks = 1,
    pomodorosCounter = 1,
    interval;


const body = document.querySelector('body');


    // buttons


const btnLength = document.querySelectorAll('.btn__length');
      sessionLenght = document.querySelector('.session__text__minutes');
      breakLenght = document.querySelector('.break__text__minutes');



const modalWindow = document.querySelector('.modal__wrapper');
const modalText = document.querySelector('.modal__text');
const btnOk = document.querySelector('.modal__ok')



const start = document.querySelector('.start'),
    pause = document.querySelector('.pause'),
    refresh = document.querySelector('.refresh');

// timers

const timerSession = document.querySelector('.timer-session'),
      timerBreak = document.querySelector('.timer-break')
      secondsSession = document.querySelector('.seconds__session'),
      minutesSession = document.querySelector('.minutes__session'),
      secondsBreak = document.querySelector('.seconds__break'),
      minutesBreak = document.querySelector('.minutes__break');

      
const audioStart = document.querySelector('[data-start');
const audioStop = document.querySelector('[data-stop');

const sessionTitle = document.querySelector('[data-session__title]');
const breakTitle = document.querySelector('[data-break__title]');

const pomodorosContainer = document.querySelector('.pomodoros__container');
const circles = document.querySelector('.circles');

clearAll()
// Listeners

// modal

btnOk.addEventListener('click', () => {
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show')
    btnLength.forEach(btn => {
        btn.removeAttribute('disabled', 'disabled');
    })
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        modalWindow.classList.add('hide')
        modalWindow.classList.remove('show')
    }

})


btnLength.forEach (btn => {
    btn.addEventListener('click', (event) => {

        if (event.target.getAttribute('id') == 'session__down') {
        if (sessionLenght.textContent > 0) {
            sessionLenght.textContent = addZero(+sessionLenght.textContent - 5);
            minutesSession.textContent = sessionLenght.textContent;
            minuteS = +minutesSession.textContent;
            }
        }

        if (event.target.getAttribute('id') == 'session__up') {
            if (sessionLenght.textContent < 60) {
                sessionLenght.textContent = addZero(+sessionLenght.textContent + 5);
                minutesSession.textContent = sessionLenght.textContent;
                minuteS = +minutesSession.textContent;
            }
        }

        if (event.target.getAttribute('id') == 'break__down') {
            if (breakLenght.textContent > 0) {
                breakLenght.textContent = addZero(+breakLenght.textContent - 5);
                minutesBreak.textContent = sessionLenght.textContent;
                minuteB = +minutesBreak.textContent
            }
        }

        if (event.target.getAttribute('id') == 'break__up') {
            if (breakLenght.textContent < 20) {
                breakLenght.textContent = addZero(+breakLenght.textContent + 5);
                minutesBreak.textContent = breakLenght.textContent;
                minuteB = +minutesBreak.textContent;
            }
        }

    })
})


start.addEventListener('click', ()=> {
    clearInterval(interval);

    if((minuteS != 0 || secondS != 0) && breakLenght.textContent != 0) {
    interval = setInterval(startTimer, 1)
        if(pressPause === false) {
            start.classList.add('push_start');
            pause.classList.remove('push_pause');
        }
    }

    if (minuteB == 0 && secondB == 0 && minutesBreak.textContent == 0 && timerStart === false && pressPause == false) {
        createModalMessage('Break')
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
    }

    if (minuteS == 0 && secondS == 0 && minutesSession.textContent == 0 && timerStart === false && pressPause == false) {
        createModalMessage('Session')
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
    }

})

pause.addEventListener('click', () => {
    clearInterval(interval);
    pressPause = true;
    if(timerStart === true) {
        pause.classList.add('push_pause');
        start.classList.remove('push_start');
        pressPause = false;
    }

})

refresh.addEventListener('click', clearAll);






//functions

function addPomodoro () {
    const pomodoro = document.createElement('img')
    pomodoro.classList.add('pomodoro');
    pomodoro.src = `img/pomodoro${pomodorosCounter}.png`;
    
    if (circles.textContent <= 9) {
        pomodorosContainer.append(pomodoro);
    } else { 


        modalText.innerHTML = 
        `
        Impressive! <br><br> You work so hard! <br> Please take a break
        `;
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        clearAll();
    }


    if(pomodorosCounter == 1) {
        pomodorosCounter++;
    } else {
        pomodorosCounter = 1;
    }


}



function createModalMessage(time) {
    modalText.innerHTML = 
    `
    Sorry! <br><br> You need to set <br> ${time} Length
    `;
}

function startTimer () {
    if (circles.textContent == 0 && timerStart === false && pressPause == false) { 
        audioStart.play();
        timerStart = true;
    }
    startSessionTimer();

    startBreakTimer();

    btnLength.forEach(btn => {
        btn.setAttribute('disabled', 'disabled');
    })
}

function startSessionTimer() {
    secondS--
    secondsSession.textContent = addZero(secondS);
   
    if (secondS < 0 && sessionEnd === false) {
        secondS = 59;
        secondsSession.textContent = addZero(secondS);
        minuteS--
        minutesSession.textContent = addZero(minuteS)
    }

    if (minuteS === 0 && secondS === 0 && sessionEnd === false) {
        timerBreak.style.display = '';
        timerSession.style.display = 'none'
        minutesBreak.textContent = breakLenght.textContent;
        minuteB = +minutesBreak.textContent;
        sessionEnd = true;
        amountOfSessions++
        sessionTitle.innerHTML = 
        `
        Session ${amountOfSessions}
        `;
        body.classList.add('night'); // night
        body.classList.remove('day');

        pomodorosContainer.classList.add('tractor_night');
        pomodorosContainer.classList.remove('tractor_day');
        audioStop.play();


    }

}

function startBreakTimer() {
    if (sessionEnd === true) {
    secondB--
    secondsBreak.textContent = addZero(secondB);
    }
    if (secondB < 0 &&sessionEnd === true) {
        secondB = 59;
        secondsBreak.textContent = addZero(secondB);
        minuteB--
        minutesBreak.textContent = addZero(minuteB)
    }

    if (minuteB === 0 && secondB === 0 && sessionEnd === true) {
        circles.textContent++;
        timerBreak.style.display = 'none';
        timerSession.style.display = '';
        sessionEnd = false;
        minutesSession.textContent = sessionLenght.textContent;
        minuteS = +minutesSession.textContent;
        
        amountOfBreaks++;
        breakTitle.innerHTML = 
        `
        Break ${amountOfBreaks}
        `;
        body.classList.add('day'); //day
        body.classList.remove('night');

        pomodorosContainer.classList.add('tractor_day');
        pomodorosContainer.classList.remove('tractor_night');

        audioStart.play();
        addPomodoro ();
    }
}





function clearAll () {
    clearInterval(interval);
    circles.textContent = 0;
    secondS = 0;
    secondB = 0;
    minuteS = 0;
    minuteB = 0;
    sessionLenght.textContent = '00'
    breakLenght.textContent = '00'

    secondsSession.textContent = '00';
    minutesSession.textContent = '00';

    secondsBreak.textContent = '00';
    minutesBreak.textContent = '00';

    timerSession.style.display = '';
    timerBreak.style.display = 'none';

    btnLength.forEach(btn => {
        btn.removeAttribute('disabled', 'disabled');
    })

    sessionEnd = false;
    pressPause = false;
    timerStart = false;
    modalWindow.classList.add('hide')
    
    sessionTitle.innerHTML = 'Session 1';
    breakTitle.innerHTML = 'Break 1';
    amountOfSessions = 1;
    amountOfBreaks = 1;

    body.classList.add('day');
    body.classList.remove('night');

    pomodorosContainer.classList.add('tractor_day');
    pomodorosContainer.classList.remove('tractor_night');
    
    pomodorosCounter = 1;

    const pomodoros = document.querySelectorAll(".pomodoro");
    pomodoros.forEach(e => e.remove());

}



function addZero(num) {
    if(num >= 0 && num < 10) {
        return `0${num}`
    } else {
        return num
    }
}





