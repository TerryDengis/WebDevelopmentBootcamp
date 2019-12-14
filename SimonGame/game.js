const buttonColor = ['red', 'blue', 'green', 'yellow'];
const gamePattern = [];
const userClickedPattern = [];
let gameLevel = 0;

const nextSequence = () => {
  gameLevel++;
  $('h1').text(`level ${gameLevel}`);
  const currentColor = buttonColor[Math.floor(Math.random() * 4)];
  // change to play the full pattern each time
  buttonFlash(currentColor);
  playSound(currentColor);
  gamePattern.push(currentColor);
};

const playSound = forColor => {
  var audio = new Audio(`sounds/${forColor}.mp3`);
  audio.play();
};

const buttonFlash = forColor => {
  $(`#${forColor}`)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(forColor);
};

const animatePress = forColor => {
  $(`.${forColor}`).toggleClass('pressed');
  setTimeout(function() {
    $(`.${forColor}`).toggleClass('pressed');
  }, 100);
};

$('.btn').click(function() {
  const userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if (userClickedPattern.length === gameLevel) {
    if (checkAnswers()) {
      // correct pattern go to the next level
      userClickedPattern.splice(0, gameLevel);
      setTimeout(function() {
        nextSequence();
      }, 1000);
    } else {
      // made a mistake game over
      startOver();
    }
  }
});

document.addEventListener('keydown', function() {
  $('body').removeClass('game-over');

  nextSequence();
});

const checkAnswers = () => {
  if (gamePattern.toString() === userClickedPattern.toString()) {
    return true;
  } else {
    return false;
  }
};

const startOver = () => {
  var audio = new Audio(`sounds/wrong.mp3`);
  audio.play();
  $('body').addClass('game-over');
  $('h1').text(`Game Over, Press Any Kay to Restart`);
  gamePattern.splice(0, gameLevel);
  userClickedPattern.splice(0, gameLevel);
  gameLevel = 0;
};
