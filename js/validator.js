import { checkIdentical } from './util.js';

const form = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const HASHTAG_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

//хэштег начинается с символа # и содержит только буквы, цыфры и русские буквы
const hashtagSymbolRegexp = /^#[A-Za-zА-Яа-яЁё0-9]+$/;

//Функция удаляет лишние пробелы, приводит хэштеги к нижнему регистру и разделяет их пробелами.
const parseHashtagInput = (value) => value.trim().toLowerCase().split(/\s+/);

//проверим что длина каждого хэштега не привышает максимально заданной длины
const checkHashtagsLength = (hashtags) => hashtags.every((hashtag) => hashtag.length <= HASHTAG_MAX_LENGTH);
const validateHashtagsByLength = (value) => {
  const hashtags = parseHashtagInput(value);
  return checkHashtagsLength(hashtags);
};

//проверка хэштогов на соответсвие условий заполнения
const validateHashtagsByMask = (hashtags) => hashtags.every((hashtag) => hashtagSymbolRegexp.test(hashtag));

//проверка хэштегов на уникальность
const validateUniqueHashtags = (value) => {
  const hashtags = parseHashtagInput(value);
  return !checkIdentical(hashtags);
};

//проверка поля на наличие хэштегов и их соответсвие условий заполнения
const validateSymbolsHashtags = (value) => value === '' || validateHashtagsByMask(parseHashtagInput(value));

//проверка количества хэштегов в поле на соотвесвие максимально заданному количеству
const validateCountHashtags = (value) => {
  const hashtags = parseHashtagInput(value);
  return hashtags.length <= HASHTAG_MAX_COUNT;
};

//проверка длины комментария
const validateCommentLenght = (comment) => comment.length <= MAX_COMMENT_LENGTH;

//Cоздает новый объект pristine, который будет управлять валидацией формы,
//добавляя и удаляя классы и тексты об ошибках в зависимости от результатов валидации
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

//Добавим валидаторы к полям формы, каждый с соответствующими условиями проверки и сообщением об ошибке в случае невалидных данных.
pristine.addValidator(textHashtags, validateCountHashtags, 'Не более 5 хэштегов', 1, true);
pristine.addValidator(textHashtags, validateHashtagsByLength, 'Максимальная длина хэштега 20 символов, включая решётку', 1, true);
pristine.addValidator(textHashtags, validateSymbolsHashtags, 'После # используйте буквы и цифры, без пробелов и спецсимволов', 1, true);
pristine.addValidator(textHashtags, validateUniqueHashtags, 'Хэштеги не должны повторяться', 1, true);
pristine.addValidator(textDescription, validateCommentLenght, 'Длина комментария не более 140 символов', 1, true);

const resetValidators = () => {
  pristine.reset();
};

export { pristine, resetValidators };

//хэштег начинается с символа # (решётка);
//строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
//хеш-тег не может состоять только из одной решётки;
//максимальная длина одного хэштега 20 символов, включая решётку;
//хэштеги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
//хэштеги разделяются пробелами;
//один и тот же хэштег не может быть использован дважды;
//нельзя указать больше пяти хэштегов;
//хэштеги необязательны;
//если фокус находится в поле ввода хэштега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

//комментарий не обязателен;
//длина комментария не может составлять больше 140 символов;
//если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
