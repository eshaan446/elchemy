document.addEventListener('DOMContentLoaded', function() {
  const hoursInput=document.getElementById('hours');
  const minutesInput = document.getElementById('minutes');
  const secondsInput = document.getElementById('seconds');
  const startButton = document.getElementById('startButton');
  const pauseButton = document.getElementById('pauseButton');
  const resetButton = document.getElementById('resetButton');
  const timerDisplay = document.getElementById('timerDisplay');

  let intervalId;
  let totalTimeInSeconds = 0;
  let remainingTime = 0;
  let isPaused = false;

  startButton.addEventListener('click', function() {
    let hours=parseInt(hoursInput.value) || 0;
    let minutes = parseInt(minutesInput.value) || 0;
    let seconds = parseInt(secondsInput.value) || 0;

    

    if (!isPaused) {
      minutes+=hours*60;
      totalTimeInSeconds = minutes * 60 + seconds;
      remainingTime = totalTimeInSeconds;
    }

    startTimer();
  });

  function startTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    if (remainingTime <= 0) {
      clearInterval(intervalId);
      timerDisplay.textContent = '00:00';
      isPaused = false;
      return;
    }

    const displayMinutes = Math.floor(remainingTime / 60);
    const displaySeconds = remainingTime % 60;

    const formattedMinutes = displayMinutes.toString().padStart(2, '0');
    const formattedSeconds = displaySeconds.toString().padStart(2, '0');

    timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;

    remainingTime--;
  }

  pauseButton.addEventListener('click', function() {
    clearInterval(intervalId);
    isPaused = true;
  });

  resetButton.addEventListener('click', function() {
    clearInterval(intervalId);
    timerDisplay.textContent = '00:00';
    minutesInput.value = '';
    secondsInput.value = '';
    remainingTime = 0;
    totalTimeInSeconds = 0;
    isPaused = false;
  });
});
