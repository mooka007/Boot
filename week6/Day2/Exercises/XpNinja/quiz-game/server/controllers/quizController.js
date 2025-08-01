const quizModel = require('../models/quizModel');

let currentQuestionIndex = 0;
let score = 0;

exports.getCurrentQuestion = (req, res) => {
  try {
    const questions = quizModel.getQuestions();
    if (currentQuestionIndex >= questions.length) {
      return res.json({ quizComplete: true, score, totalQuestions: questions.length });
    }
    
    const question = questions[currentQuestionIndex];
    const options = quizModel.getOptionsForQuestion(question.id);
    
    res.json({
      question: question.question,
      questionId: question.id,
      options: options.map(opt => ({ id: opt.id, text: opt.option })),
      currentQuestion: currentQuestionIndex + 1,
      totalQuestions: questions.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitAnswer = (req, res) => {
  try {
    const { questionId, answerId } = req.body;
    const isCorrect = quizModel.checkAnswer(questionId, parseInt(answerId));
    
    if (isCorrect) {
      score++;
    }
    
    currentQuestionIndex++;
    const questions = quizModel.getQuestions();
    
    if (currentQuestionIndex >= questions.length) {
      return res.json({ 
        quizComplete: true, 
        score, 
        totalQuestions: questions.length,
        finalScore: `${score}/${questions.length}`
      });
    }
    
    res.json({ 
      isCorrect,
      correctAnswer: quizModel.getQuestionById(questionId).correctAnswer,
      score,
      nextQuestion: `/api/quiz/question`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetQuiz = (req, res) => {
  currentQuestionIndex = 0;
  score = 0;
  res.json({ message: "Quiz reset successfully" });
};
