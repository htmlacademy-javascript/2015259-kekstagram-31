import { isEscapeKey } from './util.js';
import { resetEffectImage, onEffectsChange, createSlider } from './effects.js';
import { changeImageScale, ScaleValue } from './scale.js';
import { pristine, resetValidators } from './validator.js';
import { sendData } from './api.js';
import { showMessage } from './message-of-uploaded.js';
import { onImgUploadInputLoad } from './upload-photo.js';

const uploadForm = document.querySelector('.img-upload__form');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const effects = document.querySelector('.img-upload__effects');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = uploadForm.querySelector('#upload-submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикация...'
};

createSlider();

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const resetUploadPicture = () => {
  changeImageScale(ScaleValue.MAX);
  resetEffectImage();
  resetValidators();
};

const onImgUploadCancelClick = () => {
  uploadForm.reset();
  resetUploadPicture();
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  effects.removeEventListener('change', onEffectsChange);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onImgUploadControlClick = () => {
  resetUploadPicture();
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  effects.addEventListener('change', onEffectsChange);
  document.addEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField || document.activeElement === commentField;

//функция для нажатия на "Esc"
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    const hasHiddenPopup = document.querySelector('.error');
    if (!hasHiddenPopup) {
      onImgUploadCancelClick();
    }
  }
}

uploadFile.addEventListener('change', onImgUploadControlClick);

uploadCancel.addEventListener('click', onImgUploadCancelClick);

onImgUploadInputLoad();

//Добавим обработчик события 'submit' для формы
const setFormSubmit = async (formData) => {
  try {
    await sendData(formData);
    onImgUploadCancelClick();
    showMessage('success');
  } catch {
    showMessage('error');
  }
};

const addFormSubmit = () => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await setFormSubmit(new FormData(uploadForm));
      unblockSubmitButton();
    }
  });
};

export { addFormSubmit };
