import {router} from "./routes/books.js"
import express from "express"

const app = express();

app.use('/books', router)
app.use(express.json());


app.listen(3000, ()=>console.log("Listening on 3000"));