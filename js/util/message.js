import { isEscapeKey } from './common';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

const showMessage = (type) => {
  const template = type === 'success' ? successMessageTemplate : errorMessageTemplate;

  const message = template.cloneNode(true);
  const messageBlock = message.querySelector(`.${type}__inner`);
  const messageTitle = message.querySelector(`.${type}__title`);

  const remove = () => {
    message.remove();
    document.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onEscapeKeydown);
  };

  function onEscapeKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();

      remove();
    }
  }

  function onClick(evt) {
    evt.preventDefault();

    if (messageBlock === evt.target || messageTitle === evt.target) {

      return;
    }

    remove();
  }

  document.body.append(message);

  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onEscapeKeydown);
};

export {showMessage};
