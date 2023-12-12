import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import X9qeQTL from './X9qeQTL.jpeg';

const API_URL = 'http://localhost:4000';

const App = () => {
    const [tasks, setTasks] = useState([]);

    const getTodos = () => {
        return axios.get(`${API_URL}/v1/todo/tasks`);
    };

    const addTodo = (formData) => {
        return axios.post(`${API_URL}/v1/todo/tasks`, formData);
    };

    const updateTodo = (todo) => {
        return axios.put(`${API_URL}/v1/todo/tasks/${todo.id}`, todo);
    };

    const deleteTodo = (id) => {
        return axios.delete(`${API_URL}/v1/todo/tasks/${id}`);
    };

 /*   const handleFormSubmit = (event) => {
        event.preventDefault();

        const taskDescription = event.target.task.value;

        const newTask = {
            id: Date.now(),
            description: taskDescription,
        };

        setTasks([...tasks, newTask]);

        event.target.task.value = '';
    };

    return (
        <div className="app-container">
            <h1>Tasks List</h1>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="task" placeholder="Enter a task" />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.description}</li>
                ))}
            </ul>
        </div>
    );*/

    return (
        <div className="app-container">
            <h1>Tasks List</h1>
            <img src={X9qeQTL} alt="TODO List" className="photo" />
            <ul>
                <li>Invent new traffic lights</li>
                <li>Rehearse a movie scene</li>
                <li>Improve the spectrum technology</li>
            </ul>
        </div>
    );
};

export default App;