import React, {useState, useEffect} from 'react';
//import dotenv from 'dotenv';
import './App.css';
import axios from "axios";

//dotenv.config();

const API_URL = process.env.REACT_APP_APIURL;
const apiKey = process.env.REACT_APP_APIKEY;

// Create an Axios instance with default headers
const axiosInstance = axios.create({
    baseURL: API_URL, headers: {
        'x-api-key': apiKey, 'Content-Type': 'application/json'
    }
});

const App = () => {
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        try {
            const response = await axiosInstance.get('/v1/todo/tasks');
            setTasks(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addTask = async (formData) => {
        try {
            const response = await axiosInstance.post('/v1/todo/tasks', formData);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error(error);
        }
    };

    const updateTask = async (task) => {
        try {
            task.isActive = !task.isActive;
            const response = await axiosInstance.put(`/v1/todo/tasks/${task.id}`, task);
            setTasks(tasks.map((t) => (t.id === task.id ? response.data : t)));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await axiosInstance.get(`/v1/todo/tasks/${id}`);
            setTasks(response.data.data);
        } catch (errorr) {
            console.log(errorr)
        }
    };

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    function localizeDate(date) {
        return new Date(date).toLocaleDateString("en-NL", {
            year: "numeric", month: "numeric", day: "numeric",
        });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        //Todo: Perform any necessary form validation or data processing here

        // Call the addTask function with the form data
        const formData = {
            name: name, description: description, dueDate: new Date(dueDate)
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

    return (<div className="app-container">
        <div className="background-image-blur"></div>
        <div className="foreground-container">
            <div className="wrapper">
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
                        {tasks.map((task) => (
                            <div key={task.id} className="list-item">
                                <input
                                    type="checkbox"
                                    id={task.id}
                                    checked={task.isActive}
                                    onChange={() => updateTask(task)}
                                />
                                <label htmlFor={task.id}>
                                    <h3>{task.name}</h3>
                                    <p>{task.description}</p>
                                    <p>Due Date: {localizeDate(task.dueDate)}</p>
                                </label>
                                    <button onClick={() => updateTask(task)}>Edit</button>
                                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>);
};

export default App;