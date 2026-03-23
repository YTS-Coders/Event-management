const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const API_KEY = 'AIzaSyDV_i_yUxZlPeLAye4lamSXQ_l-FEGy9jk';
const MODEL = 'gemini-1.5-flash-latest';
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

async function testGemini() {
    console.log(`Testing Gemini API with model: ${MODEL}`);
    try {
        const response = await axios.post(URL, {
            contents: [{ parts: [{ text: "Hello, generate a 1-sentence test response." }] }]
        });
        console.log("SUCCESS! Response:", response.data.candidates[0].content.parts[0].text);
    } catch (error) {
        if (error.response) {
            console.error("FAIL! Status:", error.response.status);
            console.error("FAIL! Response Data:", JSON.stringify(error.response.data));
        } else {
            console.error("FAIL! Error:", error.message);
        }
    }
}

testGemini();
