var words = ["Modigliani", "Charlemagne", "Champagne", "Picasso", "Kowabunga",
              "Kombucha", "Heartache", "Christmas", "Channukah", "Ornamental",
              "Cappuccino", "Electricity", "Vegetarians", "Oklahoma", "Selvedge",
              "Heteronormativity", "Intersectionality", "Penultimate", "Perfunctory",
              "Vancouver", "Renumerative", "Magnanimous", "California", "Anecdotal"]
var word = "";
var guessedWord = [];
var guessedLetter = "";
var guessedLetters = [];
var lives = 6;
var userGuess = "";

init();

function init(){
  selectWord();
  createGuessedWord();
  displayWord(guessedWord);
  while (!validateWord() && lives > 0){
    turn();
  }
  if (validateWord() == true){
    console.log("Congratulations! You won with " + lives + " lives left!");
  }
  else if (lives == 0){
    console.log("Unfortunately you lost! Better luck next time)
  }
}
function selectWord (){
  console.log("Generating your word");
  var dividable = Math.floor(Math.random() * words.length);
  word = words[dividable].toLowerCase().split("");
  console.log(word);
}
function createGuessedWord(){
  for (var x = 0; x < word.length; x++){
    guessedWord.push("-");
  }
  return guessedWord;
}
function validateWord(){
  for (var x = 0; x < word.length; x++){
    if (word[x] != guessedWord[x]){
      return false;
    }
  }
  return true;
}
function guessLetter(){
  guessedLetter = "";
  guessedLetter = prompt("Please Enter a Letter");
  return guessedLetter;
}

function displayWord(word){
  console.log(guessedWord);
}
function turn(){
  var letter = guessLetter().toLowerCase();
  console.log(letter);
  validateGuessedLetter(letter);
}
function validateGuessedLetter(lett){
  //test if submission is 1char & a letter;
  if (!(lett.length == 1 && lett.match(/[a-z]/i))){
    console.log("letter is not valid");
    return;
  }
  else if (guessedLetters.indexOf(lett) > -1){
    console.log("You have already guessed this letter");
    return;
  } else if (word.indexOf(lett) > -1){
    console.log(lett + " is valid.");
    editGuessedWord(lett);
    return;
  } else{
    console.log("There are no " + lett + "'s in the word.");
    lives = lives - 1;
    console.log("You have lost one life! You have " + lives + " left.");
  }
}

function editGuessedWord(lett){
  for (var x = 0; x < guessedWord.length; x++){
    if (word[x] == lett.toLowerCase()){
      guessedWord[x] = lett;
    }
  }
  displayWord();
}