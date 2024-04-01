import { renderPack } from './thumbnails.js';
import { setFormSubmit } from './form.js';
import { getData } from './api.js';
import { showAlert, debounce } from './util.js';
import { hideUploadPicture } from './upload-open.js';
import { showMessage } from './message-of-uploaded.js';
import { initFilterListeners } from './filter.js';

const RENDER_PHOTOS_DELAY = 500;

try {
  const data = await getData();
  renderPack(data);
  initFilterListeners(data, debounce(renderPack, RENDER_PHOTOS_DELAY));
} catch (err) {
  showAlert(err.message);
}

setFormSubmit(
  () => {
    hideUploadPicture();
    showMessage('success');
  },

  () => {
    hideUploadPicture();
    showMessage('error');
  });
