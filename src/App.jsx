import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { addTodo, updateTodo, delTodo } from './todoSlice';

const App = () => {
  const [todo, setTodo] = useState('');
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.tasks);

  const checkChange = (e) => {
    setTodo(e.target.value);
  };

  const checkAddOrUpdate = () => {
    if (editId) {
      dispatch(updateTodo({
        id: editId,
        todo,
        updatedAt: new Date(),
      }));
      setEditId(null);
    } else {
      dispatch(addTodo({
        id: uuidv4(),
        todo,
        createdAt: new Date(),
        updatedAt: null,
      }));
    }
    setTodo('');
  };

  const checkEdit = (item) => {
    setTodo(item.todo);
    setEditId(item.id);
  };

  return (
    <div className='wrap'>
      <div className="App">
        <h1 className='main'>Todo App</h1>
        <input
          type="text"
          className='taskarea'
          placeholder="Write your next task"
          value={todo}
          onChange={checkChange}
        />
        <button className='add' onClick={checkAddOrUpdate}>
          {editId ? 'Update' : 'Add'}
        </button>
        <ul>
          {todos.map((item) => (
            <li className='list' key={item.id}>
              {item.todo}
              <div className='todoedit'>
                <button onClick={() => checkEdit(item)}>Edit</button>
                <button onClick={() => dispatch(delTodo(item.id))}>Delete</button>
              </div>
              <div className='time'>
                <p>{new Date(item.createdAt).toLocaleString()}</p>
                {item.updatedAt && <p>{new Date(item.updatedAt).toLocaleString()}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;