const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const emojis = [
  { emoji: '😀', name: 'Grinning Face' },
  { emoji: '🐶', name: 'Dog Face' },
  { emoji: '🌮', name: 'Taco' },
  { emoji: '🚀', name: 'Rocket' },
  { emoji: '🎸', name: 'Guitar' },
  { emoji: '🍕', name: 'Pizza' },
  { emoji: '🦄', name: 'Unicorn' },
  { emoji: '🎮', name: 'Video Game' },
  { emoji: '🍦', name: 'Ice Cream' },
  { emoji: '🏆', name: 'Trophy' }
];

let currentQuestion = {};
let score = 0;
let leaderboard = [];

app.use(express.static('public'));
app.use(express.json());

function generateQuestion() {
  const correctEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  
  const incorrectOptions = emojis
    .filter(e => e.name !== correctEmoji.name)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map(e => e.name);
  
  const options = [correctEmoji.name, ...incorrectOptions].sort(() => 0.5 - Math.random());
  
  currentQuestion = {
    emoji: correctEmoji.emoji,
    correctAnswer: correctEmoji.name,
    options
  };
  
  return currentQuestion;
}

app.get('/api/question', (req, res) => {
  res.json(generateQuestion());
});

app.post('/api/guess', (req, res) => {
  const { guess } = req.body;
  const isCorrect = guess === currentQuestion.correctAnswer;
  
  if (isCorrect) {
    score++;
  }
  
  res.json({
    isCorrect,
    correctAnswer: currentQuestion.correctAnswer,
    score
  });
});

app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard.sort((a, b) => b.score - a.score).slice(0, 10));
});

app.post('/api/leaderboard', (req, res) => {
  const { name } = req.body;
  leaderboard.push({ name, score });
  score = 0; 
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Emoji game running on http://localhost:${PORT}`);
});