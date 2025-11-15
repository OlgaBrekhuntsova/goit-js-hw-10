import iziToast from 'izitoast';

const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = form.elements.delay.value;
  const isFullfilled = form.elements.state.value === 'fulfilled' ? true : false;
  createPromise(isFullfilled, delay);
  form.reset();
});

const createPromise = (isFulfilled, delay) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilled) {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  promise
    .then(value => {
      toast.show(value, true);
    })
    .catch(value => {
      toast.show(value, false);
    });
};

const toast = {
  show(message, isFulfilled) {
    const options = isFulfilled
      ? this.getSuccessOptions(message)
      : this.getErrorOptions(message);
    iziToast.show(options);
  },
  getErrorOptions(message) {
    return {
      message: message,
      position: 'topRight',
      backgroundColor: '#EF4040',
      messageColor: '#ffffff',
      timeout: 5000,
      closeOnClick: true,
    };
  },
  getSuccessOptions(message) {
    return {
      message: message,
      position: 'topRight',
      backgroundColor: '#3bd427ff',
      messageColor: '#ffffff',
      timeout: 5000,
      closeOnClick: true,
    };
  },
  close() {
    try {
      iziToast.hide({}, document.querySelector('.iziToast'));
    } catch {}
  },
};
