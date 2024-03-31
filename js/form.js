import { showAlert } from './util/common.js';
import { sendData } from './api.js';
import {
  validateUniqueHashtags,
  validateSymbolsHashtags,
  validateCountHashtags,
  validateHashtagsByLength,
  validateCommentLenght
} from './validator.js';

const form = document.querySelector('.img-upload__form');
const submitButton = form.querySelector('#upload-submit');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const SubmitButtonText = {
  IDLE: 'Загрузить',
  SENDING: 'Загружаю...'
};

//Cоздает новый объект pristine, который будет управлять валидацией формы,
//добавляя и удаляя классы и тексты об ошибках в зависимости от результатов валидации
const pristine = new window.Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

//Добавим валидаторы к полям формы, каждый с соответствующими условиями проверки и сообщением об ошибке в случае невалидных данных.
pristine.addValidator(textHashtags, validateCountHashtags, 'Не более 5 хэштегов', 1, true);
pristine.addValidator(textHashtags, validateHashtagsByLength, 'Максимальная длина хэштега 20 символов, включая решётку', 1, true);
pristine.addValidator(textHashtags, validateSymbolsHashtags, 'После # используйте буквы и цифры, без пробелов и спецсимволов', 1, true);
pristine.addValidator(textHashtags, validateUniqueHashtags, 'Хэштеги не должны повторяться', 1, true);
pristine.addValidator(textDescription, validateCommentLenght, 'Длина комментария не более 140 символов', 1, true);


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};


//Добавим обработчик события 'submit' для формы
const setFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {

    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(
          (err) => {
            showAlert(err.message);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

const resetValidators = () => {
  pristine.reset();
};

export { setFormSubmit, resetValidators };
