const User = require('../models/User');

// Register new user
const register = async (req, res) => {
  try {
    const { email, username, first_name, last_name, password } = req.body;

    // Validation
    if (!email || !username || !first_name || !last_name || !password) {
      return res.status(400).json({ 
        error: 'All fields are required: email, username, first_name, last_name, password' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Create new user
    const newUser = new User({ email, username, first_name, last_name, password });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: savedUser
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email or username already exists' });
    }
    
    res.status(500).json({ error: 'Internal server error during registration' });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await User.verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({
      message: 'Users retrieved successfully',
      count: users.length,
      users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error while fetching users' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Valid user ID is required' });
    }

    const user = await User.findById(parseInt(id));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'User retrieved successfully',
      user
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ error: 'Internal server error while fetching user' });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, first_name, last_name, password } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Valid user ID is required' });
    }

    // Check if user exists
    const existingUser = await User.findById(parseInt(id));
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validation
    if (!email || !first_name || !last_name) {
      return res.status(400).json({ 
        error: 'Email, first_name, and last_name are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Password validation if provided
    if (password && password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Update user
    const updated = await User.updateById(parseInt(id), { 
      email, 
      first_name, 
      last_name, 
      password 
    });

    if (!updated) {
      return res.status(404).json({ error: 'User not found or no changes made' });
    }

    // Get updated user
    const updatedUser = await User.findById(parseInt(id));

    res.json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Update user error:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    
    res.status(500).json({ error: 'Internal server error while updating user' });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser
};
