import React, { useState } from 'react';
import './App.css';
import axios from "axios";

const API_URL = 'http://0.0.0.0:4000';

const App = () => {
    const [responseData, setResponseData] = useState(null); // Add state to store the response data

    const getTasks = () => {
        return axios.get(`${API_URL}/v1/todo/tasks`);
    };

    const addTask = (formData) => {
        return axios.post(`${API_URL}/v1/todo/tasks`, formData)
            .then(response => {
                setResponseData(response.data); // Set the response data in state
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
            </div>
        </div>
    );
};

export default App;