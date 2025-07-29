const express = require("express");
const router = express.Router();

const triviaQuestions = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer: "Mars",
  },
  {
    question: "What is the largest mammal in the world?",
    answer: "Blue whale",
  },
];

router.use((req, res, next) => {
  if (!req.session.quiz) {
    req.session.quiz = {
      currentQuestion: 0,
      score: 0,
      completed: false,
    };
  }
  next();
});

router.get("/", (req, res) => {
  if (req.session.quiz.completed) {
    return res.redirect("/quiz/score");
  }

  const currentQ = triviaQuestions[req.session.quiz.currentQuestion];
  res.render("question", {
    question: currentQ.question,
    questionNumber: req.session.quiz.currentQuestion + 1,
    totalQuestions: triviaQuestions.length,
  });
});

router.post("/", (req, res) => {
  if (req.session.quiz.completed) {
    return res.redirect("/quiz/score");
  }

  const currentQ = triviaQuestions[req.session.quiz.currentQuestion];
  const userAnswer = req.body.answer;
  const isCorrect =
    userAnswer.trim().toLowerCase() === currentQ.answer.toLowerCase();

  if (isCorrect) {
    req.session.quiz.score++;
  }

  res.render("feedback", {
    isCorrect,
    correctAnswer: currentQ.answer,
    userAnswer,
    score: req.session.quiz.score,
    questionNumber: req.session.quiz.currentQuestion + 1,
    totalQuestions: triviaQuestions.length,
  });
});

router.get("/next", (req, res) => {
  req.session.quiz.currentQuestion++;

  if (req.session.quiz.currentQuestion >= triviaQuestions.length) {
    req.session.quiz.completed = true;
    return res.redirect("/quiz/score");
  }

  res.redirect("/quiz");
});

router.get("/score", (req, res) => {
  if (!req.session.quiz.completed) {
    return res.redirect("/quiz");
  }

  res.render("score", {
    score: req.session.quiz.score,
    totalQuestions: triviaQuestions.length,
    percentage: Math.round(
      (req.session.quiz.score / triviaQuestions.length) * 100
    ),
  });
});

router.get("/reset", (req, res) => {
  req.session.quiz = {
    currentQuestion: 0,
    score: 0,
    completed: false,
  };
  res.redirect("/quiz");
});

module.exports = router;
