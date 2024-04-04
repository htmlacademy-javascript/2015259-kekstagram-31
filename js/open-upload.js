import { isEscapeKey } from './util.js';
import { resetEffectImage, onEffectsChange } from './effects.js';
import { changeImageScale, ScaleValue } from './scale.js';
import { resetValidators } from './edit-form.js';

const uploadForm = document.querySelector('.img-upload__form');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const effects = document.querySelector('.img-upload__effects');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

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
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  effects.addEventListener('change', onEffectsChange);
  // eslint-disable-next-line no-use-before-define
  document.addEventListener('keydown', onDocumentKeydown);
};

const ifInTextFieldFocused = () =>
  document.activeElement === hashtagField || document.activeElement === commentField;

//функция для нажатия на "Esc"
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !ifInTextFieldFocused()) {
    evt.preventDefault();
    const hasHiddenPopup = document.querySelector('.error');
    if (!hasHiddenPopup) {
      hideUploadPicture();
    }
  }
};

uploadFile.addEventListener('change', showUploadPicture);

uploadCancel.addEventListener('click', hideUploadPicture);

export { hideUploadPicture };
