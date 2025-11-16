import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const refs = {
  dateInput: document.querySelector('input#datetime-picker'),
  calendar: document.querySelector('.flatpickr-calendar'),
  startCountButton: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer-wrapper'),
  daysOutput: document.querySelector('span[data-days]'),
  hoursOutput: document.querySelector('span[data-hours]'),
  minutesOutput: document.querySelector('span[data-minutes]'),
  secondsOutput: document.querySelector('span[data-seconds]'),
};

const startBtn = {
  button: refs.startCountButton,
  disable() {
    if (!this.button.disabled) {
      this.button.disabled = true;
    }
  },
  enable() {
    if (this.button.disabled) {
      this.button.disabled = false;
    }
  },
};

// const alertMmessage = 'Please choose a date in the future';

const fpOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  locale: {
    firstDayOfWeek: 1,
    weekdays: {
      shorthand: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      longhand: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
    },
  },
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    checkTime();
    if (userSelectedDate - new Date() <= 0) {
      alertToast.show();
      return;
    }
    startBtn.enable();
  },
};
flatpickr('#datetime-picker', fpOptions);

let userSelectedDate = new Date(refs.dateInput.value);
checkTime();

const timer = {
  isActive: false,
  time: { days: '00', hours: '00', minutes: '00', seconds: '00' },
  updateTime(newTime) {
    Object.keys(this.time).forEach(key => {
      this.time[key] = addLeadingZero(newTime[key]);
    });
  },
  start() {
    this.isActive = true;
    updateInputState();
    const intervalId = setInterval(() => {
      const diffMS = userSelectedDate - new Date();
      this.updateTime(convertMs(diffMS));
      this.createMarkup();
      if (diffMS < 1000) {
        clearInterval(intervalId);
        this.isActive = false;
        updateInputState();
      }
    }, 1000);
  },
  createMarkup() {
    refs.daysOutput.textContent = this.time.days;
    refs.hoursOutput.textContent = this.time.hours;
    refs.minutesOutput.textContent = this.time.minutes;
    refs.secondsOutput.textContent = this.time.seconds;
  },
};

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

function updateInputState() {
  refs.dateInput.disabled = timer.isActive;
}

refs.dateInput.addEventListener('focus', () => {
  alertToast.close();
});

refs.startCountButton.addEventListener('click', () => {
  startBtn.disable();
  if (userSelectedDate - new Date() <= 0) {
    alertToast.show();
    return;
  }
  timer.start();
});

function checkTime() {
  if (userSelectedDate - new Date() <= 0) {
    startBtn.disable();
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const alertToast = {
  message: 'Please choose a date in the future',
  show() {
    iziToast.show({
      message: this.message,
      position: 'topRight',
      backgroundColor: '#EF4040',
      messageColor: '#ffffff',
      icon: 'fa-regular fa-circle-xmark',
      iconColor: '#B51B1B',
      timeout: 10000,
      class: 'alert-izi-icon',
      close: false,
      closeOnClick: true,
    });
  },
  close() {
    try {
      iziToast.hide({}, document.querySelector('.iziToast'));
    } catch {}
  },
};
