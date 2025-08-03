const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// GET endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello From Express' });
});

// POST endpoint
app.post('/api/world', (req, res) => {
  console.log(req.body); // Log received data
  const responseMessage = `I received your POST request. This is what you sent me: ${req.body.post}`;
  res.json({ message: responseMessage });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
