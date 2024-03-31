import { renderPack } from './thumbnails.js';
import { setFormSubmit } from './form.js';
import { getData } from './api.js';
import { showAlert } from './util/common.js';
import { hideUploadPicture } from './upload-open.js';
import { showMessage } from './util/message.js';

const SIMILAR_PHOTOS_COUNT = 25;

getData()
  .then((pictures) => {
    renderPack(pictures.slice(0, SIMILAR_PHOTOS_COUNT));
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setFormSubmit(
  () => {
    hideUploadPicture();
    showMessage('success');
  },

  () => {
    hideUploadPicture();
    showMessage('error');
  });

