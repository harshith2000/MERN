$("button").on("click", function() {
    makesound(this.innerHTML);
    makeanimation(this.innerHTML);
});

$(document).keypress(function(event){
  makesound(event.key);
  makeanimation(event.key);
});


function makesound (key){
  switch(key){
    case "w":
      let one = new Audio("sounds/tom-1.mp3");
      one.play();
      break;
    case "a":
      let two = new Audio("sounds/tom-2.mp3");
      two.play();
      break;
    case "s":
      let three = new Audio("sounds/tom-3.mp3");
      three.play();
      break;
    case "d":
      let four = new Audio("sounds/tom-4.mp3");
      four.play();
      break;
    case "j":
      let five = new Audio("sounds/crash.mp3");
      five.play();
      break;
    case "k":
      let six = new Audio("sounds/kick-bass.mp3");
      six.play();
      break;
    case "l":
      let seven = new Audio("sounds/snare.mp3");
      seven.play();
      break;
    default:
      $(".invalid_key").html(`Press a valid key!`);
      setTimeout(function() {
        $(".invalid_key").html("");
      },200);
  }
}

function makeanimation(key){
  let button = document.querySelector("." + key);

  button.classList.add("pressed");

  setTimeout(() => {
    button.classList.remove("pressed");
  },200);
}