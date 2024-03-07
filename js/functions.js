//Функция для проверки длины строки
const checkLength = (string, maxlength) => (string.length <= maxlength) ? 'true' : 'false';

checkLength('проверяемая строка', 20); // вернет true
checkLength('проверяемая строка', 18); //вернет true
checkLength('проверяемая строка', 10); //вернет false

//Функция для проверки, является ли строка палиндромом
function isPalindrome(string) {
  const normalString = string.replaceAll(' ', '').toLowerCase();//удаляет пробелы и приводит строку к нижнему регистру
  let newString = '';//создает новую пустую строку
  //проверяет является ли строка полиндромом с помощью цикла for
  for (let i = normalString.length - 1; i >= 0; i--) {
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
function getNumbers(str) {
  //Если передано число, преобразует его в строку
  let newStr = str;
  if (typeof str === 'number') {
    newStr = str.toString();
  }
  // перебирает массив с проверкой стал ли символ числом
  let numbers = '';
  for (let i = 0; i < newStr.length; i++) {
    if (!Number.isNaN(parseInt(newStr[i], 10))) {
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

//Задание 5.16 "Делу-время"
//Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах
//и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.

function businessTime(startWork, endWork, meetingStart, meetingTime) {
  // Преобразуем время в минуты
  const startWorkMinutes = parseInt(startWork.split(':')[0], 10) * 60 + parseInt(startWork.split(':')[1], 10);
  const endWorkMinutes = parseInt(endWork.split(':')[0], 10) * 60 + parseInt(endWork.split(':')[1], 10);
  const meetingStartMinutes = parseInt(meetingStart.split(':')[0], 10) * 60 + parseInt(meetingStart.split(':')[1], 10);
  const meetingTimeMinutes = meetingStartMinutes + meetingTime;

  // Проверяем, выходит ли встреча за рамки рабочего дня
  return startWorkMinutes <= meetingStartMinutes && meetingTimeMinutes <= endWorkMinutes;
}

businessTime('08:00', '17:30', '14:00', 90); // true
businessTime('8:0', '10:0', '8:0', 120); // true
businessTime('08:30', '14:30', '14:00', 90); // false
businessTime('14:00', '17:30', '08:0', 90); // false
businessTime('8:00', '17:30', '08:00', 900); // false
