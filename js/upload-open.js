import { isEscapeKey } from './util.js';
import { resetEffectImage, createSlider, onEffectsChange } from './editor.js';
import { changeImageScale, ScaleValue } from './scale.js';
import { resetValidators } from './form.js';

const uploadForm = document.querySelector('.img-upload__form');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const imageUploadTextInput = document.querySelector('.img-upload__text input');
const imageUploadTextTextarea = document.querySelector('.img-upload__text textarea');
const effects = document.querySelector('.img-upload__effects');

const resetUploadPicture = () => {
  changeImageScale(ScaleValue.MAX);
  resetEffectImage();
  resetValidators();
};

const hideUploadPicture = () => {
  uploadForm.reset();
  resetUploadPicture();
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  effects.removeEventListener('change', onEffectsChange);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showUploadPicture = () => {
  resetUploadPicture();
  createSlider();
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  effects.addEventListener('change', onEffectsChange);
  // eslint-disable-next-line no-use-before-define
  document.addEventListener('keydown', onDocumentKeydown);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideUploadPicture();
  }
};

//обработчик для события нажатия Esc в поле при фокусе
[imageUploadTextInput, imageUploadTextTextarea].forEach((element) => {
  element.addEventListener('focusin', () => {
    document.removeEventListener('keydown', onDocumentKeydown);
  });
  element.addEventListener('focusout', () => {
    document.addEventListener('keydown', onDocumentKeydown);
  });
});

uploadFile.addEventListener('change', showUploadPicture);

uploadCancel.addEventListener('click', hideUploadPicture);
