import { getRandomInteger, getRandomEArrayElement } from './util';
import { getOverviewPhoto } from './data';

const { COMMENTS, CAPTIONS, NAMES, LIKES, PHOTOS, COMMENTS_RANGE, PHOTOS_AVATAR, ID_RANGE, ARRAY_RANGE } = getOverviewPhoto();

//создает объект с комментарием
const createObjComment = () => ({
  id: getRandomInteger(ID_RANGE.MIN, ID_RANGE.MAX),
  avatar: `img/avatar-${getRandomInteger(PHOTOS_AVATAR.MIN, PHOTOS_AVATAR.MAX)}.svg`,
  message: getRandomEArrayElement(COMMENTS),
  name: getRandomEArrayElement(NAMES)
});

//создает массив из 25 объектов
function createOverviewPhoto() {
  //пустые массивы для заполнения данными
  const photos = [];
  const idPhotos = [];

  for (let i = 1; i <= ARRAY_RANGE.MAX; i++) {
    //заполняет idPhotos неповторяющимися значениями
    let id = getRandomInteger(ARRAY_RANGE.MIN, ARRAY_RANGE.MAX);
    while (idPhotos.includes(id)) { //проверка на повторение id
      id = getRandomInteger(ARRAY_RANGE.MIN, ARRAY_RANGE.MAX);
    }
    idPhotos.push(id);
    const comment = []; //массив для заполнения созданных объектов с комментарием
    const numComments = getRandomInteger(COMMENTS_RANGE.MIN, COMMENTS_RANGE.MAX);
    for (let j = 0; j < numComments; j++) {
      comment.push(createObjComment());
    }
    //cоздаем объект- описание фотографии, опубликованной пользователем
    const photoObj = {
      id: id,
      url: `photos${getRandomInteger(PHOTOS.MIN, PHOTOS.MAX)}.jpg`,
      description: `${getRandomEArrayElement(CAPTIONS)}`,
      likes: getRandomInteger(LIKES.MIN, LIKES.MAX),
      comments: comment,
    };
    photos.push(photoObj);
  }
  return photos;
}
createOverviewPhoto();

export { createOverviewPhoto };
