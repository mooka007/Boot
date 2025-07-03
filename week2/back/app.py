from flask import Flask, jsonify  # Import jsonify for JSON responses

app = Flask(__name__)

# Sample data (could be from a database)
books = [
    {"id": 1, "title": "Python Crash Course", "author": "Eric Matthes"},
    {"id": 2, "title": "Flask Web Development", "author": "Miguel Grinberg"}
]

# Route to get all books
@app.route('/api/books', methods=['GET'])
def get_books():
    return jsonify({"books": books})  # Convert data to JSON

# Route to get a single book by ID
@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = next((book for book in books if book["id"] == book_id), None)
    if book:
        return jsonify(book)
    else:
        return jsonify({"error": "Book not found"}), 404  # 404 = Not Found

if __name__ == '__main__':
    app.run(debug=True)