import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import './App.css';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const checkAdd = () => {
    if (todo.trim() !== '') { 
      const newTodo = {id: uuidv4(),todo: todo,isCompleted: false,createdAt: new Date(),updatedAt: null};
      setTodos([...todos, newTodo]);
      setTodo('');
    }
  };

  const checkChange = (e) => {
    setTodo(e.target.value);
  };

  const checkEdit = (id) => {
    const todoToEdit = todos.find(item => item.id === id);
    if (todoToEdit) {
      setTodo(todoToEdit.todo);
      const newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
    }
  };

  const checkUpdate = () => {
    if (todo.trim() !== '') {
      const updatedTodo = {id: uuidv4(),todo: todo,isCompleted: false,createdAt: new Date(),updatedAt: null};
      setTodos([...todos, updatedTodo]);
      setTodo('');
    }
  };

  const checkDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1 className='main'>Todo App</h1>
      <input type="text" className='taskarea' placeholder="Write your next task" value={todo} onChange={checkChange}/>
      <button className='add' onClick={todo ? checkUpdate : checkAdd}>{todo ? 'Update' : 'Add'}</button>
      <ul>
        {todos.map(item => (
          <li className='list' key={item.id}>{item.todo}
            <div className='todoedit'>
            <p>{item.createdAt.toLocaleString()}</p>
              {item.updatedAt && <p> {item.updatedAt.toLocaleString()}</p>}
              <button onClick={() => checkEdit(item.id)}>Edit</button>
              <button onClick={() => checkDelete(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;