/*Задача
Реализовать сценарий просмотра фотографий в полноразмерном режиме. В таком режиме пользователь получает несколько дополнительных возможностей: детально рассмотреть изображение, поставить «лайк», почитать комментарии, оставленные другими пользователями.
1.Заведите модуль, который будет отвечать за отрисовку окна с полноразмерным изображением.
2.Окно должно открываться при клике на миниатюру. Данные для окна (изображение, комментарии, лайки и так далее) берите из того же объекта, который использовался для отрисовки соответствующей миниатюры.
3.Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:
 - Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.
 - Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
 - Количество показанных комментариев подставьте как текстовое содержание элемента .social__comment-shown-count.
 - Общее количество комментариев к фотографии comments подставьте как текстовое содержание элемента .social__comment-total-count.
 - Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

<li class="social__comment">
  <img
    class="social__picture"
    src="{{аватар}}"
    alt="{{имя комментатора}}"
    width="35" height="35">
  <p class="social__text">{{текст комментария}}</p>
</li>

 - Описание фотографии description вставьте строкой в блок .social__caption.
4 .После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.
5. После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.
6. Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.
7. Подключите модуль в проект.*/
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomEArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generatedUniqueRandomId = (min, max) => {
  let uniqueIdArray = [];

  const generateRandomId = () => {
    const randomNumbers = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!uniqueIdArray.includes(randomNumbers)) {
      uniqueIdArray = [...uniqueIdArray, randomNumbers];
      return randomNumbers;
    } else {
      return generateRandomId();
    }

  };
  return generateRandomId;
};

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const checkIdentical = (items) => items.some((item, i) => items.indexOf(item, i + 1) > -1);

export { getRandomInteger, getRandomEArrayElement, generatedUniqueRandomId, isEscapeKey, checkIdentical };
