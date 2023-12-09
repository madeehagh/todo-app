// @ts-ignore
import request from 'supertest';
import taskRoutes from '../../../src/routes/taskRoutes';
// @ts-ignore
import express from 'express';

const app = express();
app.use(express.json());
app.use('/api', taskRoutes);

describe('Task Routes', () => {
    it('should get all tasks', async () => {
        const response = await request(app).get('/api/tasks');
        expect(response.status).toBe(200);
    });

    it('should get a task by ID', async () => {
        const taskId = '123';
        const response = await request(app).get(`/api/tasks/${taskId}`);
        expect(response.status).toBe(200);
    });

    it('should create a new task', async () => {
        const taskData =
            { title: 'New Task', description: 'Task description' };
        const response = await request(app).post('/api/tasks').send(taskData);
        expect(response.status).toBe(201);
    });

    it('should update a task', async () => {
        const taskId = '123';
        const updatedTaskData = { title: 'Updated Task', description: 'Updated description' };
        const response = await request(app).put(`/api/tasks/${taskId}`).send(updatedTaskData);
        expect(response.status).toBe(200);
    });

    it('should delete a task', async () => {
        const taskId = '123';
        const response = await request(app).delete(`/api/tasks/${taskId}`);
        expect(response.status).toBe(200);
    });
});