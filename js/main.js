import { renderPack } from './thumbnails.js';
import { getData, sendData } from './api.js';
import { showAlert, debounce } from './util.js';
import { setFormSubmit } from './form.js';
import { hideUploadPicture } from './upload-open.js';
import { showMessage } from './message-of-uploaded.js';
import { initFilterListeners } from './filter.js';
import './upload-photo.js';

const RENDER_PHOTOS_DELAY = 500;

setFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideUploadPicture();
    showMessage('success');
  } catch {
    showMessage('error');
  }
});

try {
  const data = await getData();
  renderPack(data);
  initFilterListeners(data, debounce(renderPack, RENDER_PHOTOS_DELAY));
} catch (err) {
  showAlert(err.message);
}
