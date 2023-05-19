// this records the pattern the game takes, and this is the pattern the user should take.
// e.g yellow, red, yellow
var gamePattern = [];
// this records the pattern the user takes, and when it clicks a button a pattern is added,
// and is then compared to the game pattern list
//e.g yellow, red, yellow. This would give the game another pattern to add because they both match, if not it is game over
var userClickedPattern = [];
// these are the colors of the buttons 4 in number
var buttonColours = ["red", "blue", "green", "yellow"];
// the level always starts from 0
var level = 0;
// this is a variable that shows if the game has started the game hasn't started so it is false
var started = false;

// when user presses a key on his/her keyboard the game starts
$(document).keypress(function(){
  // since the game just started, started would be false making the if statement true.
  if(!started){
  // //this displays the level title where it is meant to be in the html. And the level title is 0
  // $("#level-title").text("Level " + level);
  // this is function that performs something
  nextSequence();
  // since the game has started from now on it sets started to true.
  started = true;
}

});

// when user clicks on a btn
$(".btn").click(function(){
    /* this get the id of the button clicked and stored it in a variable 
        the id is named after the color of the button.*/
    var userChosenColour = $(this).attr("id");
    // this pushes the color of the button selected the the user pattern
    userClickedPattern.push(userChosenColour);
    // this plays the sound assigned to the color of the userchosenbutton
    playSound(userChosenColour);
    // this animates the color of the button clicked
    animatePress(userChosenColour);
    // this is a function that does some thing
    checkAnswer((userClickedPattern.length)-1);
});





// this is a function that performs an action when the user loses a game
function startOver(){
  // this resets the level to 0
  level = 0;
  // this empties the gamepattern list
  gamePattern = [];
  // this sets started to 0
  started = false;
}




function checkAnswer(currentLevel){
 /* the if statement checks if the last clicked button color is the same has that in the game pattern. The current level checks
 if they are in the same level*/
 if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
  // this checks if the clicked pattern is the same length has the game pattern 
   if (userClickedPattern.length === gamePattern.length){
     // this sets a timeout for effects to display nextsequence
     setTimeout(function () {
       nextSequence();
     }, 1000);}
   }else {

   //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
   playSound("wrong");

   //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
   $("body").addClass("game-over");
   setTimeout(function () {
     $("body").removeClass("game-over");
   }, 200);

   //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
   $("#level-title").text("Game Over, Press Any Key to Restart");
   startOver();
 }

  }


// this shows when the user passes a level
function nextSequence(){
  //
  userClickedPattern = [];
  level++

  $("#level-title").text("Level " + level )
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

      $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
  }
