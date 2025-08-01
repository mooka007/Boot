import express from "express"
import {router} from "./routes/quiz.js"

const app = express();

app.use("/quiz", router)

app.listen(3000, ()=>console.log("Listening on localhost port 3000..."));