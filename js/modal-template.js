const MAX_COMMENTS_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.social__comments-loader');
const currentCommentsCount = document.querySelector('.social__comment-shown-count');

//создаем и заполняем новый комментарий
const createNewComment = ({ avatar, name, message }) => {
  const commentsBlock = commentTemplate.cloneNode(true);
  const socialPicture = commentsBlock.querySelector('.social__picture');

  socialPicture.src = avatar;
  socialPicture.alt = name;
  commentsBlock.querySelector('.social__text').textContent = message;

  return commentsBlock;
};

//добавим комментарии на страницу
const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  fragment.append(...comments.map(createNewComment));

  socialCommentsList.append(fragment);
};

let count = 0;
let pictureComments = []; // Массив для заполнения комментариями, которые видит пользователь


//функция загружающая дополнительные комментарии к изображению
const onCommentsLoaderClick = () => {
  const nextComments = pictureComments.slice(count, count + MAX_COMMENTS_COUNT);
  renderComments(nextComments);

  count += nextComments.length;
  currentCommentsCount.textContent = count;

  if (count >= pictureComments.length) {
    commentsLoader.classList.add('hidden');
  }

};

const renderCommentsBlock = (post) => {
  //ограничим количество комментариев, которые необходимо отображать
  pictureComments = post.comments;
  count = Math.min(pictureComments.length, MAX_COMMENTS_COUNT);

  //заполним отображение информации
  socialCaption.textContent = post.description;
  bigPicture.src = post.url;
  likesCount.textContent = post.likes;
  currentCommentsCount.textContent = count;

  renderComments(pictureComments.slice(0, count));

  if (pictureComments.length <= +currentCommentsCount.textContent) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

export { renderCommentsBlock };
