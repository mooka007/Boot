const express = require("express");
const indexRouter = require("./routes/index");

const app = express();
const PORT = 3000;

// Mount the router
app.use("/", indexRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
