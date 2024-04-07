import { isEscapeKey } from './util.js';
import { renderCommentsBlock } from './render-comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-total-count');
const overlay = document.querySelector('.overlay');

//функция - действия при открытии большого изображения
const onBigPictureOpen = (post) => {
  bigPictureImage.src = post.url;
  likesCount.textContent = post.likes;
  socialCommentsCount.textContent = post.comments.length;

  socialCommentsList.innerHTML = '';
  renderCommentsBlock(post);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  overlay.addEventListener('click', onOverlayClick);
};

//функция - действия при закрытии большого изображения
const onBigPictureClose = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  overlay.removeEventListener('click', onOverlayClick);
};

//функция для нажатия на "Esc"
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onBigPictureClose();
  }
}

//проверка что событие произошло не на открытом окне
function onOverlayClick(evt) {
  if (!evt.target.closest('.big-picture__preview')) {
    onBigPictureClose();
  }
}

bigPictureCancel.addEventListener('click', () => {
  onBigPictureClose();
});

export { onBigPictureOpen };
