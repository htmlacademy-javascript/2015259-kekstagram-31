import { isEscapeKey } from './util.js';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

let message = null;
let messageBlock = null;
let messageTitle = null;

const removeMessage = () => {
  message.remove();
  document.removeEventListener('click', onClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    removeMessage();
  }
}

function onClick(evt) {
  evt.preventDefault();

  if (messageBlock === evt.target || messageTitle === evt.target) {

    return;
  }

  removeMessage();
}

const showMessage = (type) => {
  const template = type === 'success' ? successMessageTemplate : errorMessageTemplate;

  message = template.cloneNode(true);
  messageBlock = message.querySelector(`.${type}__inner`);
  messageTitle = message.querySelector(`.${type}__title`);

  document.body.append(message);

  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { showMessage };
