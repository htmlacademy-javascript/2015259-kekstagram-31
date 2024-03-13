//Шаблон изображения
const template = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({ url, likes, comments, description }) => {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  image.src = url;
  image.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  return thumbnail;
};

const renderPack = (photos) => {
  const fragment = document.createDocumentFragment();
  fragment.append(...photos.map(createThumbnail));
  document.querySelector('.pictures').append(fragment);
};

export { renderPack };
