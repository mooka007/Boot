# Book API

A simple CRUD API for managing books using Express.js and MySQL.

## Features

- ✅ Create new books
- ✅ Read all books
- ✅ Read single book by ID
- ✅ Update existing books
- ✅ Delete books

## Project Structure

```
book-api/
├── app.js                          # Main application file
├── .env                            # Environment variables
├── package.json                    # Project configuration
├── README.md                       # Project documentation
└── server/
    ├── config/
    │   └── database.js            # Database configuration
    ├── controllers/
    │   └── bookController.js      # Business logic
    ├── models/
    │   └── Book.js               # Data model
    └── routes/
        └── bookRoutes.js         # API routes
```

## Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd book-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Get All Books
- **GET** `/api/books`
- Returns all books in the collection

### Get Single Book
- **GET** `/api/books/:bookId`
- Returns a specific book by ID

### Create New Book
- **POST** `/api/books`
- Body: `{ "title": "Book Title", "author": "Author Name", "publishedYear": 2023 }`

### Update Book
- **PUT** `/api/books/:bookId`
- Body: `{ "title": "Updated Title", "author": "Updated Author", "publishedYear": 2024 }`

### Delete Book
- **DELETE** `/api/books/:bookId`
- Deletes the specified book

## Testing the API

You can test the API using tools like Postman, curl, or any HTTP client:

```bash
# Get all books
curl http://localhost:5000/api/books

# Get specific book
curl http://localhost:5000/api/books/1

# Create new book
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"New Book","author":"New Author","publishedYear":2024}'

# Update book
curl -X PUT http://localhost:5000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Book","author":"Updated Author","publishedYear":2024}'

# Delete book
curl -X DELETE http://localhost:5000/api/books/1
```

## Environment Variables

The `.env` file contains:
- `DB_HOST`: Database host
- `DB_NAME`: Database name
- `DB_USER`: Database user
- `PORT`: Server port (default: 5000)

## Development

To run in development mode with auto-restart:
```bash
npm install -g nodemon
npm run dev
```
