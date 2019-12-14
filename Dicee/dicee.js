function randomNumber(max, ...other) {
  return Math.floor(Math.random() * max) + 1;
}
let player1 = randomNumber(6);
let player2 = randomNumber(6);
document.querySelector(".img1").setAttribute('src', 'images/dice' + player1 + '.png');
document.querySelector(".img2").setAttribute('src', 'images/dice' + player2 + '.png');
if (player1 > player2) {
  document.querySelector('h1').textContent = '🚩 Player 1 Wins!';
} else if (player1 < player2) {
  document.querySelector('h1').textContent = 'Player 2 Wins! 🚩';
} else {
  document.querySelector('h1').textContent = 'Draw!';
}

const words = ["god", "dog", "cat", "mouse"];

words.some(word => word.length === 3);