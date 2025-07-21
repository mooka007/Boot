let currentQuestion = {};
let score = 0;

const emojiDisplay = document.getElementById('emoji');
const optionsContainer = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next-btn');
const leaderboardElement = document.getElementById('leaderboard');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const saveScoreButton = document.getElementById('save-score');

async function fetchQuestion() {
  try {
    const response = await fetch('/api/question');
    currentQuestion = await response.json();
    displayQuestion();
  } catch (error) {
    console.error('Error fetching question:', error);
  }
}

function displayQuestion() {
  emojiDisplay.textContent = currentQuestion.emoji;
  optionsContainer.innerHTML = '';
  
  currentQuestion.options.forEach(option => {
    const button = document.createElement('button');
    button.className = 'option';
    button.textContent = option;
    button.onclick = () => handleGuess(option);
    optionsContainer.appendChild(button);
  });
  
  feedbackElement.textContent = '';
  nextButton.classList.add('hidden');
}

async function handleGuess(guess) {
  try {
    const response = await fetch('/api/guess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ guess })
    });
    
    const result = await response.json();
    
    if (result.isCorrect) {
      feedbackElement.textContent = 'Correct! 🎉';
      feedbackElement.style.color = 'green';
    } else {
      feedbackElement.textContent = `Wrong! The correct answer was ${result.correctAnswer}`;
      feedbackElement.style.color = 'red';
    }
    
    score = result.score;
    scoreElement.textContent = score;
    nextButton.classList.remove('hidden');
    
    document.querySelectorAll('.option').forEach(btn => {
      btn.disabled = true;
    });
    
  } catch (error) {
    console.error('Error submitting guess:', error);
  }
}

async function fetchLeaderboard() {
  try {
    const response = await fetch('/api/leaderboard');
    const leaderboard = await response.json();
    
    leaderboardElement.innerHTML = '';
    leaderboard.forEach((entry, index) => {
      const li = document.createElement('li');
      li.textContent = `${index + 1}. ${entry.name}: ${entry.score}`;
      leaderboardElement.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
  }
}

async function saveScore() {
  const playerName = document.getElementById('player-name').value.trim();
  if (!playerName) return;
  
  try {
    await fetch('/api/leaderboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: playerName })
    });
    
    gameOverElement.classList.add('hidden');
    fetchLeaderboard();
    score = 0;
    scoreElement.textContent = '0';
    fetchQuestion();
  } catch (error) {
    console.error('Error saving score:', error);
  }
}

nextButton.addEventListener('click', fetchQuestion);
saveScoreButton.addEventListener('click', saveScore);

fetchQuestion();
fetchLeaderboard();

let timeLeft = 30;
const timerElement = document.createElement('div');
timerElement.className = 'timer';
document.querySelector('.game-area').prepend(timerElement);

function updateTimer() {
  timerElement.textContent = `Time left: ${timeLeft}s`;
  
  if (timeLeft <= 0) {
    finalScoreElement.textContent = score;
    gameOverElement.classList.remove('hidden');
    clearInterval(timerInterval);
  }
  
  timeLeft--;
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();