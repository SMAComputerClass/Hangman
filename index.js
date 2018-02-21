// Put your JavaScript in this file.
'use strict';   // Enable "strict mode".  Note: This *must* be the first statement in the script.
                // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

// ------------- Start Script Section ----------------------------

  var myPuzzles = ["TURKEY TURKEY TURKEY","BESERK SORCERERS", "HIDDEN BALL TRICK","HELLS BELLS","ESA TIKKANEN ARCHIVE","NOT TOP TEN","MANNY BEING MANNY","DEFLATED NOMAR","DIRTY DIAPER","THE PIANO MAN","FLORIDA MARLINS","ZYGOTE","WITS AND WAGERS","IS THAT MIKE CARP", "GET UP LARS", "CHERRY GARCIA", "WELLES PARK", "IMPERIAL MARCH", "CALVIN AND HOBBES", "SWEET CAROLINE", "BIG PAPI", "GREEDO SHOT FIRST", "RON PAUL REVOLUTION", "DID I DO THAT", "STERLING AND DAISY","FAMILY FEUD","LALLY FIELD", "HIGH PANTS CLUB", "FOREIGNERS JOURNEY", "TREVOR PLOUFFE", "JAR JAR BINX", "YODA SLEPT HERE", "BENEDICT CUMBERBATCH", "FUDGE", "HINGLE MCGRINGLEBERRY", "BEEF STEW", "THREE WALTERS AND GUIDO", "SCOTT STERLING", "TACO BAR TUESDAY", "WERE SKELETONS", "GEORGE CLONEY","TICKET TO RIDE","SANDY LEON" ];

  // var myPuzzles = ["TURKEY TURKEY TURKEY","BESERK SORCERERS", "TREVOR PLOUFFE", "JAR JAR BINX", "YODA CRAPPED HERE", "BENEDICT CUMBERBATCH", "FUDGE", "HINGLE MCGRINGLEBERRY", "BEEF STEW", "THREE WALTERS AND GUIDO", "SCOTT STERLING", "TACO BAR TUESDAY", "WERE SKELETONS", "GEORGE CLONEY","TICKET TO RIDE","SANDY LEON","AIRPLANES DUMPING POO" ];

  var myPuzzle; // individual puzzle

  var maxGames = 3;
  var graphicName = "hangman";
  var alphabet ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var PUZZLE_SQUARES = 24;

  var correctGuesses = 0;
  var lettersInAnswer = 0;
  var misses = 0;
  var maxMisses =  10;  // game ends when you miss the max

  var gameCount = 0;
  var winCount = 0;
  var lossCount = 0;

  // guessed letters
  var myLetterBoard = document.getElementById("letterBoard");

  // puzzle
  var puzzleBoardSquares = document.querySelectorAll('.PuzzleBoardSquare');

  var continueButton = document.getElementById("continueButton");

  setupBoard();  // set the puzzle section to the correct number of spaces

// --- Click event on a letter square -----------------------

  continueButton.addEventListener('click', function(e)
  {
    if (gameCount == 0)
    {
      // reset win-loss counts
      document.getElementById("playerWinCount").innerHTML = "0";
      document.getElementById("playerLossCount").innerHTML = "0";
      winCount = 0;
      lossCount = 0;
    }
    resetBoard();  // set the puzzle section to the correct number of spaces
    setupBoard();
  });

// ----  Listener for guessed letter board -------------

  myLetterBoard.addEventListener('click', function(e)
  {
    var i; // loop var
    // return immediately if user clicks on blank square
    if (e.target.innerHTML == "")
      return;

    var guessedLetter = e.target.innerHTML;

    e.target.innerHTML = "";

    var foundAMatch = false;

    console.log("Guessed Letter is " + guessedLetter);

    //  compare guessed letter to each letter in the puzzle arrayLen
    for (i = 0; i< myPuzzle.length; i++)
    {
      if (myPuzzle[i] == guessedLetter)
      {
        // correct guess, flip letter
        console.log(myPuzzle[i] + " found.");
        puzzleBoardSquares[i].innerHTML = guessedLetter;
        foundAMatch = true;
        correctGuesses++;
      }  // end if guessed letter was a match
    }  // end for loop iterating through puzzle

    if (foundAMatch)  // Check to see if game is over
    {
      if ( correctGuesses == lettersInAnswer)
      {
        //alert ("You Won! " + myPuzzle);
        document.getElementById("resultsText").innerHTML = "You Won this game!  The puzzle is " + myPuzzle;
        document.getElementById("resultsText").style.visibility = "visible";
        document.getElementById("continueButton").style.visibility = "visible";

        winCount++;
        gameCount++;

        var winCountLabel = Number(document.getElementById("playerWinCount").innerHTML);
        document.getElementById("playerWinCount").innerHTML = ++winCountLabel;

         // check if match ends
         checkForEndGame();

      } // check if correctGuesses = length (Win)
      return;
    } // found a match
    else
    {  // guess was wrong, show next graphic

      var nextFile = graphicName + ++misses + ".jpg";

      document.getElementById("guessesLeft").innerHTML = maxMisses - misses;

      var graphic = document.getElementById("HangmanGraphic");
      graphic.src = nextFile;

      // check for loss
      if (misses == maxMisses)
        {
          //alert ("You lost!  The right answer was " + myPuzzle);

          document.getElementById("resultsText").innerHTML = "You Lost this game!  The puzzle is " + myPuzzle;
          document.getElementById("resultsText").style.visibility = "visible";
          document.getElementById("continueButton").style.visibility = "visible";

          lossCount++;
          gameCount++;

          var lossCountLabel = Number(document.getElementById("playerLossCount").innerHTML);
          document.getElementById("playerLossCount").innerHTML = ++lossCountLabel;

          checkForEndGame();
        }

    } // else guess was wrong


  } // end

  );

//---------------------------------

function setupBoard()
{
  var i; // loop var
  correctGuesses = 0;
  var guessPallette = document.querySelectorAll('.letterSquare');

  document.getElementById("guessesLeft").innerHTML = maxMisses;

  for (i=0; i<alphabet.length; i++)
  {
    guessPallette[i].innerHTML = alphabet[i];
  }

  // choose random puzzleBoardSquares
  var maxPuzzles = myPuzzles.length;

  var newPuzzleNum = Math.floor((Math.random() * maxPuzzles));

  myPuzzle = myPuzzles[newPuzzleNum];

  // reset all backgrounds to original
  for (i=0; i<puzzleBoardSquares.length;i++)
  {
    puzzleBoardSquares[i].style.backgroundColor = "#ded29e";
  }

  var words = 0;
  var wordArray = new Array;
  var currWord = "";

  // parse puzzle here, extract the words

  for (i=0; i< myPuzzle.length; i++)
  {
    if (myPuzzle[i] != " ")
    {
      lettersInAnswer++;
      currWord += myPuzzle[i];
      puzzleBoardSquares[i].style.boxSizing = "border-box";
      puzzleBoardSquares[i].style.borderStyle = "solid";
      puzzleBoardSquares[i].style.backgroundColor = "gray";
    }
    else
    {
      wordArray.push(currWord);
      words++;
      currWord = "";
    }
  }

  wordArray.push(currWord);
  words++;

  document.getElementById("wordCount").innerHTML = words;

} // end function

//---------------

function resetBoard()
{
  correctGuesses = 0;
  lettersInAnswer = 0;
  misses = 0;
  var i;

  var graphic = document.getElementById("HangmanGraphic");
  graphic.src = "hangman0.jpg";

  for (i=0; i< puzzleBoardSquares.length; i++)
  {
    //puzzleBoardSquares[i].style.box-sizing = border-box;
    puzzleBoardSquares[i].style.borderStyle = "none";
    puzzleBoardSquares[i].innerHTML = "";
  }

  document.getElementById("resultsText").style.visibility = "hidden";
  document.getElementById("continueButton").style.visibility = "hidden";
  document.getElementById("matchResultsText").style.visibility = "hidden";

  return;
}

//---------------

function checkForEndGame()
{
  if (gameCount == maxGames)
  {
    if (winCount > lossCount)
    {
      document.getElementById("matchResultsText").innerHTML = "You won the Match!  " + winCount + " to " + lossCount + ".";
      gameCount = 0;
      document.getElementById("matchResultsText").style.visibility = "visible";
      return;
    }

    if (lossCount > winCount)
    {
        document.getElementById("matchResultsText").innerHTML = "You loss the Match!  " + lossCount + " to " + winCount + ".";
        gameCount = 0;
        document.getElementById("matchResultsText").style.visibility = "visible";
        return;
    }
    else
    {
        document.getElementById("matchResultsText").innerHTML = "You Tied the Match!  " + lossCount + " to " + winCount + ".";
        gameCount = 0;
        document.getElementById("matchResultsText").style.visibility = "visible";
        return
    }

  } // end outer if

  return;

} // checkForEndGame
