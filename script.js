const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const alphabets = "abcdefghijklmnopqrstuvwxyz";
const symbols = `!@#$%^&*():;[]+=-_`;

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

clipboardEl.addEventListener("click", () =>
  navigator.clipboard.writeText(resultEl.innerText)
);

generateEl.addEventListener("click", () => generatePassword());

function generatePassword(lower, upper, number, symbol, length) {
  let randomStr = "";
  const funcArr = Object.keys(randomFunc);
  const len = Number(lengthEl.value);
  let q = 0;
  for (let i = 0; i <= len; i++) {
    if (q === funcArr.length) {
      q = 0;
    }
    randomStr += randomFunc[funcArr[q]]();
    q++;
  }
  const randArraySplit = randomStr.split("");
  for (let i = 100; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randArraySplit[i], randArraySplit[j]] = [
      randArraySplit[j],
      randArraySplit[i],
    ];
  }
  randomStr = randArraySplit.join("");
  resultEl.innerText = randomStr;
}

function getRandomLower() {
  const alpha = "abcdefghijklmnopqrstuvwxyz";
  return alphabets.charAt(Math.round(Math.random() * 26));
}

function getRandomUpper() {
  return alphabets.charAt(Math.round(Math.random() * 26)).toUpperCase();
}

function getRandomNumber() {
  return Math.round(Math.random() * 9);
}

function getRandomSymbol() {
  return symbols.charAt(Math.round(Math.random() * 26));
}
