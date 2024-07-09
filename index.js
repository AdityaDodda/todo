import express from 'express';
import cors from 'cors';
import {v4 as uuidv4} from 'uuid';

const app = express();
const PORT = process.env.port || 5000;

app.use(cors());
app.use(express.json());

let todos = [];

// All todos
app.get('/api/todos', (req,res) => {
    res.json(todos);
});

// Add todo
app.post('/api/todos', (req,res) => {
  const newTodo = {...req.body, id: uuidv4()};
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Edit Todo
app.put('/api/todos/:id', (req,res) => {
  const {id} = req.params;
  const updatedTodo = {...req.body, updatedAt: new Date()};
  todos = todos.map(todo => (todo.id === id ? updatedTodo : todo));
  res.json(updatedTodo);
});

// Delete Todo
app.delete('/api/todos/:id', (req,res) => {
    const {id} = req.params;
    todos = todos.filter(todo => todo.id != id);
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));