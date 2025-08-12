import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElem = document.querySelector('.form');

formElem.addEventListener('submit', e => {
    e.preventDefault();
    const delay = parseInt(e.currentTarget.elements.delay.value);
    const status = e.currentTarget.elements.state.value;
    alertResult(delay, status);
});

function createPromise(delay, status) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
    return promise;
}

function alertResult(delay, status) {
    createPromise(delay, status)
        .then(res => {
            iziToast.show({
                theme: 'dark',
                position: 'topRight',
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
                message: `Fulfilled promise in ${res}ms`,
                messageColor: 'white',
                icon: 'icon-person',
                color: '#59A10D',
            });
        })
        .catch(res => {
            iziToast.show({
                theme: 'dark',
                position: 'topRight',
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828843.png',
                message: `Rejected promise in ${res}ms`,
                messageColor: 'white',
                icon: 'icon-person',
                color: '#ef4040',
            });
        });
}