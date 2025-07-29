const express = require("express");
const postsRouter = require("./routes/posts");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/posts", postsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Blog API running on http://localhost:${PORT}`);
});
