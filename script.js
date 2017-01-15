var words = ["Modigliani", "Charlemagne", "Champagne", "Picasso", "Kowabunga",
              "Kombucha", "Heartache", "Christmas", "Channukah", "Ornamental",
              "Cappuccino", "Electricity", "Vegetarians", "Oklahoma", "Selvedge",
              "Heteronormativity", "Intersectionality", "Penultimate", "Perfunctory",
              "Vancouver", "Renumerative", "Magnanimous", "California", "Anecdotal"]
var word = "";
var guessedWord = [];
//var guessedLetter = "";
var guessedLetters = [];
var lives = 6;
var userGuess = "";
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m"
                ,"n", "o","p","q","r","s","t","u","v","w","x","y","z"];

init();

function init(){
  selectWord();
  createGuessedWord();
  displayWord(guessedWord);
  displayLetters();
  while (!validateWord() && lives > 0){
    turn();
    lives = 0;
  }
  if (validateWord() == true){
    console.log("Congratulations! You won with " + lives + " lives left!");
  }
  else if (lives == 0){
    console.log("Unfortunately you lost! Better luck next time")
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

  var guessedYet = false;
  if (guessedYet == false){
    console.log("awaiting click");
    $(document).ready(function(){
      var guessedLetter = "";
      $('.square').on('click', function(){
        //$(this).addClass("guessed");
        console.log("click");
        guessedLetter = $(this).innerHtml;
        guessedYet = true;
        console.log(guessedLetter);
        return guessedLetter;
      });
  });
}

}

function displayWord(word){
  $("#word").html("<h1>" + guessedWord.join("") + "</h1>");
  console.log(guessedWord);
}

function displayLetters(){
  for (var x = 0; x < alphabet.length; x++){
    $("#letters").append("<div class = 'square'><a href = '#'><h2>" + alphabet[x] + "</h2></a></div>");
  }
}

function turn(){
  var letter = guessLetter().toLowerCase();
  console.log(letter);
  validateGuessedLetter(letter);
}
function validateGuessedLetter(lett){
  //test if submission is 1char & a letter;
  if (!(lett.length == 1 && lett.match(/[a-z]/i))){
    $("#description").html("<h1>letter is not valid</h1>");
    console.log("letter is not valid");
    return;
  }
  else if (guessedLetters.indexOf(lett) > -1){
    $("#description").html("<h1>You have already guessed this letter</h1>");
    console.log("You have already guessed this letter");
    return;
  } else if (word.indexOf(lett) > -1){
    $("#description").html("<h1>" + lett + " is valid</h1>");
    console.log(lett + " is valid.");
    editGuessedWord(lett);
    return;
  } else{
    console.log("There are no " + lett + "'s in the word.");
    $("#description").html("<h1>There are no " + lett + "'s in the word.</h1>");
    lives = lives - 1;
    $("#lives").html("<h1>" + lives + "</h1>");
    console.log("You have lost one life! You have " + lives + " lives left.");
    $("#description").html("<h1>You have lost one life! You have " + lives + " left.</h1>");

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
