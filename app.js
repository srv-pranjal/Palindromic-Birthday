const birthday = document.querySelector("#bday");
const formRef = document.querySelector("#form");
const outputMessage = document.querySelector("#output");
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

function getDateForAllFormats() {
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

function isPalindromeForAnyFormat() {
  const datesInAllFormats = getDateForAllFormats();
  for (let index = 0; index < datesInAllFormats.length; index++) {
    if (isPalindrome(datesInAllFormats[index])) {
      return [true, dateFormats[index]];
    }
    return [false, ""];
  }
}

function formSubmitHandler(e) {
  e.preventDefault();
  if (birthday.value) {
    let dateArray = birthday.value.split("-");
    date.day = Number(dateArray[2]);
    date.month = Number(dateArray[1]);
    date.year = Number(dateArray[0]);
    const [palindromeCheck, format] = isPalindromeForAnyFormat();
    if (palindromeCheck) {
      outputMessage.innerText = `Woahhhh!! Your birthday is Palindrome in ${format} format`;
    } else {
      outputMessage.innerText = `Oopsss!! It seems like your birthday is not Palindrome`;
    }
  }
}

formRef.addEventListener("submit", formSubmitHandler);
