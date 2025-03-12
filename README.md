# Code Snippet Manager

A RESTful API built with Node.js, Express, and MongoDB for storing, tagging, and sharing code snippets.

## Features

- Store code snippets with title, code, language, and tags
- Set expiration time for snippets
- Filter snippets by language and tags
- Pagination and sorting support
- Web dashboard for viewing snippets

## API Endpoints

### POST /api/snippets
Add a new code snippet
```json
{
  "title": "Async Function Example",
  "code": "async function fetchData() { return await fetch(url); }",
  "language": "JavaScript",
  "tags": ["async", "fetch", "JavaScript"],
  "expiresIn": 3600
}
```

### GET /api/snippets
Get all snippets with optional filters:
- ?language=JavaScript
- ?tags=async,fetch
- ?page=1&limit=10
- ?sort=createdAt&order=desc

### GET /api/snippets/:id
Get a specific snippet by ID

### PUT /api/snippets/:id
Update an existing snippet

### DELETE /api/snippets/:id
Delete a snippet

## Dashboard

Visit the root URL (/) to access the web dashboard where you can:
- View all snippets in a table format
- Filter snippets by language and tags

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in .env file:
```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

3. Run the development server:
```bash
npm run dev
```

## Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```