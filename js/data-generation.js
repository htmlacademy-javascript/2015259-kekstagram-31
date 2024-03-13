import { getRandomInteger, getRandomEArrayElement, generatedUniqueRandomId } from './util.js';
import { COMMENTS, CAPTIONS, NAMES, LIKES, COMMENTS_RANGE, ID_RANGE, PHOTOS, PHOTOS_AVATAR, ARRAY_RANGE } from './data.js';

const randomIdComment = generatedUniqueRandomId(ID_RANGE.MIN, ID_RANGE.MAX);
const randomIdPhotoDescription = generatedUniqueRandomId(ARRAY_RANGE.MIN, ARRAY_RANGE.MAX);
const randomIdPhoto = generatedUniqueRandomId(PHOTOS.MIN, PHOTOS.MAX);

//создает объект с комментарием
const createObjComment = () => ({
  id: randomIdComment(),
  avatar: `img/avatar-${getRandomInteger(PHOTOS_AVATAR.MIN, PHOTOS_AVATAR.MAX)}.svg`,
  message: getRandomEArrayElement(COMMENTS),
  name: getRandomEArrayElement(NAMES)
});

const createPhotoDescription = () => ({
  id: randomIdPhotoDescription(),
  url: `photos/${randomIdPhoto()}.jpg`,
  description: getRandomEArrayElement(CAPTIONS),
  likes: getRandomInteger(LIKES.MIN, LIKES.MAX),
  comments: Array.from({ length: getRandomInteger(COMMENTS_RANGE.MIN, COMMENTS_RANGE.MAX) }, createObjComment),
});

const createOverviewPhoto = () =>
  Array.from({ length: ARRAY_RANGE.MAX }, createPhotoDescription);

export { createOverviewPhoto };
