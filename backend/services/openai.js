const axios = require('axios');

async function getNews() {
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: "gpt-4",
            messages: [{ role: "user", content: "მოკლე უახლესი სიახლეები ტექნოლოგიებში და ბიზნესში 2024 წელს." }]
        },
        {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data.choices[0].message.content;
}

module.exports = { getNews };