const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Todo } = require('../model/model');

const userController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists with this email' });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({username, email, password: hashedPassword});
      await user.save();
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.status(201).json({message: 'User registered successfully', token});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({message: 'Login successful', token});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

const todoController = {
  getTodos: async (req, res) => {
    try {
      console.log('Getting todos for user:', req.user._id); 
      const todos = await Todo.find({ userId: req.user._id }).sort({ createdAt: -1 });
      res.json(todos);
    } catch (error) {
      console.error('Error getting todos:', error);
      res.status(500).json({ error: error.message });
    }
  },

  getTodo: async (req, res) => {
    try {
      const todo = await Todo.findOne({ _id: req.params.id, userId: req.user._id });
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createTodo: async (req, res) => {
    try {
      const { title, description, priority, dueDate } = req.body;
      console.log('Creating todo for user:', req.user._id);
      console.log('Request body:', req.body);
      const todo = new Todo({
        title, description, priority, dueDate: dueDate ? new Date(dueDate) : undefined, userId: req.user._id
      });
      await todo.save();
      res.status(201).json(todo);
    } catch (error) {
      console.error('Error creating todo:', error);
      res.status(400).json({ error: error.message });
    }
  },

  updateTodo: async (req, res) => {
    try {
      const { title, description, completed, priority, dueDate } = req.body;
      const todo = await Todo.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id }, 
        {title, description, completed, priority, dueDate: dueDate ? new Date(dueDate) : undefined},
        { new: true, runValidators: true }
      );
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      console.log('Todo updated for user:', req.user._id);
      res.json(todo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteTodo: async (req, res) => {
    try {
      const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      console.log('Todo deleted for user:', req.user._id);
      res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = { userController, todoController };