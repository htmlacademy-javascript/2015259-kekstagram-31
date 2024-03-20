import {
  validateUniqueHashtags,
  validateSymbolsHashtags,
  validateCountHashtags,
  validateHashtagsByLength,
  validateCommentLenght
} from './validator.js';

const form = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

//Cоздает новый объект pristine, который будет управлять валидацией формы,
//добавляя и удаляя классы и тексты об ошибках в зависимости от результатов валидации
const pristine = new window.Pristine(form, {
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

//Добавим обработчик события 'submit' для формы
form.addEventListener('submit', (evt) => {
  const value = textHashtags.value.trim();
  const valueComment = textDescription.value;
  const isValid = pristine.validate();
  if (value === '' && valueComment === '') {
    pristine.validate();
  } else {
    if (!isValid) {
      evt.preventDefault();
    }
  }
});
