const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");
const settings = document.querySelectorAll(".setting");

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
    console.log(randomFunc);
    console.log(randFuncArray);
  });
});

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
