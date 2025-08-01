import express from "express"

export const router = express.Router()
router.use(express.json());

const books = [];


router.get('/', (req, res)=>{
    res.json(books);
})

router.post('/', (req, res) => {
    const data = req.body;

    if (data){
        books.push({
            id: books.length,
            title: data.title,
            author: data.author
        });
        res.json({ message: "book added", book: data });
    }
    else
        res.status(400).json({ error: "Invalid data" });
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;

    const book = books.find(t => t.id === id);
    
    console.log(book)
    if (!book)
        return res.status(404).json({ error: 'Task not found' });

    book.title = data.title;
    book.completed = data.completed;

    res.json({ message: 'book updated', book });
});


router.delete("/:id",(req, res)=>{
    const id = parseInt(req.params.id);
    const index = books.findIndex(t => t.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        res.json({ message: 'book deleted' });
    } 
    else 
        res.status(404).json({ error: 'Task not found' });

})

