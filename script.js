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
var letter = "";
var userGuess = "";
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m"
                ,"n", "o","p","q","r","s","t","u","v","w","x","y","z"];

init();

function init(){
  selectWord();
  createGuessedWord();
  displayWord(guessedWord);
  displayLetters();
  guessLetter()
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
function gameOver(){
  if (validateWord() == true){
    $("#description").html("<p>Congratulations! You won with " + lives + " lives left!</p>");
  }
  else if (lives == 0){
    $("#description").html("<p>Unfortunately you lost! Better luck next time</p>");
  }
}
function guessLetter(){
    $(document).ready(function(){
      var guessedLetter = "";
      var unclicked = true;
      if (unclicked == true){
        $('.square').on('click', function(){
          guessedLetter = $(this).text();
          console.log(guessedLetter + " fn guessLetter");
          validateGuessedLetter(guessedLetter);
          gameOver();
        });
    }
  });

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

/*function turn(){
  console.log("is turn");
    guessLetter();
    console.log(letter + " fn turn")
    console.log(lives);
    if (letter.length == 1){
      validateGuessedLetter(guessLetter());
    }
}*/
function validateGuessedLetter(lett){
  //test if submission is 1char & a letter;
  if (guessedLetters.indexOf(lett) > -1){
    $("#description").html("<p>You have already guessed this letter</p>");
    console.log("You have already guessed this letter");
    return;
  } else if (word.indexOf(lett) > -1){
    $("#description").html("<p>" + lett + " is valid</p>");
    console.log(lett + " is valid.");
    editGuessedWord(lett);
    return;
  } else {
    console.log("There are no " + lett + "'s in the word.");
    $("#description").html("<p>There are no " + lett + "'s in the word.</p>");
    lives = lives - 1;
    $("#lives").html("<h1>" + lives + "</h1>");
    console.log("You have lost one life! You have " + lives + " lives left.");
    $("#description").html("<p>You have lost one life! You have " + lives + " left.</p>");

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
