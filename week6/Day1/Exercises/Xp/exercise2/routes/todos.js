import express from "express"

export const router = express.Router()
router.use(express.json());

const todos = [];


router.get('/', (req, res)=>{
    res.json(todos);
})

router.post('/', (req, res) => {
    const data = req.body;

    if (data){
        todos.push({
            id: todos.length,
            title: data.title,
            completed: data.completed
        });
        res.json({ message: "Todo added", todo: data });
    }
    else
        res.status(400).json({ error: "Invalid data" });
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;

    const todo = todos.find(t => t.id === id);
    
    console.log(todo)
    if (!todo)
        return res.status(404).json({ error: 'Task not found' });

    todo.title = data.title;
    todo.completed = data.completed;

    res.json({ message: 'Todo updated', todo });
});


router.delete("/:id",(req, res)=>{
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);

    if (index !== -1) {
        todos.splice(index, 1);
        res.json({ message: 'Todo deleted' });
    } 
    else 
        res.status(404).json({ error: 'Task not found' });

})

