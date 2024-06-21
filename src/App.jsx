import { useState, useEffect } from 'react'
import './App.css'

function App() {
   const [todo, setTodo] = useState("")
   const [todos, setTodos] = useState([])

  return (
    <>
      <h1>Todo App</h1>
    </>
  );
}

export default App
