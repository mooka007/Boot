const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// GET current question
router.get('/question', quizController.getCurrentQuestion);

// POST submit answer
router.post('/submit', quizController.submitAnswer);

// POST reset quiz
router.post('/reset', quizController.resetQuiz);

module.exports = router;
