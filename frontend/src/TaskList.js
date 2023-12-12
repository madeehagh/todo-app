import React from 'react';

const TaskList = ({ tasks }) => {
    return (
        <div className="list-container">
            {tasks.map((task) => (
                <div key={task.id} className="list-item">
                    <h3>{task.name}</h3>
                    <p>{task.description}</p>
                    <p>Due Date: {task.dueDate}</p>
                </div>
            ))}
        </div>
    );
};

export default TaskList;