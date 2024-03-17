import { isEscapeKey } from './util.js';
import { renderCommentsBlock } from './modal-template.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-total-count');
const overlay = document.querySelector('.overlay');

//функция для нажатия на "Esc"
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeModal();
  }
};

//проверка что событие произошло не на открытом окне
const onOverlayClick = (evt) => {
  if (!evt.target.closest('.big-picture__preview')) {
    // eslint-disable-next-line no-use-before-define
    closeModal();
  }
};

//функция - действия при открытии большого изображения
const openModal = (post) => {
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
const closeModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  overlay.removeEventListener('click', onOverlayClick);
};

bigPictureCancel.addEventListener('click', () => {
  closeModal();
});

export { openModal };
