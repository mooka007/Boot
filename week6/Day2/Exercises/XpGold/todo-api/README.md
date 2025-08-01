# Todo List API

A simple Express API for managing todo items.

## Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Todo Structure

```json
{
  "id": "unique-id",
  "title": "Task description",
  "completed": false
}
