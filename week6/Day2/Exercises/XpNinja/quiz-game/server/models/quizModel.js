const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    correctAnswer: 3
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    correctAnswer: 1
  }
];

const options = [
  { id: 1, option: "4" },
  { id: 2, option: "Paris" },
  { id: 3, option: "Mars" },
  { id: 4, option: "London" },
  { id: 5, option: "Venus" },
  { id: 6, option: "5" }
];

const questionsOptions = [
  { question_id: 1, option_id: 2 },  // Paris
  { question_id: 1, option_id: 4 },  // London
  { question_id: 2, option_id: 3 },  // Mars
  { question_id: 2, option_id: 5 },  // Venus
  { question_id: 3, option_id: 1 },  // 4
  { question_id: 3, option_id: 6 }   // 5
];

module.exports = {
  getQuestions: () => questions,
  getQuestionById: (id) => questions.find(q => q.id === id),
  getOptionsForQuestion: (questionId) => {
    const optionIds = questionsOptions
      .filter(qo => qo.question_id === questionId)
      .map(qo => qo.option_id);
    
    return options.filter(opt => optionIds.includes(opt.id));
  },
  checkAnswer: (questionId, answerId) => {
    const question = questions.find(q => q.id === questionId);
    return question && question.correctAnswer === answerId;
  }
};
