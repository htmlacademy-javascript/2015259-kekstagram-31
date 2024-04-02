import { isEscapeKey } from './util.js';
import { destroySlider } from './editor.js';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

const showMessage = (type) => {
  const template = type === 'success' ? successMessageTemplate : errorMessageTemplate;

  const message = template.cloneNode(true);
  const messageBlock = message.querySelector(`.${type}__inner`);
  const messageTitle = message.querySelector(`.${type}__title`);

  const remove = () => {
    message.remove();
    if (type !== 'success') {
      destroySlider();
    }
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('click', onClick);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();

      remove();
    }
  };

  const onClick = (evt) => {
    evt.preventDefault();

    if (messageBlock === evt.target || messageTitle === evt.target) {

      return;
    }

    remove();
  };

  document.body.append(message);

  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { showMessage };
