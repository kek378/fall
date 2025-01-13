function startGame() {
    const gameArea = document.getElementById('game-area');
    const player = document.getElementById('player');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const resultScreen = document.getElementById('result-screen');
    const finalScoreElement = document.getElementById('final-score');
    const restartButton = document.getElementById('restart-button');

    let score = 0;
    let playerPosition = 250;
    let fallingObjects = [];
    let gameInterval;
    let timeLeft = 60;
    let timerInterval;
    let gameActive = true;

    const objectSize = 20;
    const playerSpeed = 15;
    const objectSpeed = 3;
    let gameSpeed = 15;

   function updateTimerDisplay() {
        timerElement.textContent = `Время: ${timeLeft}`;
    }


    function createFallingObject() {
        const object = document.createElement('div');
        object.classList.add('falling-object');
        object.style.width = `${objectSize}px`;
        object.style.height = `${objectSize}px`;
        object.style.left = `${Math.random() * (gameArea.offsetWidth - objectSize)}px`;
        object.style.top = '0px';
        gameArea.appendChild(object);
        fallingObjects.push(object);
    }

    function updateFallingObjects() {
        if(!gameActive) return;
        for (let i = 0; i < fallingObjects.length; i++) {
            const object = fallingObjects[i];
            let top = parseInt(object.style.top) + objectSpeed;
            object.style.top = `${top}px`;

            if (top + objectSize >= player.offsetTop &&
              parseInt(object.style.left) + objectSize >= player.offsetLeft &&
              parseInt(object.style.left) <= player.offsetLeft + player.offsetWidth ) {
                score++;
                scoreElement.textContent = `Счет: ${score}`;
                removeFallingObject(i);
            }

           else if (top > gameArea.offsetHeight) {
              removeFallingObject(i);
           }
        }
    }
    function removeFallingObject(index) {
        gameArea.removeChild(fallingObjects[index]);
        fallingObjects.splice(index, 1);
    }

    function movePlayerLeft() {
        playerPosition -= playerSpeed;
        if(playerPosition < 0) {
          playerPosition = 0;
        }
        player.style.left = `${playerPosition}px`;
    }

    function movePlayerRight() {
        playerPosition += playerSpeed;
         if(playerPosition + player.offsetWidth > gameArea.offsetWidth) {
          playerPosition = gameArea.offsetWidth - player.offsetWidth;
        }
        player.style.left = `${playerPosition}px`;
    }
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            movePlayerLeft();
        } else if (event.key === 'ArrowRight') {
           movePlayerRight();
        }
    });

    function gameLoop() {
        updateFallingObjects();
         if (Math.random() < 0.05) {
           createFallingObject();
         }
    }

    function updateTimer() {
      if(!gameActive) return;
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            gameOver();
        }
    }
  function gameOver() {
      gameActive = false;
      clearInterval(gameInterval);
      clearInterval(timerInterval);

      finalScoreElement.textContent = `Поймано объектов: ${score}`;
      resultScreen.style.display = 'flex';
  }

  function restartGame() {
     
      score = 0;
      playerPosition = 250;
      fallingObjects = [];
      timeLeft = 60;
      gameActive = true;

      scoreElement.textContent = 'Счет: 0';
      player.style.left = `${playerPosition}px`;
      resultScreen.style.display = 'none';
   
      while (gameArea.firstChild) {
          gameArea.removeChild(gameArea.firstChild);
        }


      updateTimerDisplay();
      gameInterval = setInterval(gameLoop, gameSpeed);
      timerInterval = setInterval(updateTimer, 1000);
      gameArea.appendChild(player)
   }

    updateTimerDisplay();
    gameInterval = setInterval(gameLoop, gameSpeed);
    timerInterval = setInterval(updateTimer, 1000);
    restartButton.addEventListener('click', restartGame);
}

document.addEventListener('DOMContentLoaded', startGame);