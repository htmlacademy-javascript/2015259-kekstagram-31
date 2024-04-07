const ScaleValue = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
};

const preview = document.querySelector('.img-upload__preview img');
const scaleControls = document.querySelector('.img-upload__scale');
const smallerScale = document.querySelector('.scale__control--smaller');
const biggerScale = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

let currentScale = ScaleValue.MAX;

//изменение масштаба изображения
const changeImageScale = (value) => {
  currentScale = value;
  scaleControlValue.value = `${value}%`;
  preview.style.transform = `scale(${value / 100})`;
};

//обработчики событий на контроллерах
scaleControls.addEventListener('click', (evt) => {
  const target = evt.target;
  if (target === smallerScale) {
    if (currentScale - ScaleValue.STEP >= ScaleValue.MIN) {
      changeImageScale(currentScale - ScaleValue.STEP);
    }
  } else if (target === biggerScale) {
    if (currentScale + ScaleValue.STEP <= ScaleValue.MAX) {
      changeImageScale(currentScale + ScaleValue.STEP);
    }
  }
});

changeImageScale(ScaleValue.MAX);

export {
  changeImageScale,
  ScaleValue,
};
