const axios = require('axios');
const fs = require('fs');

const API_KEY = 'AIzaSyDV_i_yUxZlPeLAye4lamSXQ_l-FEGy9jk';
const URL = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

async function listModels() {
    let result = '';
    result += "Listing Models...\n";
    try {
        const response = await axios.get(URL);
        result += "SUCCESS! Models:\n";
        result += JSON.stringify(response.data, null, 2);
    } catch (error) {
        if (error.response) {
            result += `FAIL! Status: ${error.response.status}\n`;
            result += `FAIL! Response Data: ${JSON.stringify(error.response.data)}\n`;
        } else {
            result += `FAIL! Error: ${error.message}\n`;
        }
    }
    fs.writeFileSync('available_models.txt', result);
}

listModels();
