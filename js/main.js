import { renderThumbnails } from './thumbnails.js';
import { getData } from './api.js';
import { showAlert, debounce } from './util.js';
import { initFilterListeners } from './filter.js';
import './edit-form.js';
import './upload-photo.js';

const RENDER_PHOTOS_DELAY = 500;

try {
  const data = await getData();
  renderThumbnails(data);
  initFilterListeners(data, debounce(renderThumbnails, RENDER_PHOTOS_DELAY));
} catch (err) {
  showAlert(err.message);
}
