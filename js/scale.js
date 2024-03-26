const ScaleValue = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
};

const preview = document.querySelector('.img-upload__preview img');
const smallerScale = document.querySelector('.scale__control--smaller');
const biggerScale = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');

let currentScale = ScaleValue.MAX;

//изменение масштаба изображения
const changeImageScale = (value) => {
  currentScale = value;
  scaleControl.value = `${value}%`;
  preview.style.transform = `scale(${value / 100})`;
};

//обработчики событий на контроллерах
smallerScale.addEventListener('click', () => {
  if (currentScale - ScaleValue.STEP >= ScaleValue.MIN) {
    changeImageScale(currentScale - ScaleValue.STEP);
  }
});

biggerScale.addEventListener('click', () => {
  if (currentScale + ScaleValue.STEP <= ScaleValue.MAX) {
    changeImageScale(currentScale + ScaleValue.STEP);
  }
});

changeImageScale(ScaleValue.MAX);

export {
  changeImageScale,
  ScaleValue,
};
