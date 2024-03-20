import { isEscapeKey } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const imageUploadTextInput = document.querySelector('.img-upload__text input');
const imageUploadTextTextarea = document.querySelector('.img-upload__text textarea');

const hideUploadPicture = () => {
  uploadForm.reset();
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showUploadPicture = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
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

uploadFile.addEventListener('change', () => {
  showUploadPicture();
});

uploadCancel.addEventListener('click', () => {
  hideUploadPicture();
});
