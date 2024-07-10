const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mock data
const questions = [
  { id: 1, text: "What is the capital of France?" },
  { id: 2, text: "Who wrote 'Romeo and Juliet'?" },
  { id: 3, text: "What is the chemical symbol for gold?" }
];

const correctAnswers = {
  1: "Paris",
  2: "William Shakespeare",
  3: "Au"
};

let scores = [
  { id: 1, score: 80 },
  { id: 2, score: 95 },
  { id: 3, score: 70 }
];

// 1. GET endpoint to retrieve a question
app.get('/question', (req, res) => {
  const id = parseInt(req.query.id);
  const question = questions.find(q => q.id === id);
  
  if (question) {
    res.json(question);
  } else {
    res.status(404).json({ error: "Question not found" });
  }
});

// 2. POST endpoint to submit an answer and get a score
app.post('/submit', (req, res) => {
  const { id, answer } = req.body;
  
  if (!id || !answer) {
    return res.status(400).json({ error: "Missing id or answer" });
  }
  
  const correct = correctAnswers[id];
  
  if (!correct) {
    return res.status(404).json({ error: "Question not found" });
  }
  
  const score = answer.toLowerCase() === correct.toLowerCase() ? 100 : 0;
  
  res.json({ score });
});

// 3. GET endpoint to list mocked scores
app.get('/scores', (req, res) => {
  res.json(scores);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});