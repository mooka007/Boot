import express from "express";

export const router = express.Router();
router.use(express.json());

let i = -1;
let score = [];

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

router.get("/", (req, res) => {
    i++;
    if (i >= triviaQuestions.length)
        i = 0;
    res.json({ question: triviaQuestions[i].question });
});

router.post("/", (req, res) => {
    const data = req.body;
    // console.log(data.answer);

    if (!data || typeof data.answer !== 'string')
        return res.status(400).json({ error: "Invalid or missing answer" });

    if (i === -1)
        return res.status(400).json({ error: "You haven't received a question yet" });

    const correctAnswer = triviaQuestions[i].answer.toLowerCase();
    const isCorrect = data.answer.trim().toLowerCase() === correctAnswer;

    const result = {
        question: triviaQuestions[i].question,
        answer: isCorrect,
    };

    score.push(result);
    return res.json(result);
});

router.get("/scores", (req, res) => {
    // console.log(score);
    res.json({ score });
});
