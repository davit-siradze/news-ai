document.addEventListener('DOMContentLoaded', async () => {
    const newsContainer = document.getElementById('news-container');
    
    try {
        const response = await fetch('http://localhost:3000/api/news');
        if (!response.ok) {
            throw new Error(`HTTP შეცდომა! სტატუსი: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.news && Array.isArray(data.news)) {
            renderNews(data.news);
        } else {
            throw new Error('არავალიდური მონაცემების ფორმატი');
        }
    } catch (error) {
        console.error('შეცდომა:', error);
        newsContainer.innerHTML = `
            <p class="error">სიახლეების ჩატვირთვა ვერ მოხერხდა: ${error.message}</p>
        `;
    }
});

function renderNews(newsItems) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = `
        <h2>უახლესი სიახლეები</h2>
        <div class="news-list">
            ${newsItems.map(item => `
                <div class="news-item">
                    <h3>${item.title || 'უსათაურო სიახლე'}</h3>
                    <p>${item.description || 'აღწერა არ არის ხელმისაწვდომი'}</p>
                    <a href="${item.url || '#'}" target="_blank">სრულად ნახვა</a>
                </div>
            `).join('')}
        </div>
    `;
}