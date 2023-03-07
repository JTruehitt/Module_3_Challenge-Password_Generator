// Assignment Code
var generateBtn = document.querySelector("#generate");

// My code starts below this line

// Creating arrays for possible selection criteria: lowercase, uppercase, numbers, special characters
// reference on how to pull desired characters:
// String.fromCharCode: https://www.w3schools.com/jsref/jsref_fromcharcode.asp
// List of useful charcodes: https://www.w3schools.com/charsets/ref_utf_basic_latin.asp
// lowercase codes: 97 - 122
// uppercase codes: 65 - 90
// number codes: 48 - 57
// special codes: due to different ranges, copied special codes from link provided in Module 3 instructions: "!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"

// Creating array for lowercase letters
const lowercaseArr = [];
for (i = 97; i < 123; i++) {
  lowercaseArr.push(String.fromCharCode(i));
}

// Creating array for uppercase letters. I could have used the same method as above but wanted to explore other options for learning purposes.
const uppercaseArr = [];
for (i = 0; i < lowercaseArr.length; i++) {
  uppercaseArr.push(lowercaseArr[i].toUpperCase());
}

// Creating array for numbers
const numberArr = [];
for (i = 48; i < 58; i++) {
  numberArr.push(String.fromCharCode(i));
}

// Setting array for special
let specialChar = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
// break up continuous string into individual items for an array
const specialArr = specialChar.split("");

// confirmed all arrays loaded correctly. success!
// console.log(lowercaseArr)
// console.log(uppercaseArr)
// console.log(numberArr)
// console.log(specialArr)

// putting dummy value for ps right now
function generatePassword() {
  "password123";
}

// Moved provided code down here
// Write password to the #password input
// initializing varibles to be filled or changed through user prompts
var useLowercase = false;
var useUppercase = false;
var useNumbers = false;
var useSpecial = false;

function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  // my code starts below
  // If the user clicks OK, a boolean true is returned. If Cancel is clicked, false is returned.
  // Utilized the if statement on this inital confirm to allow the user the option to cancel and exit process.
  if (
    confirm(
      "Please complete the following prompts to select password length and desired characters."
    )
  ) {
    var startPrompts = "Proceeding to generate password";
  } else {
    var startPrompts = "User chose not to proceed";
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
      // This ensures that only numbers aare input. The prompt will only return a string, even if a number is input (i.e. input of 8 will return "8"). parseInt("string", 10) will force the string to be a number, and the 10 indicates that we return a normal decimal style number. Number.isNaN will take the result of the coerced number and return false if it is an actual number ("8" => 8 is a real number, so returns false) or not true if it is not really a number, NaN ("hello" => coerced number hello is NaN, not a real number).
    } else if (Number.isNaN(parseInt(passwordLength, 10))) {
      alert("You didn't enter a number. Please try again.");
      // Math.round() will round the input to the nearest integer. If the result calculation does not equal the original input, then the number provided was a decimal and therefore not allowed (math.round(8.8) => 9, 9!= 8.8).
    } else if (Math.round(passwordLength) != passwordLength) {
      alert("No decimals allowed. Please try again.");
      // With all invalid entries accounted for, we know we have a valid password length, so we indicate invalidLength is false, which ceases the while loop and allows the user to proceed to the next section.
    } else if (8 <= passwordLength && passwordLength <= 128) {
      var invalidLength = false;
    } else {
      alert("I'm not even sure what you did to get here, but please try again");
    }
  }
  // if the user gets here and still has an invalidLength of true, this means they clicked cancel on the password length part. We want to catch them here and stop the function from continuing.
  if (invalidLength) {
    return;
  }
  alert(
    "Success!! You've selected a password length of " +
      passwordLength +
      ". Great choice. \nPlease answer the following prompts to select which types of characters your password will be comprised of."
  );
  
  let l = "";
  let u = "";
  let n = "";
  let s = "";

  var userSelections = function () {
    if (confirm("Would you like to use lowercase letters?")) {
      useLowercase = true;
    } else {
      useLowercase = false;
    }
    if (confirm("Would you like to use uppercase letters?")) {
      useUppercase = true;
    } else {
      useUppercase = false;
    }
    if (confirm("Would you like to use numbers?")) {
      useNumbers = true;
    } else {
      useNumbers = false;
    }
    if (confirm("Would you like to use special characters?")) {
      useSpecial = true;
    } else {
      useSpecial = false;
    }

    if (
      useLowercase != true &&
      useUppercase != true &&
      useNumbers != true &&
      useSpecial != true
    ) {
      alert(
        "Not much of a password if you don't use any of the characters! Please try again and make at least one selection"
      );
      userSelections();
    }

    if (useLowercase) {
      l = "Yes";
    } else {
      l = "No";
    }
    if (useUppercase) {
      u = "Yes";
    } else {
      u = "No";
    }
    if (useNumbers) {
      n = "Yes";
    } else {
      n = "No";
    }
    if (useSpecial) {
      s = "Yes";
    } else {
      s = "No";
    }

    var passwordCharacters = [];

    var buildPassword = function () {
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
        passwordCharacters = passwordCharacters.concat(specialArr)
      }
      console.log(passwordCharacters)
    };
    if (
      confirm(
        "Great. To confirm, you made the following selections: \nUse lowercase letters: " +
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
      buildPassword();
    } else {
      userSelections();
    }
  };

  userSelections();
  // console.log(useLowercase);
  // console.log(useUppercase);
  // console.log(useNumbers);
  // console.log(useSpecial);

  console.log("this worked!!");

  passwordText.value = password;
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
