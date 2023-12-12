import React, { useState } from 'react';

export const TaskForm = ({ addTask }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = {
            name,
            description,
            dueDate,
        };

        addTask(formData);

        setName('');
        setDescription('');
        setDueDate('');
    };

    return (
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
    );
};

export default TaskForm;