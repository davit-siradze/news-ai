const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// CORS კონფიგურაცია
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'] // Live Server-ის მისამართები
}));

app.use(express.json());

// მარტივი GET მარშრუტი
app.get('/', (req, res) => {
  res.send('სიახლეების API მუშაობს - გამოიყენე /api/news მარშრუტი');
});

// სიახლეების API NewsAPI-ს გამოყენებით
app.get('/api/news', async (req, res) => {
  try {
    const apiKey = process.env.NEWSAPI_KEY || 'your_api_key_here'; 
    const category = 'business'; // ან 'business' სიახლეების კატეგორია
    const language = 'en'; // ან 'ka' თუ ქართული სიახლეები გინდათ (თუ ხელმისაწვდომია)
    
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?category=${category}&language=${language}&apiKey=${apiKey}`
    );

    // გადაამუშავეთ სიახლეები
    const news = response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: article.publishedAt
    }));

    res.json({ news });
  } catch (error) {
    console.error('NewsAPI Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'სიახლეების ჩატვირთვა ვერ მოხერხდა',
      details: error.message 
    });
  }
});

// სერვერის გაშვება
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`News API endpoint: http://localhost:${PORT}/api/news`);
});