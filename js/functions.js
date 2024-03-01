//Функция для проверки длины строки
const checkLength = (string, maxlength) => (string.length <= maxlength) ? 'true' : 'false';

checkLength('проверяемая строка', 20); // вернет true
checkLength('проверяемая строка', 18); //вернет true
checkLength('проверяемая строка', 10); //вернет false

//Функция для проверки, является ли строка палиндромом
function isPalindrome (string) {
  const normalString = string.replaceAll(' ', '').toLowerCase();//удаляет пробелы и приводит строку к нижнему регистру
  let newString = '';//создает новую пустую строку
  //проверяет является ли строка полиндромом с помощью цикла for
  for (let i = normalString.length - 1; i >= 0 ; i--) {
    newString += normalString[i];
  }
  //сравнивает полученную строку с "нормализованной"
  if (normalString === newString) {
    return true;
  }
  return false;
}

isPalindrome('ДовОд'); // вернет true
isPalindrome('Лёша на полке клопа нашёл '); // вернет true
isPalindrome('Кекс всему голова'); //вернет false

//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа
function getNumbers (str) {
  //Если передано число, преобразует его в строку
  let newStr = str;
  if (typeof str === 'number') {
    newStr = str.toString();
  }
  // перебирает массив с проверкой стал ли символ числом
  let numbers = '';
  for (let i = 0; i < newStr.length; i++) {
    if(!Number.isNaN(parseInt(newStr[i], 10))) {
      numbers += newStr[i];
    }
  }
  // условие, если в строке нет ни одной цифры - возвращает NaN
  if (numbers === '') {
    return NaN;
  }
  return parseInt(numbers, 10);
}

getNumbers('ECMAScript 2022');
getNumbers('2023 год');
getNumbers('1 кефир, 0.5 батона');
getNumbers('агент 007');
getNumbers('а я томат');
getNumbers(2023);
getNumbers(-1);
getNumbers(1.5);
