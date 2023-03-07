// Assignment Code
var generateBtn = document.querySelector("#generate");

// Creating arrays for potential characters to be used in password.
// For lowercase and numbers, utilized fromCharCode values to push selected range into my arrays. Shout out W3Schools
const lowercaseArr = [];
for (i = 97; i < 123; i++) {
  lowercaseArr.push(String.fromCharCode(i));
}

const uppercaseArr = [];
for (i = 0; i < lowercaseArr.length; i++) {
  uppercaseArr.push(lowercaseArr[i].toUpperCase());
}

const numberArr = [];
for (i = 48; i < 58; i++) {
  numberArr.push(String.fromCharCode(i));
}

let specialChar = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
const specialArr = specialChar.split("");

//setting empty array to be filled with user selection.
var passwordCharacters = [];

// challenge provided this function
let writePassword = function () {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
};

// If the user clicks OK on the confirm window, a boolean true is returned. If Cancel is clicked, false is returned.
// Utilized the if statement on this inital confirm to allow the user the option to cancel and exit process.
function generatePassword() {
  if (
    confirm(
      "Please complete the following prompts to select password length and desired characters."
    )
  ) {
  } else {
    return;
  }

  // Password length setup
  // Initializing invalidLength as true to allow while loop to iterate until we detemine the invalidLength is false, or in other words the password length is valid.
  var invalidLength = true;
  // while loop will run the code within its {} until the provided parameter (invalidLength) turns false.
  while (invalidLength) {
    var passwordLength = prompt(
      "Please select a password length between 8 and 128 characters."
    );
    // If the user clicks cancel in a prompt, it returns a value of null. Placing this first in the if sequence as the null will be coerced to a 0 if placed in a logical expression, which would result in a frustrating user experience if the null was to be run on the passwordLength < 8 level. Placing this first allows the user to cancel and exit the process.
    // I know the following run of if/else statements likely could have been condensed, but I wanted to challenge myself to learn some additional concepts and also provide the user with feedback specific to their input.
    if (passwordLength == null) {
      return;
      // If the user clicks OK without typing anything, it returns an empty string ("")
    } else if (passwordLength == "") {
      alert("Whoops! You didn't type anything. Please try again.");
    } else if (passwordLength < 8) {
      alert("You entered a number less than 8. Please try again.");
    } else if (passwordLength > 128) {
      alert("You entered a number greater than 128. Please try again.");
      // This ensures that only numbers are input. The prompt will only return a string, even if a number is input (i.e. input of 8 will return "8"). parseInt("string", 10) will force the string to be a number, and the 10 indicates that we return a normal decimal style number. Number.isNaN will take the result of the coerced number and return false if it is an actual number ("8" => 8 is a real number, so returns false) or true if it is not really a number, NaN ("hello" => coerced number hello is NaN, not a real number).
    } else if (Number.isNaN(parseInt(passwordLength, 10))) {
      alert("You didn't enter a number. Please try again.");
      // Math.round() will round the input to the nearest integer. If the result calculation does not equal the original input, then the number provided was a decimal and therefore not allowed (math.round(8.8) => 9, 9!= 8.8).
    } else if (Math.round(passwordLength) != passwordLength) {
      alert("No decimals allowed. Please try again.");
      // With all invalid entries accounted for, we know we have a valid password length, so we indicate invalidLength is false, which ceases the while loop and allows the user to proceed to the next section.
    } else if (8 <= passwordLength && passwordLength <= 128) {
      var invalidLength = false;
    } else {
      alert(
        "I'm not even sure what you did to get here, but please try again."
      );
    }
  }
  // if the user gets here and still has an invalidLength of true, this means they clicked cancel on the password length part. We want to catch them here and stop the function from continuing for better user experience.
  if (invalidLength) {
    return;
  }
  alert(
    "Success!! You've selected a password length of " +
      passwordLength +
      ". Great choice. \nPlease answer the following prompts to select which types of characters your password will be comprised of."
  );

  // declares variables to be filled out for use in verifying user selections and displaying clearly in prompt box what was selected.
  let l;
  let u;
  let n;
  let s;

  var useLowercase;
  var useUppercase;
  var useNumbers;
  var useSpecial;

  // setting while loop to force user to select at least one type of character
  var invalidPasswordChar = true;
  var userSelections = function () {
    while (invalidPasswordChar) {
      if (
        confirm(
          "Would you like to use lowercase letters?\n\nOK = Yes\nCancel = No"
        )
      ) {
        useLowercase = true;
        l = "Yes";
      } else {
        useLowercase = false;
        l = "No";
      }
      if (
        confirm(
          "Would you like to use uppercase letters?\n\nOK = Yes\nCancel = No"
        )
      ) {
        useUppercase = true;
        u = "Yes";
      } else {
        useUppercase = false;
        u = "No";
      }
      if (confirm("Would you like to use numbers?\n\nOK = Yes\nCancel = No")) {
        useNumbers = true;
        n = "Yes";
      } else {
        useNumbers = false;
        n = "No";
      }
      if (
        confirm(
          "Would you like to use special characters?\n\nOK = Yes\nCancel = No"
        )
      ) {
        useSpecial = true;
        s = "Yes";
      } else {
        useSpecial = false;
        s = "No";
      }

      // verifies that at lease one character was selected and exits while loop
      if (
        useLowercase === true ||
        useUppercase === true ||
        useNumbers === true ||
        useSpecial === true
      ) {
        invalidPasswordChar = false;
      }

      // if all criteria are false, gives the user an alert to pick some characters before re-initiating while loop.
      if (
        useLowercase != true &&
        useUppercase != true &&
        useNumbers != true &&
        useSpecial != true
      ) {
        alert(
          "Not much of a password if you don't use any of the characters! Please try again and make at least one selection."
        );
      }
    }

    // allows the user to confirm their selections. if they confirm, password generation process will proceed, if they decline, character selection while loop criteria is reset and funtion is recalled.
    if (
      confirm(
        "To confirm, you made the following selections: \n\nUse lowercase letters: " +
          l +
          "\nUse uppercase letters: " +
          u +
          "\nUse numbers: " +
          n +
          "\nUse special characters: " +
          s +
          "\n\nIf correct press OK to have your password generated. If you would like to make different selections, press cancel."
      )
    ) {
      var getPasswordChars = function () {
        passwordCharacters.length = 0;
        if (useLowercase) {
          passwordCharacters = passwordCharacters.concat(lowercaseArr);
        }
        if (useUppercase) {
          passwordCharacters = passwordCharacters.concat(uppercaseArr);
        }
        if (useNumbers) {
          passwordCharacters = passwordCharacters.concat(numberArr);
        }
        if (useSpecial) {
          passwordCharacters = passwordCharacters.concat(specialArr);
        }
        console.log(passwordCharacters);
      };
      getPasswordChars();
    } else {
      invalidPasswordChar = true;
      userSelections();
    }
  };

  // original prompt of userSelections
  userSelections();

  // generates a random number between 0 and the length of the selected characters, then feeds it into the characters array to pull out a randon character.
  function getRandomChar() {
    let rand = Math.floor(Math.random() * passwordCharacters.length);
    return passwordCharacters[rand];
  }
  getRandomChar();

  // declares an empty string to fill in the final password. starts at 1 and loops throught the getrandomchar function until the selected password length is met, adds each random character into the pw string, then returns the value of pw, which becomes the password value pushed to the screen.
  let pw = "";
  for (let i = 1; i <= passwordLength; i++) {
    pw += getRandomChar();
  }
  console.log(pw);
  return pw;
}

console.log("phew, it worked!!");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// copy button functions. set varibles to be called
let copyText = document.querySelector("#password");
var copyBtn = document.querySelector("#copyBtn");

// function to select all text in the text area and copy it to the clipboard
let copyPassword = function () {
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
};

// once copy button is clicked, changes text to verify for user
let copiedPassword = function () {
  copyBtn.innerText = "Copied!";
};

let reCopyPassword = function() {
  copyBtn.innerText = "Copy"
}

// adds event listeners on click to copy password and change text
copyBtn.addEventListener("click", copyPassword);
copyBtn.addEventListener("click", copiedPassword);
generateBtn.addEventListener("click", reCopyPassword);
