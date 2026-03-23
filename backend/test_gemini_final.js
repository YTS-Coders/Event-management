const axios = require('axios');
const fs = require('fs');

const API_KEY = 'AIzaSyDV_i_yUxZlPeLAye4lamSXQ_l-FEGy9jk';
const MODEL = 'gemini-2.5-flash';
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

async function testGemini() {
    let result = '';
    result += `Testing Gemini API with model: ${MODEL}\n`;
    try {
        const response = await axios.post(URL, {
            contents: [{ parts: [{ text: "Hello, generate a 1-sentence test response." }] }]
        });
        result += "SUCCESS! Response: " + response.data.candidates[0].content.parts[0].text + "\n";
    } catch (error) {
        if (error.response) {
            result += `FAIL! Status: ${error.response.status}\n`;
            result += `FAIL! Response Data: ${JSON.stringify(error.response.data)}\n`;
        } else {
            result += `FAIL! Error: ${error.message}\n`;
        }
    }
    fs.writeFileSync('test_gemini_final.txt', result);
}

testGemini();
