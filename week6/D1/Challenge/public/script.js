document.addEventListener("DOMContentLoaded", function () {
  // Current question page
  if (document.getElementById("question-text")) {
    loadQuestion();

    document
      .getElementById("quiz-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        submitAnswer();
      });
  }

  // Feedback page
  if (document.getElementById("feedback-card")) {
    displayFeedback();

    document.getElementById("next-btn").addEventListener("click", function () {
      nextQuestion();
    });
  }

  // Score page
  if (document.getElementById("score-card")) {
    displayScore();
  }
});

async function loadQuestion() {
  try {
    const response = await fetch("/quiz/current");
    const data = await response.json();

    document.getElementById("question-text").textContent = data.question;
    document.getElementById("question-number").textContent =
      data.questionNumber;
    document.getElementById("total-questions").textContent =
      data.totalQuestions;

    // Update progress bar
    const progressPercent = (data.questionNumber / data.totalQuestions) * 100;
    document.getElementById("progress-bar").style.width = `${progressPercent}%`;
  } catch (error) {
    console.error("Error loading question:", error);
  }
}

async function submitAnswer() {
  const answerInput = document.getElementById("answer-input");
  const answer = answerInput.value.trim();

  if (!answer) return;

  try {
    const response = await fetch("/quiz/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer }),
    });

    const result = await response.json();

    // Store feedback data in sessionStorage
    sessionStorage.setItem("quizFeedback", JSON.stringify(result));

    // Redirect to feedback page
    window.location.href = "/public/feedback.html";
  } catch (error) {
    console.error("Error submitting answer:", error);
  }
}

function displayFeedback() {
  const feedback = JSON.parse(sessionStorage.getItem("quizFeedback"));

  if (!feedback) {
    window.location.href = "/quiz";
    return;
  }

  const feedbackCard = document.getElementById("feedback-card");

  document.getElementById("feedback-title").textContent = feedback.isCorrect
    ? "✅ Correct!"
    : "❌ Incorrect";
  document.getElementById("user-answer").textContent = feedback.userAnswer;
  document.getElementById("correct-answer").textContent =
    feedback.correctAnswer;
  document.getElementById(
    "current-score"
  ).textContent = `${feedback.score}/${feedback.totalQuestions}`;

  feedbackCard.classList.add(feedback.isCorrect ? "correct" : "incorrect");
}

async function nextQuestion() {
  try {
    const response = await fetch("/quiz/next", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.completed) {
      window.location.href = "/quiz/score";
    } else {
      window.location.href = "/public/index.html";
    }
  } catch (error) {
    console.error("Error moving to next question:", error);
  }
}

async function displayScore() {
  try {
    const response = await fetch("/quiz/score-data");
    const data = await response.json();

    document.getElementById(
      "final-score"
    ).textContent = `${data.score}/${data.totalQuestions}`;
    document.getElementById("percentage").textContent = `${data.percentage}%`;

    const message = document.getElementById("result-message");
    if (data.percentage >= 70) {
      message.textContent = "🎉 Excellent job!";
    } else if (data.percentage >= 50) {
      message.textContent = "👍 Good effort!";
    } else {
      message.textContent = "💪 Keep practicing!";
    }
  } catch (error) {
    console.error("Error loading score:", error);
  }
}
