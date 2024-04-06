import { renderThumbnails } from './thumbnails.js';
import { getData } from './api.js';
import { showAlert, debounce } from './util.js';
import { onImgFiltersButtonClick } from './filter.js';
import { onImgUploadInputLoad } from './upload-photo.js';
import './edit-form.js';

onImgUploadInputLoad();

const RENDER_PHOTOS_DELAY = 500;

try {
  const data = await getData();
  renderThumbnails(data);
  onImgFiltersButtonClick(data, debounce(renderThumbnails, RENDER_PHOTOS_DELAY));
} catch (err) {
  showAlert(err.message);
}
