from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database configuration
DB_CONFIG = {
    'host': os.getenv('DB_HOST'),
    'database': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'port': os.getenv('DB_PORT')
}

# Health check endpoint
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({
        'apah' : 'apaah'
    }), 200 


@app.route('/users/create', methods=['POST'])
def create_user():
    # Get JSON data from request body
    data = request.get_json()

    # Validate required fields
    if not data or not data.get('username') or not data.get('email'):
        return jsonify({
            'success': False,
            'message': 'Username and email are required'
        }), 400

    # Extract data
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # SQL query with parameters
    query = """
    INSERT INTO users (username, email, password)
    VALUES (%s, %s, %s)
    RETURNING id, username, email, created_at
    """
    params = (username, email, password)

    # Execute query and return results
    # ... database code here

    return jsonify({
        'success': True,
        'data': params,
        'message': 'User created successfully'
    }), 201



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)