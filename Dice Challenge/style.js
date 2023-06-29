let randomnumber = Math.floor(Math.random()*6) + 1;

let imagenumber = `dice${randomnumber}.png`;

let imagesource =  "images/" + imagenumber;

document.querySelector('.img1').setAttribute("src", imagesource);


let randomnumber2 = Math.floor(Math.random()*6) + 1;

let imagenumber2 = `dice${randomnumber2}.png`;

let imagesource2 =  "images/" + imagenumber2;

document.querySelector('.img2').setAttribute("src", imagesource2);

if(randomnumber > randomnumber2){
  document.querySelector('.declaration').innerHTML = "Player 1 wins!";
}
else if(randomnumber2 > randomnumber){
  document.querySelector('.declaration').innerHTML = "Player 2 wins!";
}
else{
  document.querySelector('.declaration').innerHTML = "Draw!";
}
