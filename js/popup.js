import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const social = bigPicture.querySelector('.social');
const socialComments = social.querySelector('.social__comments');
const socialCommentsCount = social.querySelector('.social__comment-count');
const overlay = document.querySelector('.overlay');

//создаем и заполняем новые комментарии
const createComment = ({ avatar, name, message }) => {
  const commentBlock = commentTemplate.cloneNode(true);
  const socialPicture = commentBlock.querySelector('.social__picture');

  socialPicture.src = avatar;
  socialPicture.alt = name;
  commentBlock.querySelector('.social__text').textContent = message;

  return commentBlock;
};

const renderCommentBlock = (comment) => {
  const commentsFragment = document.createDocumentFragment();
  commentsFragment.append(...comment.map(createComment));

  return commentsFragment;
};

//функция - действия при закрытии большого изображения
const closePreview = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCancel.removeEventListener('click', closePreview);
  // eslint-disable-next-line no-use-before-define
  overlay.removeEventListener('click', onOverlayClick);
};

//функция для нажатия на "Esc"
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePreview();
  }
};

//проверка что событие произошло не на popup
const onOverlayClick = (evt) => {
  if (!evt.target.closest('.big-picture__preview')) {
    closePreview();
  }
};

//заполняем popup
const renderPreview = (post) => {
  bigPicture.querySelector('.big-picture__img img').src = post.url;
  social.querySelector('.likes-count').textContent = post.likes;
  socialCommentsCount.querySelector('.social__comment-total-count').textContent = post.comments.length;
  social.querySelector('.social__caption').textContent = post.description;

  socialComments.innerHTML = '';
  socialComments.append(renderCommentBlock(post.comments));
};

//функция - действияпри открытии popup
const openPreview = (post) => {

  renderPreview(post);

  bigPicture.classList.remove('hidden');
  socialCommentsCount.classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  bigPictureCancel.addEventListener('click', closePreview);
  document.addEventListener('keydown', onDocumentKeydown);
  overlay.addEventListener('click', onOverlayClick);
};

export { openPreview };
