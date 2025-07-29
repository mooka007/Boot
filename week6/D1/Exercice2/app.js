const express = require("express");
const todosRouter = require("./routes/todos");

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Mount the router
app.use("/todos", todosRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Todo API running on http://localhost:${PORT}`);
});
