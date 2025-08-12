import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const refs = {
    input: document.querySelector('#datetime-picker'),
    btn: document.querySelector('.js-startBtn'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let targetDate = null;
let timerId = null;


refs.btn.disabled = true;


function updateTimer(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);
    refs.days.textContent = pad(days);
    refs.hours.textContent = pad(hours);
    refs.minutes.textContent = pad(minutes);
    refs.seconds.textContent = pad(seconds);
}


function startTimer() {
    refs.btn.disabled = true;
    refs.input.disabled = true;

    timerId = setInterval(() => {
        const diff = targetDate - Date.now();

        if (diff <= 0) {
            clearInterval(timerId);
            refs.input.disabled = false;
            updateTimer(0);
            return;
        }

        updateTimer(diff);
    }, 1000);
}


flatpickr(refs.input, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
            iziToast.show({
                theme: 'dark',
                position: 'topRight',
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828843.png',
                message: 'Please choose a date in the future',
                messageColor: 'white',
                color: '#4444ea',
            });
            refs.btn.disabled = true;
        } else {
            targetDate = selectedDate.getTime();
            refs.btn.disabled = false;
        }
    },
});


refs.btn.addEventListener('click', startTimer);


function pad(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    return {
        days: Math.floor(ms / day),
        hours: Math.floor((ms % day) / hour),
        minutes: Math.floor((ms % hour) / minute),
        seconds: Math.floor((ms % minute) / second),
    };
}