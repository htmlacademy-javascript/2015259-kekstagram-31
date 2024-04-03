import { openFullImg } from './open-full-img.js';

//Шаблон изображения
const template = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const imgFiltersElement = document.querySelector('.img-filters');

const createThumbnail = (post) => {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  image.src = post.url;
  image.alt = post.description;
  thumbnail.querySelector('.picture__likes').textContent = post.likes;
  thumbnail.querySelector('.picture__comments').textContent = post.comments.length;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openFullImg(post);
  });

  return thumbnail;
};

const renderPack = (photos) => {
  const fragment = document.createDocumentFragment();
  fragment.append(...photos.map(createThumbnail));

  pictures.querySelectorAll('.picture').forEach((element) => {
    element.remove();
  });
  document.querySelector('.pictures').append(fragment);

  imgFiltersElement.classList.remove('img-filters--inactive');
};

export { renderPack };
