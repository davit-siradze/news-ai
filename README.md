# news-ai
# 📰 Global News API

Node.js/Express API fetching worldwide news from NewsAPI.org.

## Features
- Multi-category support (`business`, `technology`, etc.)
- Country-specific filtering
- Clean JSON response with image URLs
- Error handling

## API Endpoints

### Get News
`GET /api/news`
**Parameters**:
- `category` (optional): business|entertainment|general|health|science|sports|technology
- `country` (optional): 2-letter ISO code (e.g., 'us', 'gb')

**Example**:
```bash
curl "http://localhost:3000/api/news"