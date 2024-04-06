import { sendData } from './api.js';
import { onImgUploadCancel } from './open-upload.js';
import { showMessage } from './message-of-uploaded.js';
import { createSlider } from './effects.js';
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
  IDLE: 'Опубликовать',
  SENDING: 'Публикация...'
};

//Cоздает новый объект pristine, который будет управлять валидацией формы,
//добавляя и удаляя классы и тексты об ошибках в зависимости от результатов валидации
const pristine = new Pristine(form, {
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

createSlider();

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

//Добавим обработчик события 'submit' для формы
const setFormSubmit = async (formData) => {
  try {
    await sendData(formData);
    onImgUploadCancel();
    showMessage('success');
  } catch {
    showMessage('error');
  }
};

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    await setFormSubmit(new FormData(form));
    unblockSubmitButton();
  }
});

const resetValidators = () => {
  pristine.reset();
};

export { resetValidators };
