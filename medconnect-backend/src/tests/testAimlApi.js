require('dotenv').config({ debug: true });
const axios = require('axios');

const baseURL = "https://api.aimlapi.com/v1";
const apiKey = process.env.AIML_API_KEY;

console.log('Environment check:', {
    apiKeyExists: !!apiKey,
    apiKeyLength: apiKey?.length,
    baseURL
});

const main = async () => {
    try {
        console.log('Testing AIML API connection...');
        
        const response = await axios.post(
            `${baseURL}/chat/completions`,
            {
                model: "mistralai/Mistral-7B-Instruct-v0.2",
                messages: [
                    {
                        role: "user",
                        content: "Say hello!"
                    }
                ],
                temperature: 0.7,
                max_tokens: 256
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': apiKey,
                    'Authorization': `Bearer ${apiKey}`,
                    'X-API-KEY': apiKey,
                    'apikey': apiKey
                }
            }
        );

        console.log("Response:", response.data);
    } catch (error) {
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            headers: error.config?.headers
        });

        if (error.config) {
            console.log('Request details:', {
                url: error.config.url,
                method: error.config.method,
                headers: error.config.headers,
                data: error.config.data
            });
        }
    }
};

main(); 