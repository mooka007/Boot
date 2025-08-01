import {router} from "./routes/index.js"
import express from "express"

const app = express();

app.use('/', router);

app.listen(3000, ()=>console.log("Listening on 3000"));