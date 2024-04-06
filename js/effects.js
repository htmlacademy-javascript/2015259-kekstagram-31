const setStyle = {
  chrome: { min: 0, max: 1, step: 0.1, style: (value) => `grayscale(${value})` },
  sepia: { min: 0, max: 1, step: 0.1, style: (value) => `sepia(${value})` },
  marvin: { min: 0, max: 100, step: 1, style: (value) => `invert(${value}%)` },
  phobos: { min: 0, max: 3, step: 0.1, style: (value) => `blur(${value}px)` },
  heat: { min: 1, max: 3, step: 0.1, style: (value) => `brightness(${value})` },
  none: { min: 0, max: 100, step: 1, style: () => 'none' },
};

const effectLevel = document.querySelector('.effect-level');
const sliderElement = effectLevel.querySelector('.effect-level__slider');
const sliderValue = effectLevel.querySelector('.effect-level__value');

const imgUploadPreview = document.querySelector('.img-upload__preview img');

const imgEffect = {
  effect: 'none',
  value: 100,
};

const resetEffectImage = () => {
  imgEffect.effect = 'none';
  imgEffect.value = 100;

  // eslint-disable-next-line no-use-before-define
  updateEffectImage();
};

// функция обновляющая изображение с применением выбранного эффекта
const updateEffectImage = () => {
  sliderValue.value = imgEffect.value;
  imgUploadPreview.style.filter = setStyle[imgEffect.effect].style(imgEffect.value);

  imgUploadPreview.classList.forEach((item) => {
    if (item.includes('effects__preview--')) {
      imgUploadPreview.classList.remove(item);
    }
  });

  imgUploadPreview.classList.add(`effects__preview--${imgEffect.effect}`);

  if (imgEffect.effect === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
};

//функция создает и настраивает слайдер для выбора значения эффекта изображения с учетом параметров
const createSlider = () => {
  window.noUiSlider.create(sliderElement, {
    range: {
      min: setStyle[imgEffect.effect].min,
      max: setStyle[imgEffect.effect].max,
    },
    start: setStyle[imgEffect.effect].max,
    step: setStyle[imgEffect.effect].step,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });

  sliderElement.noUiSlider.on('update', (values, handle) => {
    imgEffect.value = values[handle];

    updateEffectImage();
  });
};

//функция обновляющая параметры слайдера в зависимости от выбранного эффекта изображения
const updateOptionsSlider = (effect) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: setStyle[effect].min,
      max: setStyle[effect].max,
    },
    start: setStyle[effect].max,
    step: setStyle[effect].step,
  });
};

//функция-обработчик
const onEffectsChange = (evt) => {
  const effect = evt.target.id.split('-')[1];

  imgEffect.effect = effect;

  updateOptionsSlider(effect);
  updateEffectImage();
};

export { resetEffectImage, createSlider, onEffectsChange };
