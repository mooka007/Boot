-- Create database (run this separately in PostgreSQL)
-- CREATE DATABASE blog_db;

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at 
    BEFORE UPDATE ON posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO posts (title, content) VALUES 
('Welcome to Our Blog', 'This is our first blog post. Welcome to our amazing blog platform!'),
('Getting Started with Node.js', 'Node.js is a powerful runtime for building server-side applications...'),
('Understanding RESTful APIs', 'REST stands for Representational State Transfer and is an architectural style...');
