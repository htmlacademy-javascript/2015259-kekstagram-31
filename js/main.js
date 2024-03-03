const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const CAPTIONS = [
  'Вся красота мира в одной картинке!',
  'Сегодня - самый лучший день',
  'Волны моря - лучший танец для глаз',
  'Улыбайтесь шире, смейтесь чаще',
  'Жизнь слишком коротка для плохих мыслей',
  'Было сложно, но зато как вышло!',
  'Уровень доверия: селфи без фильтра',
  'Нет оправдания лени, но я все еще ищу',
  'Момент, когда вы понимаете, что все идеально',
  'Ничего не делать трудно, никогда не знаешь, когда закончишь',
  'Разбираю свою жизнь, как Мари Кондо',
  'Делай ьл, что делает тебя счастливее',
  'Соскучились?',
  'Я смог, значит, и вы сможете',
  'Настроение - лето',
  'Время приключений',
  'Шоколад дешевле, чем терапия',
  'Твори, вдохновляй, мечтай',
  'Сюрприз!',
  'Жара лютая, но у меня есть кондиционер! Прошу не завидовать',
];

const NAMES = [
  'Марат', 'Ольга', 'Дмитрий', 'Алексей', 'Игорь', 'Ирина', 'Елена', 'Семен', 'Иван', 'Дарья', 'Ника', 'Анна', 'Данил', 'Сергей', 'Светлана',
];

const LIKES = {
  MIN: 15,
  MAX: 200
};

const PHOTOS = {
  MIN: 1,
  MAX: 25
};

const COMMENTS_RANGE = {
  MIN: 0,
  MAX: 30
};

const PHOTOS_AVATAR = {
  MIN: 1,
  MAX: 6
};

const ID_RANGE = {
  MIN: 1,
  MAX: 500
};

const ARRAY_RANGE = {
  MIN: 1,
  MAX: 25
};

//функция для генерации случайного числа
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createRandomComment = () => COMMENTS[getRandomInteger(0,COMMENTS.length - 1)];

const createRandomName = () => NAMES[getRandomInteger(0, NAMES.length - 1)];

const createRandomDescription = () => CAPTIONS[getRandomInteger(0,CAPTIONS.length - 1)];

//создает объект с комментарием
const createObjComment = () => ({
  id: getRandomInteger(ID_RANGE.MIN, ID_RANGE.MAX),
  avatar: `img/avatar-${getRandomInteger(PHOTOS_AVATAR.MIN, PHOTOS_AVATAR.MAX)}.svg`,
  message: createRandomComment(),
  name: createRandomName()
});

//создает массив из 25 объектов
function createOverviewPhoto () {
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
      url: `photos${ getRandomInteger(PHOTOS.MIN, PHOTOS.MAX)}.jpg`,
      description: `${createRandomDescription()}`,
      likes: getRandomInteger(LIKES.MIN, LIKES.MAX),
      comments: comment,
    };
    photos.push(photoObj);
  }
  return photos;
}
createOverviewPhoto();
