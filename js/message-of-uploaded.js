import { isEscapeKey } from './util.js';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

let message = null;
let messageBlock = null;
let messageTitle = null;

const removeMessage = () => {
  message.remove();
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('click', onClick);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    removeMessage();
  }
};

const onClick = (evt) => {
  evt.preventDefault();

  if (messageBlock === evt.target || messageTitle === evt.target) {

    return;
  }

  removeMessage();
};

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
