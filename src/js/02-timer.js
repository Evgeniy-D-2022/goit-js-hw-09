
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    dateTimePicker: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let intervalID = null;

refs.startBtn.addEventListener('click', startTimer);

function startTimer() {
    intervalID = setInterval(endTimer, 1000);
    refs.startBtn.disabled = true;
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            refs.startBtn.disabled = true;
        } else {
            refs.startBtn.disabled = false;
        };
    },
  };

  function endTimer() {
    const currentDate = new Date();
    const selectedDate = new Date(refs.dateTimePicker.value);
    const diff = selectedDate - currentDate;
    if (diff < 1000) {
        clearInterval(intervalID);
        Notiflix.Notify.success('Success', 'Countdown is over');
    }
    if (selectedDate !== null) {
        refs.days.textContent = addLeadingZero(convertMs(diff).days);
        refs.hours.textContent = addLeadingZero(convertMs(diff).hours);
        refs.days.textContent = addLeadingZero(convertMs(diff).days);
        refs.minutes.textContent = addLeadingZero(convertMs(diff).minutes);
        refs.seconds.textContent = addLeadingZero(convertMs(diff).seconds);
        
        // refs.startBtn.disabled = true;
    }
   return;
};


  const flatPick = flatpickr('input#datetime-picker', options);

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
  };

  function addLeadingZero(number) {
    return String(number).padStart(2, 0);
  };