const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");
const settings = document.querySelectorAll(".setting");
const resultElContainer = document.querySelector(".result-container");

const alphabets = "abcdefghijklmnopqrstuvwxyz";
const symbols = `!@#$%^&*():;[]+=-_`;

const randomFunc = {
  lowercase: getRandomLower,
  uppercase: getRandomUpper,
  numbers: getRandomNumber,
  symbols: getRandomSymbol,
};
const sampleRandFunc = {
  lowercase: getRandomLower,
  uppercase: getRandomUpper,
  numbers: getRandomNumber,
  symbols: getRandomSymbol,
};
const selectionArray = ["uppercase", "lowercase", "numbers", "symbols"];

clipboardEl.addEventListener("click", () => {
  if (resultEl.innerText.length === 0) {
    alert("There is nothing to copy");
    return;
  }
  navigator.clipboard.writeText(resultEl.innerText);
  resultElContainer.style.border = "3px solid green";
  setTimeout(() => {
    resultElContainer.style.border = "";
  }, 1000);
});

settings.forEach((item, index) => {
  if (index === 0) return;
  item.querySelector("input").addEventListener("change", () => {
    let randFuncArray = Object.keys(randomFunc);
    if (item.querySelector("input").checked === true) {
      if (
        randFuncArray.includes(item.querySelector("input").getAttribute("id"))
      )
        return;
      console.log("Came");
      randomFunc[item.querySelector("input").getAttribute("id")] =
        sampleRandFunc[item.querySelector("input").getAttribute("id")];
    } else {
      delete randomFunc[item.querySelector("input").getAttribute("id")];
    }
    randFuncArray = Object.keys(randomFunc);
  });
});

generateEl.addEventListener("click", () => generatePassword());

function generatePassword() {
  if (Object.keys(randomFunc).length === 0) {
    alert("At least one setting should be selected");
    return;
  }
  let randomStr = "";
  const funcArr = Object.keys(randomFunc);
  const len = Number(lengthEl.value) - 1;
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
