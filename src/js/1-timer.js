
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputElem = document.querySelector('#datetime-picker');
const btnElem = document.querySelector('.js-startBtn');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondElem = document.querySelector('[data-seconds]');

document.addEventListener('DOMContentLoaded', () => {
    btnElem.disabled = true;
});


const timeManager = {
    selectedDates: null,
    intervalId: null,
    timer() {
        this.intervalId = setInterval(() => {
            btnElem.disabled = true;
            inputElem.disabled = true;
            if (this.selectedDates - new Date() <= 0) {
                this.stopTimer();
                return;
            }
            this.tick();
        }, 1000);
    },
    tick() {
        changeText(convertMs(this.selectedDates - new Date()));
    },
    stopTimer() {
        clearInterval(this.intervalId);
        inputElem.disabled = false;
    },
};

btnElem.addEventListener('click', e => {
    timeManager.timer();
});

new flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] - new Date() <= 0) {
            iziToast.show({
                theme: 'dark',
                position: 'topRight',
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828843.png',
                message: 'Please choose a date in the future',
                messageColor: 'white',
                icon: 'icon-person',
                color: '#4444eaff',
            });
            btnElem.disabled = true;
        } else {
            console.log(selectedDates[0]);
            timeManager.selectedDates = selectedDates[0].getTime();
            btnElem.disabled = false;
        }
    },
});

function convertMs(ms) {


    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;


    const days = Math.floor(ms / day);


    const hours = Math.floor((ms % day) / hour);


    const minutes = Math.floor(((ms % day) % hour) / minute);


    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
function changeText({ days, hours, minutes, seconds }) {
    const daysStr = pad(days);
    const hoursStr = pad(hours);
    const minutesStr = pad(minutes);
    const secondStr = pad(seconds);

    daysElem.textContent = daysStr;
    hoursElem.textContent = hoursStr;
    minutesElem.textContent = minutesStr;
    secondElem.textContent = secondStr;

    return;
}

function pad(value) {
    return String(value).padStart(2, '0');
}
