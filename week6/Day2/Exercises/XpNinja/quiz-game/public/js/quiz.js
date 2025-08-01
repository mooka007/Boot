document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  const questionContainer = document.getElementById('question-container');
  const resultContainer = document.getElementById('result-container');
  const finalScoreContainer = document.getElementById('final-score-container');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const submitBtn = document.getElementById('submit-btn');
  const nextBtn = document.getElementById('next-btn');
  const restartBtn = document.getElementById('restart-btn');
  const resultMessage = document.getElementById('result-message');
  const scoreDisplay = document.getElementById('score-display');
  const finalScore = document.getElementById('final-score');
  const questionProgress = document.getElementById('question-progress');

  let selectedOption = null;
  let currentScore = 0;

  startBtn.addEventListener('click', startQuiz);
  submitBtn.addEventListener('click', submitAnswer);
  nextBtn.addEventListener('click', nextQuestion);
  restartBtn.addEventListener('click', restartQuiz);

  function startQuiz() {
    startBtn.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    fetchQuestion();
  }

  function fetchQuestion() {
    fetch('/api/quiz/question')
      .then(response => response.json())
      .then(data => {
        if (data.quizComplete) {
          showFinalScore(data.score, data.totalQuestions);
          return;
        }

        questionText.textContent = data.question;
        questionProgress.textContent = `Question ${data.currentQuestion} of ${data.totalQuestions}`;
        optionsContainer.innerHTML = '';

        data.options.forEach(option => {
          const optionBtn = document.createElement('button');
          optionBtn.classList.add('option-btn');
          optionBtn.textContent = option.text;
          optionBtn.dataset.id = option.id;
          optionBtn.addEventListener('click', () => selectOption(optionBtn));
          optionsContainer.appendChild(optionBtn);
        });

        selectedOption = null;
      })
      .catch(error => console.error('Error:', error));
  }

  function selectOption(optionBtn) {
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.classList.remove('selected');
    });
    optionBtn.classList.add('selected');
    selectedOption = optionBtn.dataset.id;
  }

  function submitAnswer() {
    if (!selectedOption) {
      alert('Please select an option');
      return;
    }

    const questionId = document.querySelector('.option-btn')?.parentElement?.previousElementSibling?.dataset?.id;
    
    fetch('/api/quiz/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questionId: questionId,
        answerId: selectedOption
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.quizComplete) {
        showFinalScore(data.score, data.totalQuestions);
        return;
      }

      questionContainer.classList.add('hidden');
      resultContainer.classList.remove('hidden');

      if (data.isCorrect) {
        resultMessage.textContent = 'Correct!';
        resultMessage.className = 'correct';
        currentScore = data.score;
      } else {
        resultMessage.textContent = 'Incorrect!';
        resultMessage.className = 'incorrect';
      }

      scoreDisplay.textContent = `Score: ${data.score}`;
    })
    .catch(error => console.error('Error:', error));
  }

  function nextQuestion() {
    resultContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    fetchQuestion();
  }

  function showFinalScore(score, total) {
    questionContainer.classList.add('hidden');
    resultContainer.classList.add('hidden');
    finalScoreContainer.classList.remove('hidden');
    finalScore.textContent = `Your score: ${score} out of ${total}`;
  }

  function restartQuiz() {
    fetch('/api/quiz/reset', {
      method: 'POST'
    })
    .then(() => {
      finalScoreContainer.classList.add('hidden');
      startBtn.classList.remove('hidden');
      currentScore = 0;
    })
    .catch(error => console.error('Error:', error));
  }
});
