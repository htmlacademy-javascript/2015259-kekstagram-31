const ALERT_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showAlert = (message) => {
  const messageBlock = dataErrorTemplate.cloneNode(true);
  messageBlock.querySelector('.data-error__title').textContent = message;

  document.body.append(messageBlock);

  setTimeout(() => {
    messageBlock.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const checkIdentical = (items) => items.some((item, i) => items.indexOf(item, i + 1) > -1);

export { isEscapeKey, checkIdentical, debounce, showAlert };
