import {router} from "./routes/todos.js"
import express from "express"

const app = express();

app.use('/todos', router)
app.use(express.json());


app.listen(3000, ()=>console.log("Listening on 3000"));