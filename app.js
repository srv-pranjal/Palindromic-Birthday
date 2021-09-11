const birthday = document.querySelector("#bday");
const formRef = document.querySelector("#form");
const outputMessage = document.querySelector("#output");
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const dateFormats = [
  "DD-MM-YYYY",
  "MM-DD-YYYY",
  "YYYY-MM-DD",
  "DD-MM-YY",
  "MM-DD-YY",
  "YY-MM-DD",
];

let date = {
  day: 0,
  month: 0,
  year: 0,
};

function getDateForAllFormats(date) {
  dayStr = date.day < 10 ? "0" + date.day : date.day.toString();
  monthStr = date.month < 10 ? "0" + date.month : date.month.toString();
  yearStr = date.year.toString();
  let dateVariations = [];
  dateVariations.push(dayStr + monthStr + yearStr);
  dateVariations.push(monthStr + dayStr + yearStr);
  dateVariations.push(yearStr + monthStr + dayStr);
  dateVariations.push(dayStr + monthStr + yearStr.slice(-2));
  dateVariations.push(monthStr + dayStr + yearStr.slice(-2));
  dateVariations.push(yearStr.slice(-2) + monthStr + dayStr);
  return dateVariations;
}

function isPalindrome(bday) {
  reversedBday = bday.split("").reverse().join("");
  if (bday === reversedBday) {
    return true;
  }
  return false;
}

function isPalindromeForAnyFormat(date) {
  const datesInAllFormats = getDateForAllFormats(date);
  for (let index = 0; index < datesInAllFormats.length; index++) {
    if (isPalindrome(datesInAllFormats[index])) {
      return [true, dateFormats[index]];
    }
  }
  return [false, ""];
}
function isLeapYear(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  }
  return false;
}
function getNextDate(date) {
  daysInMonth[1] = 28;
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;
  if (isLeapYear(year)) {
    daysInMonth[1] = 29;
  }
  if (day > daysInMonth[month - 1]) {
    day = 1;
    month++;
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return { day, month, year };
}

function getNextPalindromicDate() {
  let nextDate = getNextDate(date);
  nextDifference = 0;
  while (true) {
    nextDifference++;
    const [palindromeCheck, format] = isPalindromeForAnyFormat(nextDate);
    if (palindromeCheck) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [nextDate, nextDifference];
}

function getPreviousDate(date) {
  daysInMonth[1] = 28;
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;
  if (isLeapYear(year)) {
    daysInMonth[1] = 29;
  }
  if (day < 1) {
    month--;
    if (month < 1) {
      month = 12;
      year--;
    }
    day = daysInMonth[month - 1];
  }
  return { day, month, year };
}

function getPreviousPalindromicDate() {
  let previousDate = getPreviousDate(date);
  previousDifference = 0;
  while (true) {
    previousDifference++;
    const [palindromeCheck, format] = isPalindromeForAnyFormat(previousDate);
    if (palindromeCheck) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }
  return [previousDate, previousDifference];
}

function getNearestPalindromicDate() {
  let [nextPalindromicDate, nextPalindromicDifference] =
    getNextPalindromicDate();
  let [previousPalindromicDate, previousPalindromicDifference] =
    getPreviousPalindromicDate();
  if (nextPalindromicDifference <= previousPalindromicDifference) {
    return [nextPalindromicDate, nextPalindromicDifference];
  }
  return [previousPalindromicDate, previousPalindromicDifference];
}
function formSubmitHandler(e) {
  e.preventDefault();
  if (birthday.value) {
    let dateArray = birthday.value.split("-");
    date.day = Number(dateArray[2]);
    date.month = Number(dateArray[1]);
    date.year = Number(dateArray[0]);
    const [palindromeCheck, format] = isPalindromeForAnyFormat(date);
    outputMessage.style.display = "block";
    if (palindromeCheck) {
      outputMessage.innerText = `Woahhhh!! Your birthday is Palindrome in ${format} format 🥳🥳`;
    } else {
      const [nearestPalindromicDate, nearestPalindromicDifference] =
        getNearestPalindromicDate();
      let nearestDate = "";
      nearestDate += nearestPalindromicDate.day + "-";
      nearestDate += nearestPalindromicDate.month + "-";
      nearestDate += nearestPalindromicDate.year;
      outputMessage.innerText = `Oopsss!! Your birthday is not Palindrome\nNearest Palindrome date is ${nearestDate} You missed by ${nearestPalindromicDifference} days`;
    }
  }
}

formRef.addEventListener("submit", formSubmitHandler);
