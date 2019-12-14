//Drum sounds contsructor
function DrumSound(soundFile) {
  this.soundFile = soundFile;
  this.play = function() {
    var sound = new Audio(this.soundFile);
    sound.play();
  }
}

function buttonAnimation(key) {
  const buttonPressed = document.querySelector('.' + key);
  buttonPressed.classList.add("pressed");
  setTimeout(() => {
    buttonPressed.classList.remove("pressed");
  }, 200);
}

// playing the sound
function makeSound(key) {
  switch (key) {
    case 'w':
      var sound = new DrumSound("sounds/tom-1.mp3");
      sound.play();
      break;
    case 'a':
      var sound = new DrumSound("sounds/tom-2.mp3");
      sound.play();
      break;
    case 's':
      var sound = new DrumSound("sounds/tom-3.mp3");
      sound.play();
      break;
    case 'd':
      var sound = new DrumSound("sounds/tom-4.mp3");
      sound.play();
      break;
    case 'j':
      var sound = new DrumSound("sounds/snare.mp3");
      sound.play();
      break;
    case 'k':
      var sound = new DrumSound("sounds/crash.mp3");
      sound.play();
      break;
    case 'l':
      var sound = new DrumSound("sounds/kick-bass.mp3");
      sound.play();
      break;
    default:
      break;
  }
}

// setting up button event listeners
for (let button of document.querySelectorAll(".drum")) {
  button.addEventListener('click', () => {
    makeSound(button.textContent);
    buttonAnimation(button.textContent);
  })
}

// setting up ebent listener for key pressed
document.addEventListener('keydown', (event) => {
  makeSound(event.key);
  buttonAnimation(event.key);
})