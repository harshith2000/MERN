let gamePattern = [];

let userClickedPattern = [];

let buttonColors = ["red", "blue", "green" , "yellow"];

let level = 0;

let started = false;

$(document).keypress(function() {
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence(){
  level++;
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  let randomNumber =  Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $(`#${randomChosenColor}`).fadeIn(200).fadeOut(200).fadeIn(200);
  makesound(randomChosenColor);
}

$(".btn").click(function(){
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  makesound(userChosenColor);
  makeanimation(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(index){
  if(userClickedPattern[index] === gamePattern[index]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    $("#level-title").text("Game over! Press any key to restart");
    $(document).addClass("game-over");
    setTimeout(()=>{
      $(document).removeClass("game-over");
    },300);
    startOver();
  }
}

function startOver(){
  started = false;
  level = 0;
  gamePattern = [];
}
function makesound(color){
  let sound = new Audio(`sounds/${color}.mp3`);
  sound.play();
}

function makeanimation(color){
  $(`.${color}`).addClass("pressed");
  setTimeout(() => {
    $(`.${color}`).removeClass("pressed");
  }, 200);
}