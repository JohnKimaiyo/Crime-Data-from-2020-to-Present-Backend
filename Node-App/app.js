const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

// URL to fetch data from
const url = 'https://data.lacity.org/api/views/2nrs-mtv8/rows.json?accessType=DOWNLOAD';

// Directory to store the data
const dataDir = path.join(__dirname, 'data');

// File path for the JSON data
const filePath = path.join(dataDir, 'crime_data.json');

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Function to fetch and save data
const fetchAndSaveData = async () => {
    try {
        console.log('Fetching data...');
        const response = await axios.get(url);
        fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2));
        console.log('Data successfully fetched and saved to crime_data.json');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Schedule the task to run every 24 hours
cron.schedule('0 0 * * *', () => {
    console.log('Running scheduled task to refresh data...');
    fetchAndSaveData();
});

// Fetch data immediately when the script starts
fetchAndSaveData();