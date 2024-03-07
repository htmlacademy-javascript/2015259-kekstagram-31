const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomEArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generatedUniqueRandomId = (min, max) => {
  let uniqueIdArray = [];

  const generateRandomId = () => {
    const randomNumbers = getRandomInteger(min, max);
    if (!uniqueIdArray.includes(randomNumbers)) {
      uniqueIdArray = [...uniqueIdArray, randomNumbers];
      return randomNumbers;
    } else {
      return generateRandomId();
    }

  };
  return generateRandomId;
};

export { getRandomInteger, getRandomEArrayElement, generatedUniqueRandomId };
