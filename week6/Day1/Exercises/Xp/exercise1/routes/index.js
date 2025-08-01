import express from "express"

export const router = express.Router()

router.get('/', (req, res)=>{
    res.json("HomePage");
})

router.get('/about', (req, res)=>{
    res.json("AboutPage");
})
