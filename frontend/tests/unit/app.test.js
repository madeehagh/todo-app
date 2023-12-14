import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import App from "../../src/App";

jest.mock('axios');

describe('App', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({ data: { data: [] } });
        axios.post.mockResolvedValue({ data: {} });
    });

    test('renders the form and task list', async () => {
        render(<App />);

        // Check if the form elements are rendered
        expect(screen.getByLabelText('Name:')).toBeInTheDocument();
        expect(screen.getByLabelText('Description:')).toBeInTheDocument();
        expect(screen.getByLabelText('Due Date:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();

        // Check if the task list is initially empty
        expect(screen.queryByRole('list')).toBeNull();

        // Add a task
        const nameInput = screen.getByLabelText('Name:');
        const descriptionInput = screen.getByLabelText('Description:');
        const dueDateInput = screen.getByLabelText('Due Date:');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(nameInput, { target: { value: 'Task 1' } });
        fireEvent.change(descriptionInput, { target: { value: 'Task description' } });
        fireEvent.change(dueDateInput, { target: { value: '2022-01-01' } });
        fireEvent.click(submitButton);

        // Check if the task is added to the list
        expect(await screen.findByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task description')).toBeInTheDocument();
        expect(screen.getByText('Due Date: 2022-01-01')).toBeInTheDocument();
    });
});