# Express Task Manager API

A simple RESTful API for managing tasks built with Express.js.

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Data persistence with JSON file storage
- ✅ Input validation
- ✅ Error handling
- ✅ RESTful API design

## Installation

```bash
npm install
```

## Usage

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode: 
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Get all tasks
```
GET /api/tasks
```

### Get task by ID
```
GET /api/tasks/:id
```

### Create new task
```
POST /api/tasks
Content-Type: application/json

{
  "title": "Task title",
  "description": "Task description (optional)",
  "completed": false
}
```

### Update task
```
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

### Delete task
```
DELETE /api/tasks/:id
```

## Example Usage with curl

### Create a task:
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Express.js", "description": "Build a REST API"}'
```

### Get all tasks:
```bash
curl http://localhost:3000/api/tasks
```

### Update a task:
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Delete a task:
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

## Data Storage

Tasks are stored in `data/tasks.json` with the following structure:

```json
[
  {
    "id": 1,
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```
