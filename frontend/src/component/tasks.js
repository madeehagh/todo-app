useEffect(() => {
    const fetchTasksFile = async () => {
        try {
            const response = await axios.get('/tasks.jsx');
            const tasksFileContent = response.data;
            console.log(tasksFileContent);
        } catch (error) {
            console.error('Error reading tasks.jsx:', error);
        }
    };

    fetchTasksFile();
}, []);
