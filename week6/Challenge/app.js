const express = require("express");
const path = require("path");
const session = require("express-session");
const quizRouter = require("./routes/quiz");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/quiz", quizRouter);

app.listen(PORT, () => {
  console.log(`Trivia Quiz running on http://localhost:${PORT}`);
});
