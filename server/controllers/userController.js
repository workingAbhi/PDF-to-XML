// server/controllers/userController.js
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      
      // Check if user already exists
      const existingUser = await userModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      // Create user
      const newUser = await userModel.create(name, email, password);
      
      // Generate token
      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      res.status(201).json({
        message: 'User created',
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        }
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ message: 'Registration failed' });
    }
  },
  
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Find user
      const user = await userModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      
      // Generate token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      res.status(200).json({
        message: 'Authentication successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login failed' });
    }
  }
};

module.exports = userController;