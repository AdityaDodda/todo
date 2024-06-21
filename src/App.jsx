import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import './App.css';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    if (todo.trim() !== '') { 
      setTodos([...todos, { id: uuidv4(), todo: todo, isCompleted: false }]);
      setTodo('');
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find(item => item.id === id);
    if (todoToEdit) {
      setTodo(todoToEdit.todo);
      const newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
    }
  };

  const handleUpdate = () => {
    if (todo.trim() !== '') {
      setTodos([...todos, { id: uuidv4(), todo: todo, isCompleted: false }]);
      setTodo('');
    }
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1 className='main'>Todo App</h1>
      <input type="text" className='taskarea' placeholder="Write your next task" value={todo} onChange={handleChange}/>
      <button onClick={todo ? handleUpdate : handleAdd}>{todo ? 'Update' : 'Add'}</button>

      <ul>
        {todos.map(item => (
          <li className='list' key={item.id}>{item.todo}
            <div className='todoedit'>
              <button onClick={() => handleEdit(item.id)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;