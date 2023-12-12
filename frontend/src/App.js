import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";

const API_URL = 'http://0.0.0.0:4000';

const App = () => {
    const [tasks, setTasks] = useState([]); // Add state to store the tasks

    const getTasks = () => {
        return axios.get(`${API_URL}/v1/todo/tasks`)
            .then(response => {
                setTasks(response.data.data); // Set the tasks in state
            })
            .catch(error => {
                console.error(error);
            });
    };

    const addTask = (formData) => {
        return axios.post(`${API_URL}/v1/todo/tasks`, formData)
            .then(response => {
                setTasks([...tasks, response.data]); // Add the new task to the tasks array in state
            })
            .catch(error => {
                console.error(error);
            });
    };

    const updateTask = (todo) => {
        return axios.put(`${API_URL}/v1/todo/tasks/${todo.id}`, todo);
    };

    const deleteTask = (id) => {
        return axios.delete(`${API_URL}/v1/todo/tasks/${id}`);
    };

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();

        //Todo: Perform any necessary form validation or data processing here

        // Call the addTask function with the form data
        const formData = {
            name: name,
            description: description,
            dueDate: dueDate
        };
        addTask(formData);

        // Clear the form fields after submission
        setName('');
        setDescription('');
        setDueDate('');
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="app-container">
            <div className="background-image-blur"></div>
            <div className="foreground-container">
                <h1 className="center-heading">Task</h1>
                <form onSubmit={handleFormSubmit} className="form-container">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dueDate">Due Date:</label>
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                value={dueDate}
                                onChange={(event) => setDueDate(event.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>

                {tasks.length > 0 && (
                    <div className="list-container">
                        {tasks.map(task => (
                            <div key={task.id} className="list-item">
                                <h3>{task.name}</h3>
                                <p>{task.description}</p>
                                <p>Due Date: {task.dueDate}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;