import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import axios from 'axios';
import './App.css';
import Login from './components/Login';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error while fetching the todos!', error);
      });
  }, []);

  const checkAdd = () => {
    if (todo.trim() !== '') { 
      const newTodo = { id: uuidv4(), todo: todo, createdAt: new Date(), updatedAt: null };
      axios.post('http://localhost:5000/api/todos', newTodo)
        .then(response => {
          setTodos([...todos, response.data]);
          setTodo('');
        })
        .catch(error => {
          console.error('Error while adding the todo!', error);
        });
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
      const updatedTodo = { id: uuidv4(), todo: todo, createdAt: new Date(), updatedAt: new Date() };
      axios.put(`http://localhost:5000/api/todos/${updatedTodo.id}`, updatedTodo)
        .then(response => {
          setTodos([...todos, response.data]);
          setTodo('');
        })
        .catch(error => {
          console.error('Error while updating the todo!', error);
        });
    }
  };

  const checkDelete = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        const newTodos = todos.filter(item => item.id !== id);
        setTodos(newTodos);
      })
      .catch(error => {
        console.error('Error while deleting the todo!', error);
      });
  };

  return (
    <div className='wrap'>
      <Login/>
     <div className="App">
      <h1 className='main'>Todo App</h1>
      <input type="text" className='taskarea' placeholder="Write your next task" value={todo} onChange={checkChange}/>
      <button className='add' onClick={todo ? checkUpdate : checkAdd}>{todo ? 'Update' : 'Add'}</button>
      <ul>
        {todos.map(item => (
          <li className='list' key={item.id}>{item.todo}
            <div className='todoedit'>
              {item.updatedAt && <p>{new Date().toLocaleString()}</p>}
              <button onClick={() => checkEdit(item.id)}>Edit</button>
              <button onClick={() => checkDelete(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
     </div>
    </div>
  );
}

export default App;