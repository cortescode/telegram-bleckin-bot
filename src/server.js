const express = require('express');
const cron = require('node-cron');

const { scheduledNews } = require("./main")

const app = express();
const port = 3000;


scheduledNews();


// Schedule the task to run every 3 hours
cron.schedule('0 */3 * * *', () => {
    scheduledNews();
});

// Basic route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Scheduled task will run every 3 hours');
});