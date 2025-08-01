# Blog API

A simple Express.js API for managing blog posts.

## Features

- CRUD operations for blog posts
- In-memory data storage
- Proper validation and error handling
- Sorting by timestamp

## API Endpoints

### GET /posts
Retrieve all blog posts, sorted by newest first.

### GET /posts/:id
Retrieve a specific blog post by ID.

### POST /posts
Create a new blog post.
Required fields: title, content

Example request body:
```json
{
  "title": "New Post",
  "content": "This is the content of my new post"
}
