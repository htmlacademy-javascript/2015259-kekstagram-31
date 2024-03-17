import { openModal } from './modal.js';

//Шаблон изображения
const template = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = (post) => {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  image.src = post.url;
  image.alt = post.description;
  thumbnail.querySelector('.picture__likes').textContent = post.likes;
  thumbnail.querySelector('.picture__comments').textContent = post.comments.length;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openModal(post);
  });

  return thumbnail;
};

const renderPack = (photos) => {
  const fragment = document.createDocumentFragment();
  fragment.append(...photos.map(createThumbnail));
  document.querySelector('.pictures').append(fragment);
};

export { renderPack };
