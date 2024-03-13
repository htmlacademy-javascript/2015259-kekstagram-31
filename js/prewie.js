import { photos } from './createOverviewPhoto.js';

//Шаблон изображения
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
//Список для отрисовки
const picturesList = document.querySelector('.pictures');

//Массив из сгенерированных объектов - описаний фотографий, опубликованных пользователями
const picturesArray = photos;

// Создаем пустой контейнер
const picturesFragment = document.createDocumentFragment();

picturesArray.forEach(({ url, likes, comments, description }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const image = pictureElement.querySelector('.picture__img');

  image.src = url;
  image.alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  picturesFragment.append(pictureElement);
});

picturesList.append(picturesFragment);

export { picturesFragment };
